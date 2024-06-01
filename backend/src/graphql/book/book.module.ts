import { Module } from "@nestjs/common";
import { BookService } from "./service/book.service";
import { AuthorService } from "./service/author.service";
import { CategoryService } from "./service/category.service";
import { PromotionService } from "./service/promotion.service";
import { BookResolver } from "./resolver/book.resolver";
import { AuthorResolver } from "./resolver/author.resolver";
import { CategoryResolver } from "./resolver/category.resolver";

@Module({
  providers: [
    BookService,
    AuthorService,
    CategoryService,
    PromotionService,
    BookResolver,
    AuthorResolver,
    CategoryResolver,
  ],
})
export class BookModule {}
