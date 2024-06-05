/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `AboutContent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `AboutContent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AboutContent" ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AboutContent_title_key" ON "AboutContent"("title");
