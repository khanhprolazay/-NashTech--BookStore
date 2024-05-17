import { Field, InputType } from "@nestjs/graphql";
import { IPagination, PaginationOrder } from "../interface";


@InputType()
export class PaginationDto implements IPagination {
  @Field({ nullable: true })
  page: number;

  @Field({ nullable: true })
  limit: number;

  @Field({ nullable: true })
  sort: string;

  @Field({ nullable: true })
  order: PaginationOrder;

  @Field({ nullable: true })
  search: string;
}