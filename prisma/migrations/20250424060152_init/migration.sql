/*
  Warnings:

  - You are about to drop the column `email` on the `Store` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Store_email_key";

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "email";
