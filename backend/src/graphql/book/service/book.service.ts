import { Inject, Injectable } from "@nestjs/common";
import { Book } from "@prisma/client";
import { BaseService } from "src/core/service/base.service";
import { PrismaService } from "src/core/service/prisma.service";
import { IPagination, Sort } from "src/core/interface";
import { APP_CONTEXT } from "src/core/constant/app.constant";
import { AppContext } from "src/core/type/app-context.type";
import { BookFilterDto } from "src/core/dto/book-filter.dto";

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

  override findBySlug(slug: string) {
    return this.model().findFirst({
      where: {
        slug,
      },
      include: {
        promotions: {
          select: {
            discount: true,
            promotion: true,
          },
        },
        analysis: true,
        authors: {
          select: {
            author: {
              select: {
                name: true,
                slug: true,
              },
            },
          },
        },
        categories: {
          select: {
            category: {
              select: {
                name: true,
                slug: true,
              },
            },
          },
        },
      },
    });
  }

  async findMany(pagination: IPagination, filter: BookFilterDto) {
    let where = {};
    let orderBy = {};

    switch (pagination.sort) {
      case Sort.SALE:
        where = {
          promotions: {
            some: {
              discount: {
                gt: 0,
              },
              promotion: {
                isActive: true,
              },
            },
          },
        };
        break;
      case Sort.POPULARITY:
        orderBy = {
          analysis: {
            totalView: "desc",
          },
        };
        break;
      case Sort.RECOMMEND:
        orderBy = {
          analysis: {
            avarageRating: "desc",
          },
        };
        break;
      case Sort.LOW:
        orderBy = {
          price: "asc",
        };
        break;
      case Sort.HIGH:
        orderBy = {
          price: "desc",
        };
        break;
    }

    if (filter.categories.length) {
      where = {
        ...where,
        categories: {
          some: {
            category: {
              slug: {
                in: filter.categories,
              },
            },
          },
        },
      };
    }

    if (filter.authors.length) {
      where = {
        ...where,
        authors: {
          some: {
            author: {
              slug: {
                in: filter.authors,
              },
            },
          },
        },
      };
    }

    const [total, books] = await Promise.all([
      this.model().count({
        where,
      }),
      this.model().findMany({
        where,
        orderBy,
        include: {
          promotions: {
            select: {
              discount: true,
              promotion: true,
            },
          },
          analysis: true,
        },
        skip: (pagination.page - 1) * pagination.limit,
        take: pagination.limit,
      }),
    ]);

    return {
      books,
      pagination: {
        total,
        count: books.length,
        page: pagination.page,
        limit: pagination.limit,
      },
    };
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
