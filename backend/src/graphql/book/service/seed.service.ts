import { Injectable, OnModuleInit } from "@nestjs/common";
import { ExcelService } from "@/core/module/excel/excel.service";
import { HttpClient } from "@/core/util/http-client";
import { IBook, IGoogleBookResponse } from "../book.type";
import { PrismaService } from "@/core/service/prisma.service";
import { Util } from "@/core/util/util";

@Injectable()
export class SeedService implements OnModuleInit {
  private data: IBook[] = [];
  private index: number = 4;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly excelService: ExcelService,
    private readonly prismaService: PrismaService,
  ) {
    this.data = this.excelService.read<IBook>(
      "/home/leminh/Desktop/nashtech/bookworm/data/books.csv",
    );
  }

  async onModuleInit() {
    while (this.index < this.data.length) {
      // Prevent the process from crashing by too many requests
      try {
        await this.process();
      } catch (err) {
        console.log(err);
        continue;
      }
    }
  }

  async process() {
    while (this.index < this.data.length) {
      const book = this.data[this.index];
      const response = (await this.getBook(book.isbn)).data;
      console.log(`${this.index}. Searching for book: ${book.title}`);
      if (response.totalItems > 0) {
        console.log(`Book found: ${book.title}`);

        const item = response.items[0];

        if (!item.volumeInfo.imageLinks) {
          console.log(`No image found for book: ${book.title}`);
          this.index++;
          continue;
        }

        const { authors, description, categories, imageLinks } =
          item.volumeInfo;

        let instance = await this.book().findFirst({
          where: {
            isbn: `${book.isbn}`,
          },
        });

        if (instance) {
          console.log(`Book already exists: ${instance.title}`);
          this.index++;
          continue;
        }

        instance = await this.book().create({
          data: {
            title: book.title,
            slug: Util.slugify(book.title),
            description,
            isbn: `${book.isbn}`,
            mainImage: imageLinks.thumbnail.replace("zoom=1", "zoom=0"),
            price: Math.round(Math.random() * 100),
          },
        });

        await this.analysis().create({
          data: {
            bookId: instance.id,
          },
        });

        if (authors && authors.length > 0) {
          for (const author of authors) {
            const slug = Util.slugify(author);
            const authorInstance = await this.author().upsert({
              update: {},
              where: { slug },
              create: { name: author, slug },
            });
            await this.book().update({
              where: { id: instance.id },
              data: {
                authors: {
                  create: {
                    author: {
                      connect: {
                        id: authorInstance.id,
                      },
                    },
                  },
                },
              },
            });
          }
        }

        if (categories && categories.length > 0) {
          for (const category of categories) {
            const slug = Util.slugify(category);
            const categoryInstance = await this.category().upsert({
              update: {},
              where: { slug },
              create: { name: category, slug },
            });
            await this.book().update({
              where: { id: instance.id },
              data: {
                categories: {
                  create: {
                    category: {
                      connect: {
                        id: categoryInstance.id,
                      },
                    },
                  },
                },
              },
            });
          }
        }

        console.log(`Book created: ${instance.title}`);
      }
      this.index++;
    }
  }

  getBook(isbn: string) {
    return this.httpClient.get<IGoogleBookResponse>(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${process.env.GOOGLE_API_KEY}`,
    );
  }

  private book() {
    return this.prismaService.book;
  }

  private analysis() {
    return this.prismaService.analysis;
  }

  private author() {
    return this.prismaService.author;
  }

  private category() {
    return this.prismaService.category;
  }
}
