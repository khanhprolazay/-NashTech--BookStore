/*
  Warnings:

  - You are about to drop the column `isActived` on the `Promotion` table. All the data in the column will be lost.
  - Added the required column `isActive` to the `Promotion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Promotion" DROP COLUMN "isActived",
ADD COLUMN     "isActive" BOOLEAN NOT NULL;
