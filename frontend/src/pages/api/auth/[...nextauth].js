/** @format */

import KeycloakProvider from 'next-auth/providers/keycloak';
import { getUser } from '@/services/user.service';
import NextAuth from 'next-auth';

async function doFinalSignout({ id_token }) {
	try {
		const params = new URLSearchParams();
		params.append('id_token_hint', id_token);
		params.append('client_id', process.env.SERVICE_ACCOUNT_CLIENT_ID);
		console.log(`${process.env.SERVICE_ACCOUNT_END_SESSION}/protocol/openid-connect/logout?${params.toString()}`);
		await fetch(
			`${process.env.SERVICE_ACCOUNT_END_SESSION}?${params.toString()}`
		);
	} catch (err) {
		console.log(err);
	}
}

export const authOptions = {
	providers: [
		KeycloakProvider({
			idToken: true,
			clientId: process.env.SERVICE_ACCOUNT_CLIENT_ID,
			clientSecret: process.env.SERVICE_ACCOUNT_CLIENT_SECRET,
			issuer: process.env.SERVICE_ACCOUNT_ISSUER,
		}),
	],
	callbacks: {
		async session({ session, token }) {
			const user = await getUser(token.access_token);
			session.user.carts = user.carts;
			session.user.orders = user.orders;
			session.accessToken = token.access_token;
			return session;
		},

		async jwt({ token, account }) {
			if (account) {
				token.access_token = account.access_token;
				token.id_token = account.id_token;
			}
			return token;
		},
	},
	events: {
		signOut: ({ session, token }) => doFinalSignout(token),
	},
};

export default NextAuth(authOptions);
