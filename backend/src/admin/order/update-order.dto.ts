import { OrderStatus } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  status: OrderStatus;
}
