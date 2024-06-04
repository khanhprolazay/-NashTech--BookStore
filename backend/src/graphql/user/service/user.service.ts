import { Injectable } from "@nestjs/common";
import { BaseService } from "src/core/service/base.service";
import { User } from "../../model/user.model";
import { UpdateCartDto } from "../dto/update-cart-dto";
import { OrderStatus } from "src/core/constant/order.constant";

@Injectable()
export class UserService extends BaseService<User> {
  model() {
    return this.client.user;
  }

  findOrders(id: string) {
    return this.client.order.findMany({
      where: {
        userId: id,
      },
      include: {
        books: {
          include: {
            book: true,
          },
        },
      },
    });
  }

  findCart(id: string) {
    return this.client.cart.findMany({
      where: { userId: id },
      include: {
        book: true,
      },
      orderBy: {
        book: {
          title: "asc",
        },
      },
    });
  }

  async updateCart(userId: string, dto: UpdateCartDto) {
    const now = new Date();

    const promotion = await this.client.promotionToBook.findFirst({
      where: {
        bookId: dto.bookId,
        promotion: {
          beginAt: { lte: now },
          endAt: { gte: now },
        },
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
        promotionId: promotion?.promotionId,
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

  async checkoutOrder(userId: string) {
    const carts = await this.findCart(userId);

    carts.forEach(async (cart) => {
      const analysis = await this.client.analysis.findFirst({
        where: {
          bookId: cart.bookId,
        },
      });

      await this.client.analysis.update({
        where: {
          bookId: cart.bookId,
        },
        data: {
          totalOrder: analysis.totalOrder + 1,
          totalOrderQuantity: analysis.totalOrderQuantity + cart.quantity,
        },
      });

      await this.client.cart.delete({
        where: {
          userId_bookId: {
            userId,
            bookId: cart.bookId,
          },
        },
      });
    });

    const order = await this.client.order.create({
      data: {
        userId,
        status: OrderStatus.PENDING,
        books: {
          create: carts.map((cart) => ({
            bookId: cart.bookId,
            quantity: cart.quantity,
            discount: cart.discount,
            price: cart.book.price,
          })),
        },
      },
      select: {
        id: true,
        status: true,
        books: {
          select: {
            book: true,
            quantity: true,
            discount: true,
            price: true,
          },
        },
        updatedAt: true,
      },
    });
    return order;
  }
}
