/** @format */

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	TypographyH3,
	TypographyH5,
	TypographyH6,
	TypographyMuted,
	TypographyP,
	TypographySmall,
} from '@/components/ui/typography';
import { IBook } from '@/interfaces/book.interface';

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

interface Props {
	book: IBook;
}

export default function ReviewList({ book }: Props) {
	return (
		<Card>
			<CardHeader className="py-4">
				<TypographyH6>Customer Review</TypographyH6>
			</CardHeader>
			<CardContent>
				<div className="flex gap-4">
					<div>
						<TypographyH3>4.6</TypographyH3>
						<TypographyMuted>[150]</TypographyMuted>
					</div>
					<div>
						<TypographyH3>Star</TypographyH3>
						<div className="flex h-5 items-center space-x-2">
							<TypographyMuted>5 start(100)</TypographyMuted>
							<Separator orientation="vertical" />
							<TypographyMuted>4 start(50)</TypographyMuted>
							<Separator orientation="vertical" />
							<TypographyMuted>3 start(0)</TypographyMuted>
							<Separator orientation="vertical" />
							<TypographyMuted>2 start(0)</TypographyMuted>
							<Separator orientation="vertical" />
							<TypographyMuted>1 start(0)</TypographyMuted>
						</div>
					</div>
				</div>

				<div className="flex justify-between items-start mt-4">
					<TypographySmall className="text-xs">
						Showing 1-12 of 150 reviews
					</TypographySmall>
					<div className="flex gap-4">
						<Button>Sort by on sale</Button>
						<Button>Show 20</Button>
					</div>
				</div>

				<div className="my-4">
					<Review />
					<Separator className="my-4" />
					<Review />
					<Separator className="my-4" />
					<Review />
					<Separator className="my-4" />
					<Review />
					<Separator className="my-4" />
					<Review />
					<Separator className="my-4" />
				</div>

				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href="#" />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#">1</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#" isActive>
								2
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#">3</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>
							<PaginationNext href="#" />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</CardContent>
		</Card>
	);
}

function Review() {
	return (
		<div>
			<div className="flex items-center h-5 space-x-2">
				<TypographyH5>Review title</TypographyH5>
				<Separator orientation="vertical" />
				<TypographyMuted>5 start</TypographyMuted>
			</div>
			<TypographyP className="text-sm">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
				veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
				commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
				velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
				occaecat cupidatat non proident, sunt in culpa qui officia deserunt
				mollit anim id est laborum.
			</TypographyP>
			<TypographyP className="text-slate-600 text-sm">
				April 12, 2021
			</TypographyP>
		</div>
	);
}
