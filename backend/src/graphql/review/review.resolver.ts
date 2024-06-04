import { Args, Query, Resolver } from "@nestjs/graphql";
import { BookReview, Review } from "../model/review.model";
import { UseGuards } from "@nestjs/common";
import { HeaderTokenGuard } from "src/core/guard/header-token.guard";
import { ReviewService } from "./review.service";

@Resolver(() => Review)
@UseGuards(HeaderTokenGuard)
export class ReviewResolver {
  constructor(private reviewService: ReviewService) {}

  @Query((_) => BookReview)
  reviews(@Args("slug") slug: string) {
    return this.reviewService.findByBookSlug(slug);
  }
}
