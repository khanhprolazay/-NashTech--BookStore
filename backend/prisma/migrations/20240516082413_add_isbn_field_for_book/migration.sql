/*
  Warnings:

  - A unique constraint covering the columns `[slug,isbn]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isbn` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "isbn" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Book_slug_isbn_key" ON "Book"("slug", "isbn");
