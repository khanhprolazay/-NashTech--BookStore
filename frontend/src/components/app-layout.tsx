/** @format */

import { PropsWithChildren } from 'react';
import AppHeader from './app-header';
import AppFooter from './app-footer';

export default function AppLayout(props: PropsWithChildren) {
	return (
		<div className="min-h-screen relative flex flex-col">
			<AppHeader />
				{props.children}
			<AppFooter />
		</div>
	);
}
