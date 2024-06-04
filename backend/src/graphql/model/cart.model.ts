import { Field, ObjectType } from "@nestjs/graphql";
import { Book } from "src/graphql/model/book.model";
import { Promotion } from "src/graphql/model/promotion.model";

@ObjectType()
export class Cart {
  @Field((type) => Book)
  book: Book;

  @Field()
  quantity: number;

  @Field()
  discount: number;

  @Field((type) => Promotion, { nullable: true })
  promotion: Promotion;
}
