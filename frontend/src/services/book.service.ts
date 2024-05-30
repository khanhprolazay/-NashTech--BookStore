/** @format */

import { execute } from './util.service';
import { IBook, BookOnAnalysisDto } from '../interface/book.interface';
import { IPagination } from '@/interface/pagination.interface';


export async function getBooks(options: IPagination = { page: 1, limit: 1 }) {
	const query = `
  query {
    books(dto: { page: ${options.page}, limit: ${options.limit} }) {
      title,
      price,
      mainImage,
      promotions {
        discount
      }
    }
  }`;
	const result = await execute(query);
	return result.books as IBook[];
}

export async function getBooksOnSale(
	options: IPagination = { page: 1, limit: 1 }
) {
	const query = `
  query {
    booksOnSale(dto: { page: ${options.page}, limit: ${options.limit} }) {
      id,
      title,
      price,
      mainImage,
      promotions {
        discount
      }
    }
  }`;
	const result = await execute(query);
	return result.booksOnSale as IBook[];
}

export async function getBooksOnAnalysis(
  options: BookOnAnalysisDto = { page: 1, limit: 1 , sort: 'totalOrderQuantity' }
) {
  const query = `
  query {
    booksOnAnalysis(dto: { page: ${options.page}, limit: ${options.limit}, sort: "${options.sort}" }) {
      id,
      title,
      price,
      mainImage,
      promotions {
        discount
      }
    }
  }`;
	const result = await execute(query);
	return result.booksOnAnalysis as IBook[];
}
