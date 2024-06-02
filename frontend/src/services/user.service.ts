/** @format */

import { IUser } from '@/interfaces/user.interface';
import { execute } from './util.service';
import { UpdateCartDto } from './dto';

export async function getUser(token: string) {
	const query = `
  query {
    user {
      id,
      carts {
        quantity,
        discount,
        book {
          id,
          title,
          slug,
          price,
          mainImage
        }
      }
    }
  }`;
	const result = await execute(query, token);
	return result.user as IUser;
}

export async function updateCart(token: string, dto: UpdateCartDto) {
  console.log(token, dto);
	const query = `
  mutation {
    updateCart(dto: {bookId: "${dto.bookId}", quantity: ${dto.quantity}, promotionId: "${dto.promotionId}"}) {
      quantity,
      discount,
      book {
        id,
        title,
        slug,
        price,
        mainImage
      }
    }
  }`;
	const result = await execute(query, token);
	return result.updateCart as IUser['carts'];
}

export async function removeCart(token: string, bookId: string) {
  const query = `
  mutation {
    removeCart(bookId: "${bookId}") {
      quantity,
      discount,
      book {
        id,
        title,
        slug,
        price,
        mainImage
      }
    }
  }`;
  const result = await execute(query, token);
  return result.removeCart as IUser['carts'];
}