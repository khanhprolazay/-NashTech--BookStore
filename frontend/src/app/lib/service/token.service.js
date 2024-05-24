/** @format */

import jwt from "jsonwebtoken";

let token = null;

const clientId = process.env.SERVICE_ACCOUNT_CLIENT_ID;
const clientSecret = process.env.SERVICE_ACCOUNT_CLIENT_SECRET;
const tokenEndpoint = process.env.SERVICE_ACCOUNT_TOKEN_ENDPOINT;
const tokenExpriedTime = process.env.SERVICE_ACCOUNT_TOKEN_EXPRIED_TIME;

export async function getToken() {
	if (token && jwt.decode(token).exp > Date.now() / 1000) {
		return token;
	}
	const response = await fetch(tokenEndpoint, {
		method: "POST",
		headers: {"Content-Type": "application/x-www-form-urlencoded"},
		body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
		cache: "no-store",
	});

	if (!response.ok) {
		throw new Error("Failed to get token");
	}

	token = (await response.json()).access_token;
	return token;
}
