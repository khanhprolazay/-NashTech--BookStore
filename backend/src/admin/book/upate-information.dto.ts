import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateInformationDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsNumber()
  @IsNotEmpty()
  price: number

  @IsNumber()
  @IsNotEmpty()
  discount: number
}