import { Injectable } from "@nestjs/common";
import { Promotion } from "@prisma/client";
import { BaseService } from "@/core/service/base.service";

@Injectable()
export class PromotionService extends BaseService<Promotion> {
  model() {
    return this.client.promotion;
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
