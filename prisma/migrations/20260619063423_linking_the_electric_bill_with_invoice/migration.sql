/*
  Warnings:

  - A unique constraint covering the columns `[invoiceId]` on the table `ElectricBill` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ElectricBill" ADD COLUMN     "invoiceId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ElectricBill_invoiceId_key" ON "ElectricBill"("invoiceId");

-- AddForeignKey
ALTER TABLE "ElectricBill" ADD CONSTRAINT "ElectricBill_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
