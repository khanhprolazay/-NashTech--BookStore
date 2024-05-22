import { Injectable } from "@nestjs/common";
import { Author } from "@prisma/client";
import { BaseService } from "src/core/service/base.service";

@Injectable()
export class AuthorService extends BaseService<Author> {
  model()
  {
    return this.client.author;
  }
}