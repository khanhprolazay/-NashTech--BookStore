/** @format */

export interface IPromotion {
	discount: number;
	promotion: {
		id: string;
		title: string;
	};
}

export interface IAnalysis {
	avarageRating: number;
	totalRating: number;
	totalReview: number;
	totalView: number;
	totalOrder: number;
	totalOrderQuantity: number;
}

export interface IBook {
	id: string;
	title: string;
	price: number;
	description: string;
	slug: string;
	mainImage: string;
	promotions: IPromotion[];
	analysis: IAnalysis;
	categories: ICategory[];
	authors: IAuthor[];
	reviews: IReview[];
}

export interface IBooksWithPagination {
	books: IBook[];
	pagination: {
		page: number;
		total: number;
		limit: number;
		count: number;
	};
}

export interface ICategory {
	name: string;
	slug: string;
}

export interface IAuthor {
	name: string;
	slug: string;
}

export interface IBookFilter {
	categories?: string[];
	authors?: string[];
	search?: string;
}

export interface IReview {
	id: string;
	title: string;
	content: string;
	rating: number;
	createdAt: string;
	user: {
		id: string;
		name: string;
		email: string;
		picture: string;
	};
}

export interface IReviewExtend {
	reviews: IReview[];
	count: {
		rating: number;
		_count: number;
	}[],
	avarageRating: number;
	totalReview: number;
}