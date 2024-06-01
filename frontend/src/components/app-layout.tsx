/** @format */

import { PropsWithChildren } from 'react';
import AppHeader from './app-header';
import AppFooter from './app-footer';
import { Roboto_Flex} from 'next/font/google';
import { cn } from '@/lib/utils';
import Head from 'next/head';

const roboto = Roboto_Flex({
	weight: ['100', '300', '400', '500', '700', '900'],
	style: ['normal'],
	subsets: ['latin'],
	variable: '--font-sans',
});

export const metadata = {
	title: 'Bookworm',
	description: 'The most popular book selling platform',
};

export default function AppLayout(props: PropsWithChildren) {
	return (
		<div
			className={cn(
				'flex flex-col min-h-screen bg-background font-sans antialiased relative',
				roboto.variable
			)}>
			<Head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>{metadata.title}</title>
				<meta name="description" content={metadata.description} />
				<link rel='icon' type="image/svg" href='/bookworm.svg'/>
			</Head>
			<AppHeader />
			<main className="flex-1 py-16">{props.children}</main>
			<AppFooter />
		</div>
	);
}
