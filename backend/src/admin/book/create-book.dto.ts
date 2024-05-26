import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumberString()
  @IsNotEmpty()
  price: string;

  @IsNumberString()
  @IsNotEmpty()
  discount: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}