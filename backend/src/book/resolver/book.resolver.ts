import { Query, Resolver, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Book } from '../model/book.model';
import { BookService } from '../service/book.service';
import { CategoryService } from '../service/category.service';
import { AuthorService } from '../service/author.service';
import { ControllerContext } from 'src/core/decorator/controller-context.decorator';
import { UseGuards } from '@nestjs/common';
import { PaginationDto } from '../../core/dto/pagination.dto';
import { HeaderTokenGuard } from 'src/core/guard/header-token.guard';

@Resolver((_) => Book)
@ControllerContext('gql')
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

  @Query((_) => [Book])
  books(@Args('dto') dto: PaginationDto) {
    return this.bookService.findByPagination(dto);
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
