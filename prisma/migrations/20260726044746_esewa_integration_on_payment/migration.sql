/*
  Warnings:

  - A unique constraint covering the columns `[esewaTransactionUuid]` on the table `payments` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "esewaRefId" TEXT,
ADD COLUMN     "esewaTransactionUuid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "payments_esewaTransactionUuid_key" ON "payments"("esewaTransactionUuid");
