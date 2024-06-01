/** @format */

export interface IPromotion {
	discount: number;
	promotion: {
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
