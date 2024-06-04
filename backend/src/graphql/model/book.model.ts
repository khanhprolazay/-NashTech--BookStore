import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Author } from "./author.model";
import { Category } from "./category.model";
import { BookPromotion } from "./book-promotion.model";
import { Analysis } from "./analysis.model";
import { Pagination } from "./pagination.model";

@ObjectType()
export class Book {
  @Field(type => ID)
  id: string

  @Field()
  title: string

  @Field()
  description: string

  @Field()
  price: number

  @Field()
  mainImage: string

  @Field()
  slug: string

  @Field(type => [Author])
  authors: Author[]

  @Field(type => [Category])
  categories: Category[]

  @Field(type => [BookPromotion])
  promotions: BookPromotion[]

  @Field(type => Analysis)
  analysis: Analysis
}

@ObjectType()
export class BooksWithPagination {
  @Field(type => [Book])
  books: Book[]

  @Field(type => Pagination)
  pagination: Pagination
}