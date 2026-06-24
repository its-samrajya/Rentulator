/*
  Warnings:

  - Added the required column `currentReading` to the `ElectricBill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `previousReading` to the `ElectricBill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ElectricBill" ADD COLUMN     "currentReading" INTEGER NOT NULL,
ADD COLUMN     "previousReading" INTEGER NOT NULL;
