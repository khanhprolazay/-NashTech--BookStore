import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "./user.model";
import { Pagination } from "./pagination.model";

@ObjectType()
export class Review {
  @Field()
  id: string

  @Field()
  title: string

  @Field()
  content: string

  @Field()
  rating: number

  @Field()
  createdAt: Date

  @Field(type => User)
  user: User
} 

@ObjectType()
export class RatingCount {
  @Field()
  rating: number

  @Field()
  _count: number
}

@ObjectType()
export class BookReview {
  @Field(type => [Review])
  reviews: Review[]
  
  @Field(type => Pagination)
  pagination: Pagination

  @Field(type => [RatingCount])
  count: RatingCount[]

  @Field()
  avarageRating: number

  @Field()
  totalReview: number
}