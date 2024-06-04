import { Injectable } from "@nestjs/common";
import { Order, OrderStatus } from "@prisma/client";
import { BaseService } from "src/core/service/base.service";
import { UpdateOrderDto } from "./update-order.dto";

@Injectable()
export class OrderService extends BaseService<Order> {
  model() {
    return this.client.order;
  }

  findMany() {
    return this.model().findMany({
      select: {
        id: true,
        status: true,
        books: {
          select: {
            price: true,
            quantity: true,
            discount: true,
            book: {
              select: {
                title: true,
                mainImage: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            picture: true,
          },
        },
      },
    });
  }

  tracking(id: string, status: OrderStatus) {
    return this.client.orderTrackingLog.create({
      data: {
        status,
        orderId: id,
      },
    });
  }
}
