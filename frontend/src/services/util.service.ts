/** @format */

import { getToken } from './token.service';

const endpoint = process.env.BACKEND_ENDPOINT as string;

export async function execute(query: string) {
	const token = await getToken();
	const body = {
		query,
		variables: {},
		operationName: null,
	};

	const response = await fetch(endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
		cache: 'no-store',
	});

	return (await response.json()).data;
}
