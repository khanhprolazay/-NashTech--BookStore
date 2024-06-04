import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { User } from "../../model/user.model";
import { UseGuards } from "@nestjs/common";
import { HeaderTokenGuard } from "src/core/guard/header-token.guard";
import { Client } from "src/core/decorator/client.decorator";
import { UserService } from "../service/user.service";
import { UpdateCartDto } from "../dto/update-cart-dto";
import { Cart } from "../../model/cart.model";
import { Order } from "../../model/order";
import { Review } from "src/graphql/model/review.model";
import { AddReviewDto } from "../dto/add-review.dto";

@Resolver((_) => User)
@UseGuards(HeaderTokenGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((_) => User)
  user(@Client() client: any) {
    return this.userService.findById(client.sub);
  }

  @ResolveField()
  orders(@Parent() user: User) {
    return this.userService.findOrders(user.id);
  }

  @ResolveField()
  carts(@Parent() user: User) {
    return this.userService.findCart(user.id);
  }

  @Mutation((returns) => [Cart])
  updateCart(@Args("dto") dto: UpdateCartDto, @Client() client: any) {
    return this.userService.updateCart(client.sub, dto);
  }

  @Mutation((returns) => [Cart])
  removeCart(@Args("bookId") bookId: string, @Client() client: any) {
    return this.userService.removeCart(client.sub, bookId);
  }

  @Mutation((returns) => Order)
  checkoutOrder(@Client() client: any) {
    return this.userService.checkoutOrder(client.sub);
  }

  @Mutation((returns) => Review)
  review(@Client() client: any, @Args("dto") dto: AddReviewDto) {
    return this.userService.review(client.sub, dto);
  }
}
