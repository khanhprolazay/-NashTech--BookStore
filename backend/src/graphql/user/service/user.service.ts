import { Injectable } from "@nestjs/common";
import { BaseService } from "src/core/service/base.service";
import { User } from "../model/user.model";
import { UpdateCartDto } from "../dto/update-cart-dto";

@Injectable()
export class UserService extends BaseService<User> {
  model() {
    return this.client.user;
  }

  findOrders(id: string) {
    return this.client.order.findMany({
      where: { userId: id },
    });
  }

  findCart(id: string) {
    return this.client.cart.findMany({
      where: { userId: id },
      include: {
        book: true,
      },
    });
  }

  async updateCart(userId: string, dto: UpdateCartDto) {
    const promotion = await this.client.promotionToBook.findFirst({
      where: {
        bookId: dto.bookId,
        promotionId: dto.promotionId,
      },
    });

    await this.client.cart.upsert({
      where: {
        userId_bookId: {
          userId,
          bookId: dto.bookId,
        },
      },
      update: { quantity: dto.quantity },
      create: {
        userId,
        bookId: dto.bookId,
        quantity: dto.quantity,
        discount: promotion?.discount || 0,
        promotionId: promotion?.id,
      },
    });

    return this.findCart(userId);
  }

  async removeCart(userId: string, bookId: string) {
    await this.client.cart.delete({
      where: {
        userId_bookId: {
          userId,
          bookId,
        },
      },
    });

    return this.findCart(userId);
  }
}
