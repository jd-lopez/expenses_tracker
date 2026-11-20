/*
  Warnings:

  - The values [EXTERNAL_TRANSFER] on the enum `TransactionTypes` will be removed. If these variants are still used in the database, this will fail.

*/
-- Apply all changes atomically so a failure cannot leave a partial schema.
BEGIN;
-- AlterEnum
CREATE TYPE "TransactionTypes_new" AS ENUM ('ACCOUNT_OPENING', 'INCOME', 'EXPENSE', 'INTERNAL_TRANSFER', 'LOAN_OUT', 'LOAN_REPAYMENT');
ALTER TABLE "Transaction" ALTER COLUMN "type" TYPE "TransactionTypes_new" USING ("type"::text::"TransactionTypes_new");
ALTER TYPE "TransactionTypes" RENAME TO "TransactionTypes_old";
ALTER TYPE "TransactionTypes_new" RENAME TO "TransactionTypes";
DROP TYPE "public"."TransactionTypes_old";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "loanId" INTEGER;

-- CreateTable
CREATE TABLE "Loan" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "borrower" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT;
