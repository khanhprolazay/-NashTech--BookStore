import { Injectable } from "@nestjs/common";
import { Review } from "@prisma/client";
import { BaseService } from "src/core/service/base.service";

@Injectable()
export class ReviewService extends BaseService<Review> {
  model() {
    return this.client.review;
  }

  async findByBookSlug(slug: string) {
    const [reviews, group, analysys] = await Promise.all([
      this.model().findMany({
        where: {
          book: {
            slug,
          },
        },
        select: {
          id: true,
          rating: true,
          title: true,
          content: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              picture: true,
            },
          },
        },
      }),

      this.model().groupBy({
        by: ["rating"],
        _count: true,
        where: {
          book: {
            slug,
          },
        },
      }),

      this.client.analysis.findFirst({
        where: {
          book: {
            slug,
          },
        },
        select: {
          avarageRating: true,
          totalReview: true,
        }
      }),
    ]);
    
    Array.from({ length: 5 }, (_, i) => {
      if (!group.find((g) => g.rating === i + 1)) {
        group.push({
          rating: i + 1,
          _count: 0,
        });
      }
    });

    return {
      ...analysys,
      reviews,
      count: group,
    };
  }
}
