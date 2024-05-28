/** @format */

import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const roboto = Roboto({
	weight: ['100', '300', '400', '500', '700', '900'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
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
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased',
					roboto.className
				)}>
				{children}
			</body>
		</html>
	);
}
