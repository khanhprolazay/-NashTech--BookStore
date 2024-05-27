/*
  Warnings:

  - Added the required column `slug` to the `Promotion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Promotion" ADD COLUMN     "slug" TEXT NOT NULL;
