/** @format */

import './_globals.css';
import { SessionProvider } from 'next-auth/react';
import AppLayout from '@/components/app-layout';

export default function RootLayout({ Component, pageProps: { session, ...pageProps } }: any) {
	return (
		<SessionProvider session={session}>
			<AppLayout>
				<Component {...pageProps} />
			</AppLayout>
		</SessionProvider>
	);
}
