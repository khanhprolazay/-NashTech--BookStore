-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_promotionId_fkey";

-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "promotionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
