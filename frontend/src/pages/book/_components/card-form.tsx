/** @format */

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TypographyH4 } from '@/components/ui/typography';
import { IBook } from '@/interfaces/book.interface';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

interface Props {
	book: IBook;
}

export default function CardForm({ book }: Props) {
	const isOnSale = book.promotions.length > 0;
	const price = isOnSale
		? (book.price * (100 - book.promotions[0].discount)) / 100
		: book.price;

	const [quatity, setQuatity] = useState(1);

	return (
		<Card>
			<CardHeader className="py-4 border-b">
				<div className="flex items-center gap-2">
					{isOnSale && (
						<p className="text-sm line-through text-slate-400">{book.price}$</p>
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
				<Button className="w-full mt-8" onClick={() => signIn('keycloak')}>Add to cart</Button>
			</CardContent>
		</Card>
	);
}
