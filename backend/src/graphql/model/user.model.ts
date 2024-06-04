import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Order } from "./order";
import { Cart } from "./cart.model";
import { Review } from "./review.model";

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  picture: string;

  @Field((type) => [Order])
  orders: Order[];

  @Field((type) => [Cart])
  carts: Cart[];

  @Field((type) => [Review])
  reviews: Review[];
}
