/** @format */

import AppContainer from '@/components/app-container';
import { IBook, IReview, IReviewExtend } from '@/interfaces/book.interface';
import { getBook, getReviews } from '@/services/book.service';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import ReviewForm from './_components/review-form';
import CartForm from './_components/cart-form';
import ReviewList from './_components/review-list';
import BookCard from './_components/book-card';
import { useState } from 'react';

export const getServerSideProps = (async (context: any) => {
	const slug = context.params.slug as string;
	const rating = context.query.rating as string;
	const [book, reviews] = await Promise.all([
		getBook(slug),
		getReviews(slug),
	]);
	return {
		props: {
			book,
			reviews,
		},
	};
}) satisfies GetServerSideProps<{ book: IBook, reviews: IReviewExtend}>;

export default function Book({
	book,
	reviews: initialReviews,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const [reviews, setReviews] = useState(initialReviews);
	return (
		<AppContainer>
			<div className="grid grid-cols-1 lg:grid-cols-[8fr_4fr] gap-4">
				<div className="flex flex-col gap-4">
					<BookCard book={book} />
					<ReviewList book={book} reviews={reviews}  />
				</div>
				<div className="flex flex-col md:flex-row lg:flex-col h-fit gap-4">
					<CartForm book={book} />
					<ReviewForm book={book} setReviews={setReviews}/>
				</div>
			</div>
		</AppContainer>
	);
}
