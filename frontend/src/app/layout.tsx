/** @format */

import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import AppLayout from '@/components/app-layout';
import Head from 'next/head';

const roboto = Roboto({
	weight: ['100', '300', '400', '500', '700', '900'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: 'Bookworm',
	description: 'The most popular book selling platform',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased relative',
					roboto.variable
				)}>
				<AppLayout>{children}</AppLayout>
			</body>
		</html>
	);
}
