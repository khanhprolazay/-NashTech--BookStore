export const range = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
};

export const eq = (a: any, b: any) => a === b;
export const toDateString = (date: Date) => date.toISOString().split("T")[0];
export const getBookTitle = (book: any) => book.title.split("(")[0];
export const caculateDiscount = (price: number, discount: number) =>
  price - (price * discount) / 100;

export const caculateTotal = (order: any) => {
  return Math.round(
    order.books.reduce(
      (acc: number, book: any) =>
        acc + ((book.price * (100 - book.discount)) / 100) * book.quantity,
      0,
    ),
  );
};
