import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "./user.model";

@ObjectType()
export class Review {
  @Field(type => ID)
  id: string

  @Field()
  content: string

  @Field()
  rating: number

  @Field(type => User)
  user: User
}