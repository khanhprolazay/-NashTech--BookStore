import { IBook, IPromotion } from "./book.interface";

export interface IUser {
  id: string;
  email: string;
  name: string;
  image: string;
  carts: ICart[];
}

export interface ICart {
  quantity: number;
  promotion: IPromotion;
  book: IBook;
  discount: number;
}