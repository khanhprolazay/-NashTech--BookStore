import { Global, Module } from "@nestjs/common";
import { FILE_UPLOAD_OPTIONS } from "../file-upload.constant";
import { LocalFileUploadOptions } from "./local.type";
import { FileUploadService } from "../base/file-upload.service";
import { LocalFileUploadService } from "./local.service";

@Global()
@Module({})
export class LocalFileUploadModule {
  static forRoot(options: LocalFileUploadOptions) {
    const providers = [];
    const exports = [];

    providers.push({
      provide: FILE_UPLOAD_OPTIONS,
      useValue: options,
    })

    providers.push({
      provide: FileUploadService,
      useClass: LocalFileUploadService,
    })

    exports.push(FileUploadService);

    return {
      module: LocalFileUploadModule,
      providers,
      exports,
    };
  }
}