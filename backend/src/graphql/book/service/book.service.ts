import { Inject, Injectable } from '@nestjs/common';
import { Book } from '@prisma/client';
import { BaseService } from 'src/core/service/base.service';
import { PrismaService } from 'src/core/service/prisma.service';
import { AnalysisService } from './analysis.service';
import { Util } from 'src/core/util/util';
import { AuthorService } from './author.service';
import { CategoryService } from './category.service';
import { IPagination } from 'src/core/interface';
import { Dto } from 'src/core/type/utility.type';
import { APP_CONTEXT } from 'src/core/constant/app.constant';
import { AppContext } from 'src/core/type/app-context.type';

@Injectable()
export class BookService extends BaseService<Book> {
  constructor(
    @Inject(APP_CONTEXT) protected readonly appContext: AppContext,
    private readonly analysisService: AnalysisService,
    private readonly categoryService: CategoryService,
    private readonly authorService: AuthorService,
    protected readonly client: PrismaService,
  ) {
    super(appContext, client);
  }

  model() {
    return this.client.book;
  }

  findByIsbn(isbn: string) {
    return this.model().findFirst({
      where: { isbn },
    });
  }

  override async create(data: Dto<Book>) {
    const book = await this.findByIsbn(data.isbn);
    if (book) return book;
    const instance = await this.model().create({
      data: {
        ...data,
        slug: Util.slugify(data.title),
      },
    });
    await this.analysisService.create({
      bookId: instance.id,
    });

    return instance;
  }

  addImage(book: Book, image: string) {
    return this.client.image.create({
      data: { url: image, book: { connect: { id: book.id } } },
    });
  }

  async addAuthor(book: Book, authorName: string) {
    const author = await this.authorService.create({ name: authorName });
    return this.connectEntity(book, 'authors', 'author', author);
  }

  async addCategory(book: Book, categoryName: string) {
    const category = await this.categoryService.create({ name: categoryName });
    return this.connectEntity(book, 'categories', 'category', category);
  }

  findByPagination(pagination: IPagination) {
    const { page = 0, limit = 20 } = pagination;
    return this.model().findMany({ take: limit, skip: page * limit });
  }

  findByCategory(category: { slug: string }) {
    return this.findByEntitySlug(category, 'categories');
  }

  findByAuthor(author: { slug: string }) {
    return this.findByEntitySlug(author, 'authors');
  }

  private connectEntity(
    book: Book,
    relation: 'authors' | 'categories',
    field: 'author' | 'category',
    entity: { id: string },
  ) {
    return this.model().update({
      where: { id: book.id },
      data: {
        [relation]: {
          create: [
            {
              [field]: { connect: { id: entity.id } },
            },
          ],
        },
      },
    });
  }

  private findByEntitySlug(
    entity: { slug: string },
    field: 'authors' | 'categories',
  ) {
    return this.model().findMany({
      where: { [field]: { some: { slug: entity.slug } } },
    });
  }
}
