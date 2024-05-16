/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Author_slug_key" ON "Author"("slug");
