/** @format */

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ToastAction } from '@/components/ui/toast';
import { TypographyH4 } from '@/components/ui/typography';
import { useToast } from '@/components/ui/use-toast';
import useSession from '@/hooks/use-session.hook';
import { IBook } from '@/interfaces/book.interface';
import { updateCart } from '@/services/user.service';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

interface Props {
	book: IBook;
}

export default function CartForm({ book }: Props) {
	const isOnSale = book.promotions.length > 0;
	const price = isOnSale
		? (book.price * (100 - book.promotions[0].discount)) / 100
		: book.price;

	const { toast } = useToast();
	const [quatity, setQuatity] = useState<number>(1);
	const { user, accessToken, update } = useSession();

	const onSubmit = () => {
		if (!user || !accessToken) {
			return toast({
				title: 'Login required!',
				duration: 5000,
				description: 'You need to login to add to cart',
				variant: 'infor',
				action: <ToastAction altText="Try again" onClick={() => signIn("keycloak")}>Go to Login</ToastAction>
			})
		}

		return updateCart(accessToken, {
			bookId: book.id,
			quantity: quatity,
		}).then((carts) => {
			toast({
				title: 'Success',
				duration: 3000,
				description: 'Add to cart successfully',
				variant: 'success',
			});
			update({
				...user,
				carts,
			});
		}).catch((error) => {
			toast({
				title: 'Oh! Something went wrong!',
				duration: 3000,
				description: error.message,
				variant: 'destructive',
			});
		})
	};

	return (
			<Card className='flex-1'>
				<CardHeader className="py-4 border-b">
					<div className="flex items-center gap-2">
						{isOnSale && (
							<p className="text-sm line-through text-slate-400">
								{book.price}$
							</p>
						)}
						<TypographyH4 className="text-primary">{price}$</TypographyH4>
					</div>
				</CardHeader>
				<CardContent className="py-12">
					<div className="border flex">
						<Button
							className="bg-background text-lg text-foreground hover:bg-slate-200 rounded-none"
							onClick={() => setQuatity(quatity - 1)}>
							-
						</Button>
						<span className="border-l border-r flex-1 items-center flex justify-around">
							{quatity}
						</span>
						<Button
							className="bg-background text-lg text-foreground hover:bg-slate-200 rounded-none"
							onClick={() => setQuatity(quatity + 1)}>
							+
						</Button>
					</div>
					<Button className="w-full mt-8" onClick={onSubmit}>
						Add to cart
					</Button>
				</CardContent>
			</Card>
	);
}
