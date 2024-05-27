import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from "class-validator";

function IsDiscountValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsDiscountValid",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === "number" && value >= 0 && value <= 100;
        },
        defaultMessage(args: ValidationArguments) {
          return "Discount must be a number between 0 and 100";
        },
      },
    });
  };
}

export class AddBookDto {
  @IsString()
  @IsNotEmpty()
  book: string;

  @IsDiscountValid()
  @IsNotEmpty()
  discount: number;
}

export class UpdateDiscountDto {
  @IsDiscountValid()
  @IsNotEmpty()
  discount: number;
}