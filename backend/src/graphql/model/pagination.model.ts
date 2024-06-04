import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Pagination {
  @Field()
  page: number

  @Field()
  limit: number

  @Field()
  count: number

  @Field()
  total: number
}