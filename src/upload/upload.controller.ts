import {
  Body,
    Controller,
    ParseFilePipe,
    Post,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { UploadService } from './upload.service';
  

  
  
  @Controller('upload')
  export class UploadController {
    constructor(private readonly uploadService: UploadService) {}
  
    @Post("image")
    @UseInterceptors(FileInterceptor('file'))
    async uploadImageFile(
      @UploadedFile(
        new ParseFilePipe({
          validators: [
            // new MaxFileSizeValidator({ maxSize: 1000 }),
            // new FileTypeValidator({ fileType: 'image/jpeg' }),
          ],
        }),
      )
      file: Express.Multer.File,
      @Body() body
    ) {
        
        return await this.uploadService.uploadProductImage(body.userId, body.productId, file);
    }

    @Post("importfile")
    @UseInterceptors(FileInterceptor('file'))
    async uploadImportFile(
      @UploadedFile(
        new ParseFilePipe({
          validators: [
            // new MaxFileSizeValidator({ maxSize: 1000 }),
            // new FileTypeValidator({ fileType: 'image/jpeg' }),
          ],
        }),
      )
      file: Express.Multer.File,
      @Body() body
    ) {
        
        return await this.uploadService.uploadImportFile(body.userId, body.productId, file);
    }
  }