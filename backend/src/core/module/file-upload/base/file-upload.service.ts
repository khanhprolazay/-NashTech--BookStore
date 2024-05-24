
export abstract class FileUploadService {
  // Should return the file path after upload
  abstract upload(file: Express.Multer.File): Promise<string> | string;

  // Should delete the file
  abstract delete(filePath: string): Promise<void> | void;

  protected getFileName(filePath: string) {
    return filePath.split('/').pop();
  }
}
