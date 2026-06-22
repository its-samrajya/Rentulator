/*
  Warnings:

  - Changed the type of `currentReading` on the `ElectricReading` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ElectricReading" DROP COLUMN "currentReading",
ADD COLUMN     "currentReading" INTEGER NOT NULL;
