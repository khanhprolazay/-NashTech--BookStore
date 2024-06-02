import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateCartDto {
  @Field()
  bookId: string;

  @Field()
  quantity: number;

  @Field({ nullable: true })
  promotionId: string;
}