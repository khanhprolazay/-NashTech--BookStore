import { Inject, Injectable } from '@nestjs/common';
import { Book } from '@prisma/client';
import { BaseService } from 'src/core/service/base.service';
import { UpdateInformationDto } from './upate-information.dto';
import { Util } from 'src/core/util/util';
import { PrismaService } from 'src/core/service/prisma.service';
import { AppContext } from 'src/core/type/app-context.type';
import { APP_CONTEXT } from 'src/core/constant/app.constant';
import { FileUploadService } from 'src/core/module/file-upload/base/file-upload.service';

@Injectable()
export class BookService extends BaseService<Book> {
  constructor(
    @Inject(APP_CONTEXT) protected readonly appContext: AppContext,
    protected readonly client: PrismaService,
    protected readonly fileUploadService: FileUploadService,
  ) {
    super(appContext, client);
  }

  model() {
    return this.client.book;
  }

  async findByPage(page: number) {
    return this.client.$queryRaw` 
      select b.title, b.slug, string_agg(A."name" , ', ') authors, b.price , b.discount, b."mainImage" , b.price * (100 - b.discount) / 100 total
      from "BookToAuthor" bta
      left join "Book" b on b.id = bta."bookId"
      left join "Author" a  on a.id  = bta."authorId"
      group by b.title , b.price, b.discount, b."mainImage", b.slug
      limit ${this.appContext.pagination.limit}
      offset ${(page - 1) * this.appContext.pagination.limit}
    `;
  }

  override async findBySlug(slug: string) {
    const books = await this.client.$queryRaw`
      select b.id, b.title, b.slug, b.description, b.price , b.discount, b."mainImage" , b.price * (100 - b.discount) / 100 total
      from "BookToAuthor" bta
      left join "Book" b on b.id = bta."bookId"
      where b.slug = ${slug}
      group by b.id, b.title , b.price, b.discount, b."mainImage", b.slug, b.description
    `;
    const book = books[0];
    const [authors, categories] = await Promise.all([
      this.findAuthors(book),
      this.findCategories(book),
    ]);
    return { ...book, authors, categories };
  }

  updateInformation(id: string, dto: UpdateInformationDto) {
    const slug = Util.slugify(dto.title);
    return this.model().update({ where: { id }, data: { ...dto, slug } });
  }

  findCategories(book: Book) {
    return this.client.category.findMany({
      where: { books: { some: { bookId: book.id } } },
    });
  }

  findAuthors(book: Book) {
    return this.client.author.findMany({
      where: { books: { some: { bookId: book.id } } },
    });
  }

  getCategories() {
    return this.client.category.findMany();
  }

  getAuthors() {
    return this.client.author.findMany();
  }

  async updateImage(id: string, image: Express.Multer.File) {
    const book = await this.model().findUnique({ where: { id } });
    if (!book) {
      throw new Error('Book not found');
    }

    const splits = book.mainImage.split('/');
    const oldImageName = splits[splits.length - 1];
    const [_, file] = await Promise.all([
      this.fileUploadService.delete(oldImageName),
      this.fileUploadService.upload(image),
    ]);
    return this.model().update({ where: { id }, data: { mainImage: file } });
  }

  addCategory(id: string, categoryId: string) {
    return this.client.bookToCategory.create({
      data: {
        bookId: id,
        categoryId,
      },
    });
  }

  removeCategory(bookId: string, categoryId: string) {
    return this.client.bookToCategory.delete({
      where: {
        bookId_categoryId: {
          bookId,
          categoryId,
        },
      },
    });
  }

  addAuthor(id: string, authorId: string) {
    return this.client.bookToAuthor.create({
      data: {
        bookId: id,
        authorId,
      },
    });
  }

  removeAuthor(bookId: string, authorId: string) {
    return this.client.bookToAuthor.delete({
      where: {
        bookId_authorId: {
          bookId,
          authorId,
        },
      },
    });
  }
}
