import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Review {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  email: string

  @Field()
  picture: string

  @Field()
  title: string

  @Field()
  content: string

  @Field()
  rating: number
} 