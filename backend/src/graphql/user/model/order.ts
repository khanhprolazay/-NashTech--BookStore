import { Field, ObjectType } from "@nestjs/graphql";
import { Book } from "src/graphql/book/model/book.model";

@ObjectType()
export class Order {
  @Field(type => [Book])
  books: Book[]

  @Field()
  quantity: number

  @Field()
  status: string
} 