import { Injectable } from "@nestjs/common";
import { Category } from "@prisma/client";
import { BaseService } from "src/core/service/base.service";

@Injectable()
export class CategoryService extends BaseService<Category> {
  model() {
    return this.client.category;
  }

  findByBook(book: { id: string }) {
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
