-- DropForeignKey
ALTER TABLE "Promotion" DROP CONSTRAINT "Promotion_createdUserId_fkey";

-- AlterTable
ALTER TABLE "Promotion" ALTER COLUMN "createdUserId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_createdUserId_fkey" FOREIGN KEY ("createdUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
