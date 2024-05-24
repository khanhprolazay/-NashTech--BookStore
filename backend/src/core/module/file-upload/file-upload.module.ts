import { Module } from "@nestjs/common";
import { LocalFileUploadModule } from "./local/local.module";

@Module({
  imports: [
    LocalFileUploadModule.forRoot({
      destination: process.env.FILE_UPLOAD_DESTINATION,
    }),
  ],
})
export class FileUploadModule {}
