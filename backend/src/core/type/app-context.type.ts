import { IPagination } from '../interface';

export type AppContext = {
  pagination: Pick<IPagination, 'limit'>;
};
