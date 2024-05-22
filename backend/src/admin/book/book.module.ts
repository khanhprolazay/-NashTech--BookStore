import { Module } from '@nestjs/common';
import { BookService } from './service/book.service';
import { BookController } from './book.controller';
import { CategoryService } from '../category/category.service';
import { AuthorService } from './service/author.service';

@Module({
  controllers: [BookController],
  providers: [BookService, CategoryService, AuthorService],
})
export class BookModule {}
