import { Inject } from '@nestjs/common';
import { FileUploadService } from '../base/file-upload.service';
import { FILE_UPLOAD_OPTIONS } from '../file-upload.constant';
import { LocalFileUploadOptions } from './local.type';
import { v4 } from 'uuid';
import { unlink, writeFileSync } from 'fs';

export class LocalFileUploadService extends FileUploadService {
  private basePath: string;
  constructor(
    @Inject(FILE_UPLOAD_OPTIONS)
    private readonly options: LocalFileUploadOptions,
  ) {
    super();
    this.basePath = `${__dirname}/../../../../../src/admin/public/assets/img/book`;
  }

  upload(file: Express.Multer.File) {
    const id = v4();
    const type = file.mimetype.split('/')[1];
    writeFileSync(`${this.basePath}/${id}.${type}`, file.buffer);
    return `${this.options.destination}/${id}.${type}`;
  }


  delete(filePath: string): void | Promise<void> {
    return unlink(`${this.basePath}/${this.getFileName(filePath)}`, (_) => Promise.resolve());
  }
}
