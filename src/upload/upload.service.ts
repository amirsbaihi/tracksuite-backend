import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import * as Jimp from "jimp";
import * as path from 'path';

const prodcuctImageUploadSize = { w: 500, h: 500 }

@Injectable()
export class UploadService {

  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(private readonly configService: ConfigService) { }
  async uploadProductImage(userId: string, productId: string, file: Express.Multer.File) {
    const image = await Jimp.read(file.buffer)
    const newBuffer = await image
      .scaleToFit(prodcuctImageUploadSize.w, prodcuctImageUploadSize.h)
      .getBufferAsync(Jimp.MIME_JPEG)
    const newFilename = path.format({ ...path.parse(file.originalname), base: '', ext: '.jpg' })
    const imagePath = "images/productImages/"

    await this.uploadFile(newFilename, newBuffer, imagePath)
    const url = await this.getPublicURL(imagePath + newFilename)
    return {
      success: true,
      message: "File was uploaded successfuly",
      payload: {
        name: newFilename,
        mimetype: Jimp.MIME_JPEG,
        path: imagePath,
        url,
      },
    }
  }
  async getPrivateURL(fileName: string, path: string) {
    const getObjectParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: path + fileName
    }
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
    return url
  }
  async uploadImportFile(userId: string, productId: string, file: Express.Multer.File) {
    const newBuffer = file.buffer
    const newFilename = file.originalname
    const filePath = "import/" + userId + "/"

    await this.uploadFile(newFilename, newBuffer, filePath)
    const url = await this.getPrivateURL(newFilename, filePath)

    return {
      response: {
        success: true,
        message: "File was uploaded successfuly",
        payload: {
          name: newFilename,
          mimetype: file.mimetype,
          path: filePath,
          url,
          fields:undefined
        },
      },
      buffer: newBuffer
    }
  }
  async uploadFile(fileName: string, file: Buffer, path: string) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: path + fileName,
        Body: file,
      }),
    )
  }

  getPublicURL(key: string) {
    return `https://${process.env.BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${encodeURI(key)}`
  }

}