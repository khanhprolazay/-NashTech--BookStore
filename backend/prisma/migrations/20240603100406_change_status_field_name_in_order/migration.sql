/*
  Warnings:

  - You are about to drop the column `currentStatus` on the `Order` table. All the data in the column will be lost.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "currentStatus",
ADD COLUMN     "status" "OrderStatus" NOT NULL;
