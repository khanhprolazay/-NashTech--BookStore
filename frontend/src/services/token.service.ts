/** @format */

import jwt from "jsonwebtoken";

let token: string = "";

const clientId = process.env.SERVICE_ACCOUNT_CLIENT_ID as string;
const clientSecret = process.env.SERVICE_ACCOUNT_CLIENT_SECRET as string;
const tokenEndpoint = process.env.SERVICE_ACCOUNT_TOKEN_ENDPOINT as string;

export async function getToken() {
	const decode = jwt.decode(token) as jwt.JwtPayload;

	if (decode && decode.exp && decode.exp > Date.now() / 1000) {
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
