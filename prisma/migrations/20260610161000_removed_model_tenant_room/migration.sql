/*
  Warnings:

  - You are about to drop the `TenantRoom` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TenantRoom" DROP CONSTRAINT "TenantRoom_roomId_fkey";

-- DropForeignKey
ALTER TABLE "TenantRoom" DROP CONSTRAINT "TenantRoom_tenantId_fkey";

-- AlterTable
ALTER TABLE "rooms" ADD COLUMN     "tenantId" TEXT;

-- DropTable
DROP TABLE "TenantRoom";

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
