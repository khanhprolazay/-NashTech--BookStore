import { Module } from '@nestjs/common';
import { BookService } from './service/book.service';
import { SeedService } from './service/seed.service';
import { AnalysisService } from './service/analysis.service';
import { AuthorService } from './service/author.service';
import { CategoryService } from './service/category.service';

@Module({
  providers: [
    BookService,
    AnalysisService,
    AuthorService,
    CategoryService,
    SeedService,
  ],
  exports: [BookService],
})
export class BookModule {}
