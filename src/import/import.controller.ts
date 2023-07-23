import { Body, Controller, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/upload/upload.service';
import { ImportService } from './import.service';

@Controller("import")
export class ImportController {
    constructor(private readonly uploadService: UploadService,
        private readonly importService: ImportService) {}

    @Post("file")
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
        
        const {buffer, response} = await this.uploadService.uploadImportFile(body.userId, body.productId, file)

        response.payload.fields = this.importService.generateFields(buffer)

        return response
    }
}

