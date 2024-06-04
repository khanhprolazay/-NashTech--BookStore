import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BookPromotion } from "./book-promotion.model";

@ObjectType()
export class Promotion {
  @Field(type => ID)
  id: string

  @Field()
  title: string

  @Field()
  slug: string

  @Field()
  beginAt: Date

  @Field()
  endAt: Date

  @Field()
  isActive: boolean

  @Field()
  description: string

  @Field(type => BookPromotion)
  bookPromotions: BookPromotion[]
}