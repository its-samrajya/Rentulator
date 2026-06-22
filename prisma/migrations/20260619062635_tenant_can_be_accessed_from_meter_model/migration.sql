/*
  Warnings:

  - You are about to drop the column `tenantId` on the `ElectricBill` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ElectricBill" DROP CONSTRAINT "ElectricBill_tenantId_fkey";

-- AlterTable
ALTER TABLE "ElectricBill" DROP COLUMN "tenantId";
