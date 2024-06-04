import { Field, ObjectType } from "@nestjs/graphql";
import { Book } from "src/graphql/model/book.model";

@ObjectType()
export class Order {
  @Field((type) => [OrderToBook])
  books: OrderToBook[];

  @Field()
  id: string;

  @Field()
  status: string;
}

@ObjectType()
export class OrderToBook {
  @Field((type) => Book)
  book: Book;

  @Field()
  quantity: number;

  @Field()
  discount: number;

  @Field()
  price: number;
}
