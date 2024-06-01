/** @format */

import { Card, CardContent } from '@/components/ui/card';
import { TypographyH5, TypographyP } from '@/components/ui/typography';
import { IBook } from '@/interfaces/book.interface';

interface Props {
	book: IBook;
}

export default function BookCard({ book }: Props) {
	return (
		<Card>
			<CardContent className="p-0 pr-4 grid grid-cols-12">
				<img
					className="col-span-3 rounded-tl-lg rounded-bl-lg"
					src={book.mainImage}
					alt={book.title}
				/>
				<div className="col-span-9 py-4 ml-4">
					<TypographyH5 className="mb-4">{book.title}</TypographyH5>
					<TypographyP className="text-sm">{book.description}</TypographyP>
					<div className="mt-4">
						<TypographyP className="text-sm">
							<strong>By:</strong>{' '}
							{book.authors.map((author) => author.name).join(', ')}
						</TypographyP>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
