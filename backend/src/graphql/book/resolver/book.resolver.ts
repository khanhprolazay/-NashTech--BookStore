import { Query, Resolver, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Book, BooksWithPagination } from '../model/book.model';
import { BookService } from '../service/book.service';
import { CategoryService } from '../service/category.service';
import { AuthorService } from '../service/author.service';
import { UseGuards } from '@nestjs/common';
import { HeaderTokenGuard } from 'src/core/guard/header-token.guard';
import { PaginationDto } from 'src/core/dto/pagination.dto';
import { BookFilterDto } from 'src/core/dto/book-filter.dto';

@Resolver((_) => Book)
@UseGuards(HeaderTokenGuard)
export class BookResolver {
  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private categoryService: CategoryService,
  ) {}

  @Query((_) => Book)
  book(@Args('slug') slug: string) {
    return this.bookService.findBySlug(slug);
  }

  @Query((_) => BooksWithPagination)
  books(@Args('pagination') dto: PaginationDto, @Args('filter') bookFilter: BookFilterDto) {
    return this.bookService.findMany(dto, bookFilter);
  }

  @Query((_) => Number)
  count() {
    return this.bookService.count();
  }

  @ResolveField()
  categories(@Parent() book: Book) {
    return this.categoryService.findByBook(book);
  }

  @ResolveField()
  authors(@Parent() book: Book) {
    return this.authorService.findByBook(book);
  }
}
