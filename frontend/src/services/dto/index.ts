export interface UpdateCartDto {
  bookId: string;
  quantity: number;
}

export interface AddReviewDto {
  bookId: string;
  title: string;
  content: string;
  rating: number;
}