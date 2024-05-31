import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class BookFilterDto {
  @Field(type => [String], { nullable: true, defaultValue: [] })
  categories: string[];

  @Field(type => [String], { nullable: true, defaultValue: [] })
  authors: string[];

  @Field({ nullable: true, defaultValue: "" })
  search: string;
}
