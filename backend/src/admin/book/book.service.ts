import { Inject, Injectable } from '@nestjs/common';
import { Book } from '@prisma/client';
import { APP_CONTEXT } from 'src/core/constant/app.constant';
import { BaseService } from 'src/core/service/base.service';
import { PrismaService } from 'src/core/service/prisma.service';
import { AppContext } from 'src/core/type/app-context.type';

@Injectable()
export class BookService extends BaseService<Book> {
  constructor(
    @Inject(APP_CONTEXT) appContext: AppContext,
    protected readonly client: PrismaService,
  ) {
    super(client);
  }

  model() {
    return this.client.book;
  }

  findByPage(page: number) {
    return this.client.$executeRaw
    ` select b.title, string_agg(A."name" , ', ') authors, b.price , b.discount, b."mainImage" , b.price * (100 - b.discount) / 100 total
      from "_AuthorToBook" atb 
      left join "Book" b on b.id = atb."B" 
      left join "Author" a  on a.id  = atb."A" 
      group by b.title , b.price, b.discount, b."mainImage"
      limit 10 
      offset 10
    `;
  }
}
