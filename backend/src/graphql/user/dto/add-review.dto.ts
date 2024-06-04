import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AddReviewDto {
  @Field()
  bookId: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  rating: number;
}