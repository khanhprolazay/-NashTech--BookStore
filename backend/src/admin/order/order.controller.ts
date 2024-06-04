import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import { HttpExceptionFilter } from "src/core/filter/http-exception.filter";
import { CookieTokenGuard } from "src/core/guard/cookie-token.guard";
import { RolesGuard } from "src/core/guard/roles.guard";
import { OrderService } from "./order.service";
import { Roles } from "src/core/decorator/roles.decorator";
import { Role } from "src/core/constant/user.constant";
import { UpdateOrderDto } from "./update-order.dto";

@Controller("admin/order")
@UseFilters(HttpExceptionFilter)
@UseGuards(CookieTokenGuard, RolesGuard)
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  @Render("orders")
  @Roles([Role.Admin])
  async index() {
    const orders = await this.orderService.findMany();
    return {
      title: "Order",
      orders,
    };
  }

  @Post("update")
  @Roles([Role.Admin])
  async update(@Body() dto: UpdateOrderDto) {
    const order = await this.orderService.update(dto.id, {
      status: dto.status,
    });
    await this.orderService.tracking(dto.id, dto.status);
    return order;
  }
}
