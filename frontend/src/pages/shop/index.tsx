/** @format */

import AppContainer from '@/components/app-container';
import { Separator } from '@/components/ui/separator';
import {
	TypographyH4,
	TypographyH6,
	TypographyMuted,
} from '@/components/ui/typography';
import { getAuthors, getBooks, getCategories } from '@/services/book.service';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { IAuthor, ICategory } from '@/interfaces/book.interface';
import FilterForm from './_components/filter-form';
import BookCard from '@/components/book-card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectGroup,
} from '@/components/ui/select';
import { useRouter } from 'next/router';
import { transformQueryValueToArray } from '@/lib/utils';
import { Sort } from '@/interfaces/pagination.interface';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

type Repo = {
	categories: ICategory[];
	authors: IAuthor[];
};

const sortByItems = [
	{
		label: 'Sort by on sale',
		value: 'sale',
	},
	{
		label: 'Sort by popularity',
		value: 'popularity',
	},
	{
		label: 'Sort by price: low to high',
		value: 'low',
	},
	{
		label: 'Sort by price: high to low',
		value: 'high',
	},
];

const showItems = [5, 10, 20, 40, 60];

export const getServerSideProps = (async (context) => {
	const categories = context.query.categories || '';
	const authors = context.query.authors || '';
	const sort = (context.query.sort as Sort) || Sort.POPULARITY;
	const show = (context.query.show as string) || '20';
	const page = (context.query.page as string) || '1';

	const [fetchedCategories, fetchedAuthors, books] = await Promise.all([
		getCategories(),
		getAuthors(),
		getBooks(
			{
				page: parseInt(page),
				limit: parseInt(show),
				sort,
			},
			{
				categories: transformQueryValueToArray(categories),
				authors: transformQueryValueToArray(authors),
				search: '',
			}
		),
	]);

	return {
		props: {
			repo: {
				categories: fetchedCategories,
				authors: fetchedAuthors,
				books,
			},
		},
	};
}) satisfies GetServerSideProps<{ repo: Repo }>;

export default function Shop({
	repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const router = useRouter();
	const query = router.query;
	const sort = (query.sort as string) || Sort.POPULARITY;
	const show = (query.show as string) || '20';
	const page = (query.page as string) || '1';
	const maxPage = Math.ceil(
		repo.books.pagination.total / repo.books.pagination.limit
	);

	const handleChangeSelect = (key: string, value: string) => {
		delete query.page;
		router.push({
			pathname: router.pathname,
			query: {
				...query,
				[key]: value,
			},
		});
	};

	const handlePrevious = () => {
		const newPage = parseInt(page) - 1;
		if (newPage < 1) return;
		handleChangePage(newPage);
	};

	const handleNext = () => {
		const newPage = parseInt(page) + 1;
		if (newPage > maxPage) return;
		handleChangePage(newPage);
	};

	const handleChangePage = (page: number) => {
		router.push({
			pathname: router.pathname,
			query: {
				...query,
				page,
			},
		});
	};

	return (
		<AppContainer>
			<TypographyH4>Books</TypographyH4>
			<Separator className="my-6" />
			<div className="relative grid md:grid-cols-[minmax(215px,_3fr)_9fr] gap-4">
				<div className="sticky top-20 h-fit hidden md:block">
					<TypographyH6 className="mb-2">Filter</TypographyH6>
					<div className="flex flex-col gap-4">
						<FilterForm
							data={repo.categories}
							description="Select category you want to filter"
							name="categories"
						/>
						<FilterForm
							data={repo.authors}
							description="Select author you want to filter"
							name="authors"
						/>
					</div>
				</div>

				<div>
					<div className="flex justify-between items-center min-h-8 mb-4">
						<TypographyMuted>
							Showing {repo.books.pagination.count} of{' '}
							{repo.books.pagination.total} books
						</TypographyMuted>
						<div className="flex gap-4">
							<Select
								defaultValue={sort}
								onValueChange={(value) => handleChangeSelect('sort', value)}>
								<SelectTrigger className="min-w-40 bg-primary text-white">
									<SelectValue className="w-full" placeholder="Select sort" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{sortByItems.map((item) => (
											<SelectItem key={item.value} value={item.value}>
												{item.label}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>

							<Select
								defaultValue="20"
								value={show}
								onValueChange={(value) => handleChangeSelect('show', value)}>
								<SelectTrigger className="bg-primary text-white">
									<SelectValue placeholder="Show items" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{showItems.map((item) => (
											<SelectItem key={item} value={`${item}`}>
												Show {item}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</div>
					<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
						{repo.books.books.map((book) => (
							<BookCard key={book.slug} book={book} />
						))}
					</div>

					{maxPage >= 1 && (
						<Pagination>
							<PaginationContent>
								<PaginationItem>
									<PaginationPrevious
										href="#"
										size="default"
										onClick={handlePrevious}
									/>
								</PaginationItem>
								{Array.from({ length: maxPage }).map((_, index) => (
									<PaginationItem>
										<PaginationLink
											isActive={parseInt(page) === index + 1}
											href="#"
											size="default"
											onClick={() => handleChangePage(index + 1)}>
											{index + 1}
										</PaginationLink>
									</PaginationItem>
								))}
								<PaginationItem>
									<PaginationNext
										href="#"
										size="default"
										onClick={handleNext}
									/>
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					)}
				</div>
			</div>
		</AppContainer>
	);
}
