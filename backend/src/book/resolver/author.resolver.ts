import { Query, Resolver, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Author } from '../model/author.model';
import { AuthorService } from '../service/author.service';
import { BookService } from '../service/book.service';

@Resolver((_) => Author)
export class AuthorResolver {
  constructor(
    private bookService: BookService,
    private authorService: AuthorService
  ) {}

  @Query((_) => Author)
  author(@Args('slug') slug: string) {
    return this.authorService.findBySlug(slug);
  }

  @Query((_) => [Author])
  authors() {
    return this.authorService.findAll();
  }

  @ResolveField()
  books(@Parent() author: Author) {
    return this.bookService.findByAuthor(author);
  }
}
