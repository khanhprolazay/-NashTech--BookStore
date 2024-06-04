/** @format */

import { IBook, IPromotion, IReview } from './book.interface';

export interface IUser {
	id: string;
	email: string;
	name: string;
	image: string;
	carts: ICart[];
  orders: IOrder[];
	reviews: IReview[];
}

export interface ICart {
	quantity: number;
	promotion: IPromotion;
	book: IBook;
	discount: number;
}

export interface IOrder {
	id: string;
	status: OrderStatus;
	books: {
		book: IBook;
		quantity: number;
		discount: number;
		price: number;
	}[];
}

export enum OrderStatus {
	PENDING = 'PENDING',
	PROCESSING = 'PROCESSING',
	SHIPPING = 'SHIPPING',
	COMPLETED = 'COMPLETED',
	CANCELLED = 'CANCELLED',
}
