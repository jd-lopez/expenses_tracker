-- Audit entries and historical rows may have no known payment method.
ALTER TABLE "Transaction" ALTER COLUMN "payMethod" DROP NOT NULL;
ALTER TABLE "Transaction" ADD COLUMN "destinationAccountId" INTEGER;
CREATE INDEX "Transaction_destinationAccountId_idx" ON "Transaction"("destinationAccountId");
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_destinationAccountId_fkey"
FOREIGN KEY ("destinationAccountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
