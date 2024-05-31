import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Book } from "./book.model";

@ObjectType()
export class Analysis {
  @Field(type => ID)
  id: string

  @Field()
  avarageRating: number

  @Field()
  totalRating: number

  @Field()
  totalReview: number

  @Field()
  totalOrder: number
  
  @Field()
  totalOrderQuantity: number
}