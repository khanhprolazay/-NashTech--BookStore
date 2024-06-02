/** @format */

import { execute } from './util.service';
import {
	IAuthor,
	ICategory,
	IBookFilter,
	IBooksWithPagination,
	IBook,
} from '../interfaces/book.interface';
import { IPagination, Sort } from '@/interfaces/pagination.interface';

export async function getBooks(
	options: IPagination = { page: 1, limit: 1, sort: Sort.POPULARITY },
	filter: IBookFilter = { authors: [], categories: [], search: '' }
) {
	const query = `
  query {
    books(pagination: { page: ${options.page}, limit: ${options.limit}, sort: "${options.sort}" }, filter: { authors: ${JSON.stringify(filter.authors)}, categories: ${JSON.stringify(filter.categories)}, search: "${filter.search}" }) {
      books {
        title,
        price,
        slug,
        mainImage,
        promotions {
          discount
        }
      },
      pagination {
        count,
        total,
        page,
        limit
      }
    }
  }`;
	const result = await execute(query);
	return result.books as IBooksWithPagination;
}

export async function getAuthors() {
	const query = `
  query {
    authors {
      name,
      slug 
    }
  }`;
	const result = await execute(query);
	return result.authors as IAuthor[];
}

export async function getCategories() {
	const query = `
  query {
    categories {
      name,
      slug
    }
  }`;
	const result = await execute(query);
	return result.categories as ICategory[];
}

export async function getBook(slug: string) {
	const query = `
  query {
    book(slug: "${slug}") {
      id,
      title,
      description,
      mainImage,
      categories {
        name,
      },
      authors {
        name,
      },
      analysis {
        avarageRating,
        totalRating
      },
      price,
      promotions {
        discount,
        promotion {
          id,
          title
        }
      }
    }
  }
  `;
	const result = await execute(query);
	return result.book as IBook;
}
