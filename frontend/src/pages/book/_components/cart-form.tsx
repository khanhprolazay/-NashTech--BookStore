/** @format */

'use client';

import NotLoginModal from '@/components/modal/not-login-modal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TypographyH4 } from '@/components/ui/typography';
import { useToast } from '@/components/ui/use-toast';
import useSession from '@/hooks/use-session.hook';
import { IBook } from '@/interfaces/book.interface';
import { updateCart } from '@/services/user.service';
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
	const [open, setOpen] = useState<boolean>(false);
	const { user, accessToken, update } = useSession();

	const onSubmit = async () => {
		if (!user) {
			return setOpen(true);
		}

		if (!accessToken) {
			return setOpen(true);
		}

		const carts = await updateCart(accessToken, {
			bookId: book.id,
			quantity: quatity,
		});

		if (carts) {
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
		}
	};

	return (
		<>
			<NotLoginModal open={open} handleOpen={setOpen} />
			<Card>
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
		</>
	);
}
