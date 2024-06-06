import { HttpException, Inject, Injectable } from "@nestjs/common";
import { Book } from "@prisma/client";
import { BaseService } from "@/core/service/base.service";
import { UpdateInformationDto } from "./dto/upate-information.dto";
import { Util } from "@/core/util/util";
import { PrismaService } from "@/core/service/prisma.service";
import { AppContext } from "@/core/type/app-context.type";
import { APP_CONTEXT } from "@/core/constant/app.constant";
import { FileUploadService } from "@/core/module/file-upload/base/file-upload.service";
import { CreateBookDto } from "./dto/create-book.dto";

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

  findByPage(page: number) {
    return this.model().findMany({
      include: {
        authors: {
          select: {
            author: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      take: this.appContext.pagination.limit,
      skip: (page - 1) * this.appContext.pagination.limit,
    });
  }

  override findBySlug(slug: string) {
    return this.model().findFirst({
      where: {
        slug,
      },
      include: {
        authors: {
          select: {
            author: true,
          },
        },
        categories: {
          select: {
            category: true,
          },
        },
        reviews: {
          select: {
            rating: true,
            content: true,
            title: true,
            user: {
              select: {
                name: true,
                picture: true,
                email: true,
              }
            }
          }
        }
      },
    });
  }

  async createBook(dto: CreateBookDto, image: Express.Multer.File) {
    const file = await this.fileUploadService.upload(image);
    const slug = Util.slugify(dto.title);
    return this.model().create({
      data: {
        title: dto.title,
        description: dto.description,
        slug: slug,
        isbn: slug,
        price: parseInt(dto.price),
        mainImage: file,
        categories: {
          create: [
            {
              category: {
                connect: {
                  id: dto.category,
                },
              },
            },
          ],
        },
        authors: {
          create: [
            {
              author: {
                connect: {
                  id: dto.author,
                },
              },
            },
          ],
        },
      },
    });
  }

  updateInformation(id: string, dto: UpdateInformationDto) {
    const slug = Util.slugify(dto.title);
    return this.model().update({
      where: {
        id,
      },
      data: {
        ...dto,
        slug,
      },
    });
  }

  findCategories(book: Book) {
    return this.client.category.findMany({
      where: {
        books: {
          some: {
            bookId: book.id,
          },
        },
      },
    });
  }

  findAuthors(book: Book) {
    return this.client.author.findMany({
      where: {
        books: {
          some: {
            bookId: book.id,
          },
        },
      },
    });
  }

  getCategories() {
    return this.client.category.findMany();
  }

  getAuthors() {
    return this.client.author.findMany();
  }

  async updateImage(id: string, image: Express.Multer.File) {
    const book = await this.findById(id);
    const [_, file] = await Promise.all([
      this.fileUploadService.delete(book.mainImage),
      this.fileUploadService.upload(image),
    ]);
    return this.model().update({
      where: {
        id,
      },
      data: {
        mainImage: file,
      },
    });
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
    return this.model().update({
      where: { id: bookId },
      data: {
        categories: {
          delete: [
            {
              bookId_categoryId: {
                bookId,
                categoryId,
              },
            },
          ],
        },
      },
    });
  }

  addAuthor(bookId: string, authorId: string) {
    return this.client.bookToAuthor.create({
      data: {
        bookId,
        authorId,
      },
    });
  }

  removeAuthor(bookId: string, authorId: string) {
    return this.model().update({
      where: {
        id: bookId,
      },
      data: {
        authors: {
          delete: [
            {
              bookId_authorId: {
                bookId,
                authorId,
              },
            },
          ],
        },
      },
    });
  }

  override async delete(id: string) {
    const [reviewsCount, orderCount] = await Promise.all([
      this.client.review.count({ where: { bookId: id } }),
      this.client.orderToBook.count({ where: { bookId: id } }),
    ]);

    if (reviewsCount > 0 || orderCount > 0) {
      throw new HttpException("Book has reviews or orders", 400);
    }

    const [_tmp1, _tmp2] = await Promise.all([
      this.client.bookToAuthor.deleteMany({ where: { bookId: id } }),
      this.client.bookToCategory.deleteMany({ where: { bookId: id } }),
    ]);

    return super.delete(id);
  }
}
