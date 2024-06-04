/** @format */

import { getToken } from './token.service';

const endpoint = "http://localhost:5000/graphql"

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
		Promise.reject(json.error);
	}

	if (!json.data) {
		Promise.reject(json);
	}

	return json.data;	
}

