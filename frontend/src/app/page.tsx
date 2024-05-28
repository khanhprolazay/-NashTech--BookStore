/** @format */

import { getBooks } from '@/lib/services/book.service';

export default async function Home() {
  const data = await getBooks();
  
	return (
		<main className="flex flex-grow flex-col items-center justify-between p-24">
			
		</main>
	);
}
