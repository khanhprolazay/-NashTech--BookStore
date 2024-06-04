/** @format */

import { getToken } from './token.service';

const endpoint = "http://localhost:5000/graphql";

export async function execute(query: string, token?: string) {
	const accessToken = token || (await getToken());
	const body = {
		query,
		variables: {},
		operationName: null,
	};

	const response = await fetch(endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(body),
		cache: 'no-store',
	});
	
	const json = await response.json();

	if (json.error) {
		throw new Error(json.error);
	}

	if (json.errors) {
		throw new Error(json.errors[0].message);
	}

	if (!json.data) {
		throw new Error('No data found');
	}

	return json.data;	
}

