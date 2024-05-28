import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Book } from "./book.model";
import { Promotion } from "./promotion.model";

@ObjectType()
export class BookPromotion {
  @Field(type => ID)
  id: string

  @Field()
  discount: number

  @Field(type => Book)
  book: Book

  @Field(type => Promotion)
  promotion: Promotion
}