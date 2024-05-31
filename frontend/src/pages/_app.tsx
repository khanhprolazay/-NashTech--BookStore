/** @format */

import './_globals.css';
import AppLayout from '@/components/app-layout';

export default function RootLayout({ Component, pageProps }: any) {
	return (
		<AppLayout>
			<Component {...pageProps} />
		</AppLayout>
	);
}
