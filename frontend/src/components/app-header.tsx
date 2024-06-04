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
import { signIn, signOut } from 'next-auth/react';
import { NavigationMenuItem } from '@radix-ui/react-navigation-menu';
import useSession from '@/hooks/use-session.hook';
import { TrashIcon } from 'lucide-react';
import { Button } from './ui/button';
import { removeCart } from '@/services/user.service';

export default function AppHeader() {
	const { user, update, accessToken } = useSession();

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
	];

	async function handleRemoveCart(bookId: string) {
		if (!accessToken) return;
		const carts = await removeCart(accessToken, bookId);
		update({
			...user,
			carts,
		});
	}

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
												'!font-normal !bg-transparent cursor-pointer hover:underline'
											)}>
											{nav.label}
										</NavigationMenuLink>
									</Link>
								))}

								{!user && (
									<NavigationMenuLink
										onClick={() => signIn("keycloak")}
										className={cn(
											navigationMenuTriggerStyle(),
											'!font-normal !bg-transparent cursor-pointer hover:underline'
										)}>
										Sign in
									</NavigationMenuLink>
								)}

								{user && (
									<Link href="/user/cart" passHref>
										<NavigationMenuItem>
											<NavigationMenuTrigger className="px- bg-transparent">
												<NavigationMenuLink
													className={cn(
														navigationMenuTriggerStyle(),
														'!font-normal !bg-transparent pr-0'
													)}>
													Cart ({user.carts.length})
												</NavigationMenuLink>
											</NavigationMenuTrigger>
											<NavigationMenuContent>
												<ul className="grid gap-3 p-4 w-[400px] grid-cols-1">
													{user.carts.map((cart, index) => (
														<Link href={`/book/${cart.book.slug}`} key={index}>
															<div className="relative select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none flex gap-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
																<img
																	src={cart.book.mainImage}
																	alt={cart.book.title}
																	className="w-10 rounded"
																/>
																<div className="flex flex-col justify-center">
																	<div className="text-sm font-medium leading-4 w-3/4 mb-1">
																		{cart.book.title.split('(')[0]}
																	</div>
																	<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
																		x{cart.quantity} -{' '}
																		{(cart.book.price *
																			cart.quantity *
																			(100 - cart.discount)) /
																			100}{' '}
																		$
																	</p>
																</div>
																<Button
																	onClick={() => handleRemoveCart(cart.book.id)}
																	variant="outline"
																	size="icon"
																	className="absolute z-20 text-destructive top-2 border-destructive hover:text-destructive right-3">
																	<TrashIcon className=" w-3 h-3" />
																</Button>
															</div>
														</Link>
													))}
												</ul>
											</NavigationMenuContent>
										</NavigationMenuItem>
									</Link>
								)}

								{user && (
									<NavigationMenuItem>
										<NavigationMenuTrigger className='bg-transparent'>
											<img
												className="w-8 h-8 rounded-full"
												src={user.image as string}
												alt="user"
											/>
										</NavigationMenuTrigger>
										<NavigationMenuContent>
											<ul className="grid gap-3 p-4 md:w-[400px] grid-cols-[1.5fr_2fr]">
												<div className="flex justify-around items-center">
													<img
														src="/bookworm.svg"
														alt="logo"
														className="w-1/3"
													/>
												</div>
												<div>
													<ListItem
														href="https://keycloak.bagiit.vn/realms/bookworm/account"
														title="Manage account">
														Manage information likes email, password, ...
													</ListItem>
													<ListItem href="/user/order" title="Manage order">
														Manage your order
													</ListItem>
													<ListItem
														href="#"
														onClick={() => signOut()}
														title="Sign out">
														Log out off the system
													</ListItem>
												</div>
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
