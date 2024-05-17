/** @format */

export async function getToken() {
	const clientId = process.env.SERVICE_ACCOUNT_CLIENT_ID;
	const clientSecret = process.env.SERVICE_ACCOUNT_CLIENT_SECRET;
	const tokenEndpoint = process.env.SERVICE_ACCOUNT_TOKEN_ENDPOINT;
	const tokenExpriedTime = process.env.SERVICE_ACCOUNT_TOKEN_EXPRIED_TIME;

	const response = await fetch(tokenEndpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
		next: { revalidate: parseInt(tokenExpriedTime) - 10 },
	});

	if (!response.ok) {
		throw new Error("Failed to get token");
	}

	return (await response.json()).access_token;
}
