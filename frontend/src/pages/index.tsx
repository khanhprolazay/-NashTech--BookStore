/** @format */

import { Button } from '@/components/ui/button';
import { getBooks } from '../services/book.service';
import AppContainer from '@/components/app-container';
import { Card, CardContent } from '@/components/ui/card';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import BookCard from '@/components/book-card';
import { TypographyH4 } from '@/components/ui/typography';
import { Sort } from '@/interfaces/pagination.interface';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { IBooksWithPagination } from '@/interfaces/book.interface';

type Repo = {
	saleBooks: IBooksWithPagination;
	popolarBooks: IBooksWithPagination;
	recomendBooks: IBooksWithPagination;
};

export const getServerSideProps = (async () => {
	const [saleBooks, popolarBooks, recomendBooks] = await Promise.all([
		getBooks({ page: 1, limit: 5, sort: Sort.SALE }),
		getBooks({ page: 1, limit: 20, sort: Sort.POPULARITY }),
		getBooks({ page: 1, limit: 20, sort: Sort.RECOMMEND }),
	]);
	return {
		props: {
			repo: {
				saleBooks,
				popolarBooks,
				recomendBooks,
			},
		},
	};
}) satisfies GetServerSideProps<{ repo: Repo }>;

export default function Home({
	repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	
	return (
		<AppContainer>
			<section className="w-full mb-28">
				<div className="flex justify-between items-center mb-2">
					<TypographyH4>On Sale</TypographyH4>
					<Button>View All</Button>
				</div>
				<Card>
					<CardContent className="py-6 px-20">
						<Carousel opts={{ align: 'start' }}>
							<CarouselContent className="-ml-4">
								{repo.saleBooks.books.map((book) => (
									<CarouselItem key={book.id} className="basis-1/4 pl-4">
										<BookCard book={book} />
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious />
							<CarouselNext />
						</Carousel>
					</CardContent>
				</Card>
			</section>

			<section>
				<div>
					<h3 className="text-xl text-center mb-3">Featured Books</h3>
					<Tabs defaultValue="popular" className="w-full">
						<div className="flex justify-around">
							<TabsList>
								<TabsTrigger value="popular">Popular</TabsTrigger>
								<TabsTrigger value="recommend">Recommend</TabsTrigger>
							</TabsList>
						</div>
						<TabsContent value="popular">
							<Card>
								<CardContent className="py-6 px-20">
									<div className="grid grid-cols-5 gap-4">
										{repo.popolarBooks.books.map((book) => (
											<BookCard key={book.id} book={book} />
										))}
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="recommend">
							<Card>
								<CardContent className="py-6 px-20">
									<div className="grid grid-cols-5 gap-4">
										{repo.recomendBooks.books.map((book) => (
											<BookCard key={book.id} book={book} />
										))}
									</div>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</section>
		</AppContainer>
	);
}
