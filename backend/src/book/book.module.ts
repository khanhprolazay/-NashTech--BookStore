import { Module } from '@nestjs/common';
import { BookService } from './service/book.service';
import { AnalysisService } from './service/analysis.service';
import { AuthorService } from './service/author.service';
import { CategoryService } from './service/category.service';
import { BookResolver } from './resolver/book.resolver';
import { AuthorResolver } from './resolver/author.resolver';
import { CategoryResolver } from './resolver/category.resolver';

@Module({
  providers: [
    BookService,
    AnalysisService,
    AuthorService,
    CategoryService,
    BookResolver,
    AuthorResolver,
    CategoryResolver,
  ],
  exports: [BookService],
})
export class BookModule {}
