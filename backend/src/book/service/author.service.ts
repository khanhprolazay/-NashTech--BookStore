import { Injectable } from '@nestjs/common';
import { Author } from '@prisma/client';
import { BaseService } from 'src/core/service/base.service';
import { Util } from 'src/core/util/util';

@Injectable()
export class AuthorService extends BaseService<Author> {
  model() {
    return this.client.author;
  }

  override async create(data: Pick<Author, 'name'>) {
    const slug = Util.slugify(data.name);
    const instance = await this.model().findFirst({ where: { slug } });
    if (instance) return instance;
    return super.create({ ...data, slug });
  }

  findByBook(book: { id: string }) {
    return this.model().findMany({
      where: { books: { some: { id: book.id } } },
    });
  }
}
