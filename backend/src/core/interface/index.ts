export interface IPagination {
  page: number;
  limit: number;
  sort: string;
  order: PaginationOrder;
  search: string;
}

export enum PaginationOrder {
  ASC = 'asc',
  DESC = 'desc',
}