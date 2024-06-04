import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Book } from "./book.model";

@ObjectType()
export class Author {
  @Field(type => ID)
  id: string

  @Field()
  name: string

  @Field()
  slug: string

  @Field(type => [Book])
  books: Book[]
}