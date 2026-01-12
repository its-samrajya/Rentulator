/*
  Warnings:

  - You are about to drop the column `address` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_userId_fkey";

-- DropIndex
DROP INDEX "users_number_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "address",
DROP COLUMN "number";
