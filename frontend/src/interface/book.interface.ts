import { IPagination } from "./pagination.interface";

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
	mainImage: string;
	promotions: IPromotion[];
	analysis: IAnalysis;
}

export interface BookOnAnalysisDto extends IPagination {
  sort?: keyof IAnalysis;
}
