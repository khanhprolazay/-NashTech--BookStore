import { Field, InputType } from "@nestjs/graphql";
import { PaginationDto } from "./pagination.dto";
import { Analysis } from "@prisma/client";

type Sort = keyof Omit<Analysis, 'id' | 'bookId'>;

@InputType()
export class BookOnAnalysisDto extends PaginationDto {
  @Field({ nullable: true, defaultValue: 'totalOrderQuantity' })
  sort: Sort
}