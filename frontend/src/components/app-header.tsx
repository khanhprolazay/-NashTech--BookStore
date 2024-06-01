/** @format */
'use client';

import AppContainer from './app-container';
import Image from 'next/image';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
	ListItem,
} from './ui/navigation-menu';
import Link from 'next/link';
import { cn } from '../lib/utils';
import { signOut, useSession } from 'next-auth/react';
import { NavigationMenuItem } from '@radix-ui/react-navigation-menu';

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
	const { data } = useSession();
	const user = data?.user;

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

					<div className="flex gap-4 items-center">
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
								{user && (
									<NavigationMenuItem>
										<NavigationMenuTrigger>
											<img
												className="w-8 h-8 rounded-full"
												src={user.image as string}
												alt="user"
											/>
										</NavigationMenuTrigger>
										<NavigationMenuContent>
											<ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
												<ListItem href="https://keycloak.bagiit.vn/realms/bookworm/account" title="Manage account">
													Manage information likes email, password, ...
												</ListItem>
												<ListItem
													href="#"
													onClick={() => signOut()}
													title="Sign out">
													Log out from the system
												</ListItem>
											</ul>
										</NavigationMenuContent>
									</NavigationMenuItem>
								)}
							</NavigationMenuList>
						</NavigationMenu>
					</div>
				</div>
			</AppContainer>
		</header>
	);
}
