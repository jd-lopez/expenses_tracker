/*
  Warnings:

  - Added the required column `institution` to the `Accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Accounts" ADD COLUMN     "institution" TEXT NOT NULL;
