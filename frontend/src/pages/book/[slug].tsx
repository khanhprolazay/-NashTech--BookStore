/** @format */

import AppContainer from '@/components/app-container';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { SelectSeparator } from '@/components/ui/select';
import {
	TypographyH4,
	TypographyH5,
	TypographyH6,
	TypographyP,
} from '@/components/ui/typography';
import { IBook } from '@/interfaces/book.interface';
import { getBook } from '@/services/book.service';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import ReviewForm from './_components/review-form';
import CardForm from './_components/card-form';
import ReviewList from './_components/review-list';
import BookCard from './_components/book-card';

export const getServerSideProps = (async (context: any) => {
	const slug = context.params.slug as string;
	const book = await getBook(slug);
	return {
		props: {
			book,
		},
	};
}) satisfies GetServerSideProps<{ book: IBook }>;

export default function Book({
	book,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<AppContainer>
			<TypographyH4>Category Name</TypographyH4>
			<SelectSeparator className="mt-6 mb-4" />
			<div className="grid grid-cols-12 gap-4">
				<div className="col-span-8 flex flex-col gap-4">
					<BookCard book={book} />
					<ReviewList book={book} />
				</div>
				<div className="col-span-4 flex flex-col gap-4">
					<CardForm book={book} />
					<ReviewForm />
				</div>
			</div>
		</AppContainer>
	);
}
