/** @format */

import AppContainer from '@/components/app-container';
import { Separator } from '@/components/ui/separator';
import { TypographyH4, TypographyMuted } from '@/components/ui/typography';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/vertical-tab';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default function Layout(props: PropsWithChildren) {
	const pathname = usePathname();
	const lastPath = pathname.split('/').pop();
	return (
		<AppContainer>
			<TypographyH4>Settings</TypographyH4>
			<TypographyMuted>Manage your accounts settings.</TypographyMuted>
			<Separator className="my-6" />
			<div className="grid grid-cols-12 gap-8">
				<div className="col-span-2">
					<Tabs value={lastPath}>
						<TabsList className="w-full !bg-background">
							<Link href="/user/cart" className="w-full">
								<TabsTrigger
									className="w-full data-[state=active]:border-primary data-[state=active]:border data-[state=active]:text-primary data-[state=active]:bg-background"
									value="cart">
									Cart
								</TabsTrigger>
							</Link>
							<Link href="/user/order" className="w-full">
								<TabsTrigger
									className="w-full data-[state=active]:border-primary data-[state=active]:border data-[state=active]:text-primary data-[state=active]:bg-background"
									value="order">
									Order
								</TabsTrigger>
							</Link>
						</TabsList>
					</Tabs>
				</div>

				<>{props.children}</>
			</div>
		</AppContainer>
	);
}
