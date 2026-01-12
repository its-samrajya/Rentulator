/*
  Warnings:

  - You are about to drop the column `userId` on the `rooms` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floor` to the `rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomNumber` to the `rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "floor" TEXT NOT NULL,
ADD COLUMN     "roomNumber" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
