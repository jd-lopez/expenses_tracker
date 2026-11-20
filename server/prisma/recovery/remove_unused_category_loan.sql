-- One-time recovery for the partially applied, rolled-back add_loans migration.
-- Refuses to run if any category uses LOAN; no rows are deleted or remapped.
BEGIN;
SET LOCAL lock_timeout = '5s';
LOCK TABLE public."Category" IN ACCESS EXCLUSIVE MODE;
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM public."Category" WHERE "type"::text = 'LOAN') THEN
    RAISE EXCEPTION 'Recovery stopped: categories still use LOAN';
  END IF;
END $$;
CREATE TYPE public."CategoryType_recovered" AS ENUM ('INCOME', 'EXPENSE');
ALTER TABLE public."Category"
  ALTER COLUMN "type" TYPE public."CategoryType_recovered"
  USING ("type"::text::public."CategoryType_recovered");
DROP TYPE public."CategoryType";
ALTER TYPE public."CategoryType_recovered" RENAME TO "CategoryType";
COMMIT;
