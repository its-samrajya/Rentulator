/*
  Warnings:

  - Added the required column `meterId` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ElectricMeter_tenantId_key";

-- AlterTable
ALTER TABLE "rooms" ADD COLUMN     "meterId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_meterId_fkey" FOREIGN KEY ("meterId") REFERENCES "ElectricMeter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
