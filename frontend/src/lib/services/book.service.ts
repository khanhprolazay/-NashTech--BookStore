/** @format */

import { execute } from './util.service';

export function getBooks(
	options: { page?: number; limit?: number } = { page: 1, limit: 1 }
) {
	const query = `
  query {
    books(dto: { page: ${options.page}, limit: ${options.limit} }) {
      id, title, description
    }
  }`;
	return execute(query);
}
