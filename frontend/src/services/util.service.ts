/** @format */

import { getToken } from './token.service';

const endpoint = "http://localhost:5000/graphql"

export async function execute(query: string, token?: string) {
	try {
		const accssToken = token || (await getToken());
		const body = {
			query,
			variables: {},
			operationName: null,
		};

		const response = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accssToken}`,
			},
			body: JSON.stringify(body),
			cache: 'no-store',
		});

		return (await response.json()).data;
	} catch (error) {
		console.error(error);
	}
}

