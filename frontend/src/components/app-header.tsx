/** @format */
'use client';

import AppContainer from './app-container';
import Image from 'next/image';
import {
	NavigationMenu,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from './ui/navigation-menu';
import Link from 'next/link';
import { cn } from '../lib/utils';

const navs = [
	{
		label: 'Home',
		href: '/',
	},
	{
		label: 'Shop',
		href: '/shop',
	},
	{
		label: 'About',
		href: '#',
	},
	{
		label: 'Card',
		href: '#',
	},
];

export default function AppHeader() {
	return (
		<header className="h-14 sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<AppContainer>
				<div className="h-full flex justify-between items-center">
					<Link href="/">
						<div className="relative h-8 flex gap-2 items-center">
							<Image className="!static" src="/bookworm.svg" alt="Logo" fill />
							<h2 className="font-bold text-base uppercase">Bookworm</h2>
						</div>
					</Link>

					<NavigationMenu>
						<NavigationMenuList>
							{navs.map((nav) => (
								<Link key={nav.label} href={nav.href} legacyBehavior passHref>
									<NavigationMenuLink
										className={cn(
											navigationMenuTriggerStyle(),
											'!font-normal !bg-transparent'
										)}>
										{nav.label}
									</NavigationMenuLink>
								</Link>
							))}
						</NavigationMenuList>
					</NavigationMenu>
				</div>
			</AppContainer>
		</header>
	);
}
