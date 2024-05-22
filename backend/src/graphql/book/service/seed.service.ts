import { Injectable, OnModuleInit } from '@nestjs/common';
import { ExcelService } from 'src/core/module/excel/excel.service';
import { HttpClient } from 'src/core/util/http-client';
import { BookService } from './book.service';
import { IBook, IGoogleBookResponse } from '../book.type';

@Injectable()
export class SeedService implements OnModuleInit {
  private data: IBook[] = [];
  private index: number = 4;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly bookService: BookService,
    private readonly excelService: ExcelService,
  ) {
    this.data = this.excelService.read<IBook>(
      '/home/leminh/Desktop/nashtech/bookworm/data/books.csv',
    );
  }

  async onModuleInit() {
    while (this.index < this.data.length) {
      // Prevent the process from crashing by too many requests
      try {
        await this.process();
      } catch (err) {
        console.log(err)
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
        const { authors, description, categories, imageLinks } =
          item.volumeInfo;

        const instance = await this.bookService.create({
          title: book.title,
          description,
          isbn: `${book.isbn}`,
          mainImage: book.image_url,
          discount: Math.round(Math.random() * 100),
          price: Math.round(Math.random() * 100),
        });

        if (authors && authors.length > 0) {
          for (const author of authors) {
            await this.bookService.addAuthor(instance, author);
          }
        }

        if (categories && categories.length > 0) {
          for (const category of categories) {
            await this.bookService.addCategory(instance, category);
          }
        }

        if (imageLinks && imageLinks.thumbnail) {
          await this.bookService.addImage(instance, imageLinks.thumbnail);
        }

        await this.bookService.addImage(instance, book.image_url);
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
}
