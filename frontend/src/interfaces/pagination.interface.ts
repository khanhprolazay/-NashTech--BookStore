/** @format */

export interface IPagination {
	page?: number;
	limit?: number;
	sort?: Sort;
}

export enum Sort {
  SALE = 'sale',
  POPULARITY = 'popularity',
  LOW = 'low',
  HIGH = 'high',
  RECOMMEND = 'recommend',
}