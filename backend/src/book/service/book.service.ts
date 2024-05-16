import { Injectable } from '@nestjs/common';
import { Book } from '@prisma/client';
import { BaseService } from 'src/core/service/base.service';
import { PrismaService } from 'src/core/service/prisma.service';
import { AnalysisService } from './analysis.service';
import { Util } from 'src/core/util/util';
import { AuthorService } from './author.service';
import { CategoryService } from './category.service';

@Injectable()
export class BookService extends BaseService<Book> {
  constructor(
    private readonly analysisService: AnalysisService,
    private readonly categoryService: CategoryService,
    private readonly authorService: AuthorService,
    protected readonly client: PrismaService,
  ) {
    super(client);
  }

  model() {
    return this.client.book;
  }

  findByIsbn(isbn: string) {
    return this.model().findFirst({
      where: { isbn },
    });
  }

  override async create(data: Pick<Book, 'title' | 'description' | 'isbn'>) {
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
    return this.connectEntity(book, 'authors', author);
  }

  async addCategory(book: Book, categoryName: string) {
    const category = await this.categoryService.create({ name: categoryName });
    return this.connectEntity(book, 'categories', category);
  }

  private connectEntity(book: Book, field: 'authors' | 'categories', entity: { id: string }) {
    return this.model().update({
      where: { id: book.id },
      data: { [field]: { connect: { id: entity.id } } },
    });
  }
}
