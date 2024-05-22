import { Injectable } from '@nestjs/common';
import { Book } from '@prisma/client';
import { BaseService } from 'src/core/service/base.service';

@Injectable()
export class BookService extends BaseService<Book> {
  model() {
    return this.client.book;
  }

  async findByPage(page: number) {
    return this.client.$queryRaw
    ` select b.title, string_agg(A."name" , ', ') authors, b.price , b.discount, b."mainImage" , b.price * (100 - b.discount) / 100 total
      from "BookToAuthor" bta
      left join "Book" b on b.id = bta."bookId"
      left join "Author" a  on a.id  = bta."authorId"
      group by b.title , b.price, b.discount, b."mainImage"
      limit ${this.appContext.pagination.limit}
      offset ${(page - 1) * this.appContext.pagination.limit}
    `;
  }
}
