/*
  Warnings:

  - You are about to drop the column `discount` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the `OrderBook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderBook" DROP CONSTRAINT "OrderBook_bookId_fkey";

-- DropForeignKey
ALTER TABLE "OrderBook" DROP CONSTRAINT "OrderBook_orderId_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "discount",
ALTER COLUMN "price" DROP DEFAULT;

-- DropTable
DROP TABLE "OrderBook";

-- CreateTable
CREATE TABLE "OrderToBook" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "bookId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "OrderToBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promotion" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "beginAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Promotion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromotionToBook" (
    "id" TEXT NOT NULL,
    "promotionId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "discount" INTEGER NOT NULL,

    CONSTRAINT "PromotionToBook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PromotionToBook_promotionId_bookId_key" ON "PromotionToBook"("promotionId", "bookId");

-- AddForeignKey
ALTER TABLE "OrderToBook" ADD CONSTRAINT "OrderToBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderToBook" ADD CONSTRAINT "OrderToBook_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionToBook" ADD CONSTRAINT "PromotionToBook_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionToBook" ADD CONSTRAINT "PromotionToBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
