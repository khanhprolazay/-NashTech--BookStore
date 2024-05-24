import { Inject, Injectable } from "@nestjs/common";
import { Book } from "@prisma/client";
import { BaseService } from "src/core/service/base.service";
import { PrismaService } from "src/core/service/prisma.service";
import { IPagination } from "src/core/interface";
import { APP_CONTEXT } from "src/core/constant/app.constant";
import { AppContext } from "src/core/type/app-context.type";

@Injectable()
export class BookService extends BaseService<Book> {
  constructor(
    @Inject(APP_CONTEXT) protected readonly appContext: AppContext,
    protected readonly client: PrismaService,
  ) {
    super(appContext, client);
  }

  model() {
    return this.client.book;
  }

  findByIsbn(isbn: string) {
    return this.model().findFirst({
      where: {
        isbn,
      },
    });
  }

  findByPagination(pagination: IPagination) {
    const { page = 0, limit = 20 } = pagination;
    return this.model().findMany({
      take: limit,
      skip: page * limit,
    });
  }

  findByCategory(category: { slug: string }) {
    return this.findByEntitySlug(category, "categories");
  }

  findByAuthor(author: { slug: string }) {
    return this.findByEntitySlug(author, "authors");
  }

  private findByEntitySlug(
    entity: { slug: string },
    field: "authors" | "categories",
  ) {
    return this.model().findMany({
      where: {
        [field]: {
          some: {
            slug: entity.slug,
          },
        },
      },
    });
  }
}
