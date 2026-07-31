/*
  Warnings:

  - Added the required column `inviteTokenExpiry` to the `Tenant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tenant" DROP CONSTRAINT "Tenant_userId_fkey";

-- AlterTable
ALTER TABLE "Tenant" ADD COLUMN     "email" TEXT,
ADD COLUMN     "inviteToken" TEXT,
ADD COLUMN     "inviteTokenExpiry" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "phone" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Tenant" ADD CONSTRAINT "Tenant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
