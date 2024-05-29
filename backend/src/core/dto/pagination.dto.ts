import { Field, InputType } from "@nestjs/graphql";
import { IPagination, PaginationOrder } from "../interface";


@InputType()
export class PaginationDto implements IPagination {
  @Field({ nullable: true, defaultValue: 0 })
  page: number;

  @Field({ nullable: true, defaultValue: 10 })
  limit: number;

  @Field({ nullable: true })
  sort: string;

  @Field({ nullable: true, defaultValue: PaginationOrder.DESC })
  order: PaginationOrder;

  @Field({ nullable: true, defaultValue: '' })
  search: string;
}