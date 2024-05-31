export interface IPagination {
  page: number;
  limit: number;
  sort: Sort;
  order: PaginationOrder;
  search: string;
}

export enum PaginationOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum Sort {
  SALE = 'sale',
  LOW = 'low',
  HIGH = 'high',
  POPULARITY = 'popularity',
  RECOMMEND = 'recommend',
}