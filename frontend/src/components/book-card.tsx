/** @format */

import { IBook } from '@/interface/book.interface';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';

interface IBookCardProps {
	book: IBook;
}

export default function BookCard(props: IBookCardProps) {
	const { book } = props;
	const isOnSale = book.promotions.length > 0;
	const price = isOnSale
		? (book.price * (100 - book.promotions[0].discount)) / 100
		: book.price;

	return (
		<Card key={book.id} className="book-card cursor-pointer transform duration-150 hover:scale-105 flex flex-col shadow-none">
			<CardHeader className="p-0 py-4">
				<div className="flex justify-around items-center">
					<img
						src={book.mainImage}
						alt={book.title}
						className="w-auto max-h-[190px] rounded-lg"
					/>
				</div>
			</CardHeader>
			<CardContent className="flex-grow text-sm">
				<p className="line-clamp-2 h-10">{book.title.split('(')[0]}</p>
				<div className="flex gap-4">
					<h5 className="font-medium text-primary text-base">{price}$</h5>
					{isOnSale && (
						<Badge color="red" className="text-xs rounded-sm px-2">
							-{book.promotions[0].discount}%
						</Badge>
					)}
				</div>
				{isOnSale && (
					<p className="text-xs line-through text-slate-400">{book.price}$</p>
				)}
			</CardContent>
		</Card>
	);
}
