import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Order } from "./order";
import { Cart } from "./cart.model";

@ObjectType()
export class User {
  @Field(type => ID)
  id: string

  @Field(type => [Order])
  orders: Order[]

  @Field(type => [Cart])
  carts: Cart[]
}