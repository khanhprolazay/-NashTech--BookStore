import { Query, Resolver, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Category } from '../model/category.model';
import { CategoryService } from '../service/category.service';
import { BookService } from '../service/book.service';
import { ControllerContext } from 'src/core/decorator/controller-context.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/core/guard/auth.guard';

@Resolver((_) => Category)
@ControllerContext('gql')
@UseGuards(AuthGuard)
export class CategoryResolver {
  constructor(
    private bookService: BookService,
    private categoryService: CategoryService,
  ) {}

  @Query((_) => Category)
  category(@Args('slug') slug: string) {
    return this.categoryService.findBySlug(slug);
  }

  @Query((_) => [Category])
  categories() {
    return this.categoryService.findAll();
  }

  @ResolveField()
  books(@Parent() category: Category) {
    return this.bookService.findByCategory(category);
  }
}
