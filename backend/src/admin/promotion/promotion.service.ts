import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Promotion } from "@prisma/client";
import { BaseService } from "@/core/service/base.service";
import { CreatePromotionDto } from "./dto/create-promotion.dto";
import { Util } from "@/core/util/util";

@Injectable()
export class PromotionService extends BaseService<Promotion> {
  model() {
    return this.client.promotion;
  }

  findByPage(page: number) {
    return this.client.$queryRaw`
      select p.id, p.title, p.description, p."beginAt" , p."endAt",
      (p."beginAt" <= CURRENT_TIMESTAMP and p."endAt" >= CURRENT_TIMESTAMP) as "isActive",
      p."slug", count(ptb."bookId")
      from "Promotion" p
      left join "PromotionToBook" ptb on ptb."promotionId" = p.id
      group by p.id, p.title , p.description, p."beginAt" , p."endAt", p."slug"
      limit ${this.appContext.pagination.limit}
      offset ${(page - 1) * this.appContext.pagination.limit}
    ` as Promise<Promotion[]>;
  }

  findBySlug(slug: string) {
    return this.client.promotion.findFirst({
      where: { slug },
      include: {
        books: {
          select: {
            discount: true,
            book: {
              select: {
                id: true,
                price: true,
                title: true,
                mainImage: true,
              }
            },
          },
        },
        createdUser: {
          select: {
            name: true,
            email: true,
            picture: true,
          },
        },
      },
    });
  }

  getBooks() {
    return this.client.book.findMany();
  }

  addBook(promotionId: string, bookId: string, discount: number) {
    return this.client.promotionToBook.create({
      data: {
        bookId,
        promotionId,
        discount,
      },
    });
  }

  updateBookDiscount(promotionId: string, bookId: string, discount: number) {
    return this.client.promotionToBook.update({
      where: {
        promotionId_bookId: {
          promotionId,
          bookId,
        },
      },
      data: {
        discount,
      },
    });
  }

  removeBook(promotionId: string, bookId: string) {
    return this.model().update({
      where: {
        id: promotionId,
      },
      data: {
        books: {
          delete: [
            {
              promotionId_bookId: {
                bookId,
                promotionId,
              },
            },
          ],
        },
      },
    });
  }

  override create(data: CreatePromotionDto, createdUserId?: string) {
    const now = new Date();
    return super.create({
      ...data,
      slug: Util.slugify(data.title),
      createdUserId: createdUserId,
    });
  }

  override async delete(id: string) {
    const bookCount = await this.client.promotionToBook.count({
      where: { promotionId: id },
    });
    if (bookCount > 0) {
      throw new HttpException("Promotion is in use", HttpStatus.BAD_REQUEST);
    }
    return super.delete(id);
  }
}
