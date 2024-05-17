/** @format */

import { execute } from "./util.service";

export function getBooks({page = 1, limit = 1}) {
	const query = `
  query {
    books(dto: { page: ${page}, limit: ${limit} }) {
      id, title, description
    }
  }`;
	return execute(query);
}
