/*
  Warnings:

  - Made the column `createdUserId` on table `Promotion` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Promotion" DROP CONSTRAINT "Promotion_createdUserId_fkey";

-- AlterTable
ALTER TABLE "Promotion" ALTER COLUMN "createdUserId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_createdUserId_fkey" FOREIGN KEY ("createdUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
