import { Injectable } from "@nestjs/common";
import { Author } from "@prisma/client";
import { BaseService } from "@/core/service/base.service";

@Injectable()
export class AuthorService extends BaseService<Author> {
  model() {
    return this.client.author;
  }

  async findByBook(book: { id: string }) {
    return this.model().findMany({
      where: {
        books: {
          some: {
            bookId: book.id,
          },
        },
      },
    });
  }
}
