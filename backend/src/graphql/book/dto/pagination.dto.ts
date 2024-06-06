import { Field, InputType } from "@nestjs/graphql";
import { IPagination, PaginationOrder, Sort } from "../../../core/interface";

@InputType()
export class PaginationDto implements IPagination {
  @Field({ nullable: true, defaultValue: 1 })
  page: number;

  @Field({ nullable: true, defaultValue: 10 })
  limit: number;

  @Field({ nullable: true, defaultValue: Sort.POPULARITY })
  sort: Sort;

  @Field({ nullable: true, defaultValue: PaginationOrder.DESC })
  order: PaginationOrder;

  @Field({ nullable: true, defaultValue: "" })
  search: string;
}
