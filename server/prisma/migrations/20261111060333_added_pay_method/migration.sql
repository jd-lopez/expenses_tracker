/*
  Warnings:

  - The values [TRANSFER] on the enum `TransactionTypes` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `payMethod` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethods" AS ENUM ('DEBIT_CARD', 'BANK_TRANSFER', 'CASH', 'ATM');

-- AlterEnum
BEGIN;
CREATE TYPE "TransactionTypes_new" AS ENUM ('ACCOUNT_OPENING', 'INCOME', 'EXPENSE', 'INTERNAL_TRANSFER', 'EXTERNAL_TRANSFER');
ALTER TABLE "Transaction" ALTER COLUMN "type" TYPE "TransactionTypes_new" USING ("type"::text::"TransactionTypes_new");
ALTER TYPE "TransactionTypes" RENAME TO "TransactionTypes_old";
ALTER TYPE "TransactionTypes_new" RENAME TO "TransactionTypes";
DROP TYPE "public"."TransactionTypes_old";
COMMIT;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "payMethod" "PaymentMethods" NOT NULL;
