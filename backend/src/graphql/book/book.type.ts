export interface IBook {
  book_id: number;
  goodreads_book_id: number;
  best_book_id: number;
  work_id: number;
  books_count: number;
  isbn: string;
  isbn13: string;
  authors: string;
  original_publication_year: number;
  orginal_title: string;
  title: string;
  language_code: string;
  image_url: string;
  small_image_url: string;
}

export interface IGoogleBook {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers: {
      type: string;
      identifier: string;
    }[];
    pageCount: number;
    categories: string[];
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
  };
}

export interface IGoogleBookResponse {
  totalItems: number;
  items: IGoogleBook[];
}