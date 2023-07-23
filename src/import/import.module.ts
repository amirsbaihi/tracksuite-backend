import { Module } from '@nestjs/common';
import { ImportService } from './import.service';
import { UploadModule } from 'src/upload/upload.module';
import { ImportController } from './import.controller';

@Module({
  imports:[UploadModule],
  providers: [ImportService],
  controllers: [ImportController]
})
export class ImportModule {}
