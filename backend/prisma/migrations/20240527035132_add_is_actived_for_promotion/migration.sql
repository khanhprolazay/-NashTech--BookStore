/*
  Warnings:

  - Added the required column `isActived` to the `Promotion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Promotion" ADD COLUMN     "isActived" BOOLEAN NOT NULL;
