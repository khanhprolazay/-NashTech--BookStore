/** @format */

import { Button } from '@/components/ui/button';
import { getBooksOnSale, getBooks } from '../services/book.service';
import AppContainer from '@/components/app-container';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import BookCard from '@/components/book-card';

export default async function Home() {
	const [booksSale, books] = await Promise.all([
		getBooksOnSale({ page: 0, limit: 5 }),
		getBooks({ page: 0, limit: 100 }),
	]);

	return (
		<main className="py-16">
			<AppContainer>
				<section className="w-full mb-28">
					<div className="flex justify-between items-center mb-2">
						<h3 className="text-xl">On Sale</h3>
						<Button>View All</Button>
					</div>
					<Card>
						<CardContent className="py-6 px-20">
							<Carousel opts={{ align: 'start' }}>
								<CarouselContent className="-ml-4">
									{booksSale.map((book) => (
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
											{books.map((book) => (
												<BookCard book={book} />
											))}
										</div>
									</CardContent>
								</Card>
							</TabsContent>
						</Tabs>
					</div>
				</section>
			</AppContainer>
		</main>
	);
}
