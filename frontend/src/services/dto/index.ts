export interface UpdateCartDto {
  bookId: string;
  quantity: number;
  promotionId: string | null;
}

