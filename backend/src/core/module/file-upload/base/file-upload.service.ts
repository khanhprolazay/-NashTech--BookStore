
export abstract class FileUploadService {
  // Should return the file path after upload
  abstract upload(file: Express.Multer.File): Promise<string> | string;
  abstract delete(file: string): Promise<void> | void;
}
