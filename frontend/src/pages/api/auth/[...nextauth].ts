/** @format */

import KeycloakProvider from 'next-auth/providers/keycloak';
import NextAuth, { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
	providers: [
		KeycloakProvider({
			idToken: true,
			clientId: process.env.SERVICE_ACCOUNT_CLIENT_ID as string,
			clientSecret: process.env.SERVICE_ACCOUNT_CLIENT_SECRET as string,
			issuer: process.env.SERVICE_ACCOUNT_ISSUER as string,
		}),
	],
	callbacks: {},
};

export default NextAuth(authOptions);
