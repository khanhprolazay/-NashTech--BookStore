/** @format */

import { IUser } from '@/interfaces/user.interface';
import { execute } from './util.service';
import { AddReviewDto, UpdateCartDto } from './dto';
import { IReview } from '@/interfaces/book.interface';

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
      },
      orders {
        id,
        status,
        books {
          price,
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
    }
  }`;
	const result = await execute(query, token);
	return result.user as IUser;
}

export async function updateCart(token: string, dto: UpdateCartDto) {
	const query = `
  mutation {
    updateCart(dto: {bookId: "${dto.bookId}", quantity: ${dto.quantity}}) {
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

export async function checkoutOrder(token: string) {
  const query = `
  mutation {
    checkoutOrder {
      id,
      status,
      books {
        price,
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
  return result.checkoutOrder as IUser['orders'];
}

export async function review(token: string, dto: AddReviewDto) {
  const query = `
  mutation {
    review(dto: {bookId: "${dto.bookId}", title: "${dto.title}", content: "${dto.content}", rating: ${dto.rating}}) {
      id,
      title,
      content,
      rating,
      createdAt,
      user {
        id,
        name,
        email,
      },
    }
  }`;
  const result = await execute(query, token);
  return result.review as IReview;
}