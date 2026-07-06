/*
  Warnings:

  - You are about to drop the column `tenantId` on the `ElectricMeter` table. All the data in the column will be lost.
  - You are about to drop the column `moveInDate` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the column `tenantId` on the `rooms` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ElectricMeter" DROP CONSTRAINT "ElectricMeter_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_tenantId_fkey";

-- AlterTable
ALTER TABLE "ElectricMeter" DROP COLUMN "tenantId";

-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "moveInDate";

-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "tenantId";

-- CreateTable
CREATE TABLE "occupancies" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "moveInDate" TIMESTAMP(3) NOT NULL,
    "moveOutDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "occupancies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "occupancies" ADD CONSTRAINT "occupancies_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "occupancies" ADD CONSTRAINT "occupancies_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
