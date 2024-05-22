import { Injectable } from '@nestjs/common';
import { Book, Category } from '@prisma/client';
import { BaseService } from 'src/core/service/base.service';
import { Util } from 'src/core/util/util';

@Injectable()
export class CategoryService extends BaseService<Category> {
  model() {
    return this.client.category;
  }

  override async create(data: Partial<Pick<Category, 'name'>>) {
    const slug = Util.slugify(data.name);
    const instance = await this.model().findFirst({ where: { slug } });
    if (instance) return instance;
    return super.create({ ...data, slug });
  }

  findByBook(book: { id: string }) {
    return this.model().findMany({
      where: { books: { some: { bookId: book.id } } },
    });
  }
}
