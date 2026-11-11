import assert from "node:assert/strict";
import { test } from "node:test";
import { calculateAccountBalance, calculateAccountNetValue } from "./finance.js";

test("opening audit entries do not double-count the starting balance", () => {
  const account = { id: 1, type: "CASH", initialBalance: "100" };
  const opening = { accountId: 1, type: "ACCOUNT_OPENING", amount: "100" };
  assert.equal(calculateAccountBalance(account, [opening]), 100);
  assert.equal(calculateAccountBalance(account, [opening,
    { accountId: 1, type: "EXPENSE", amount: "25" },
    { accountId: 1, type: "INCOME", amount: "10" },
  ]), 85);
});

test("zero-balance and credit accounts can have opening audit entries", () => {
  const account = { id: 1, type: "CASH", initialBalance: 0 };
  const opening = { accountId: 1, type: "ACCOUNT_OPENING", amount: 0 };
  assert.equal(calculateAccountBalance(account, [opening]), 0);
  assert.equal(calculateAccountNetValue({ ...account, type: "CREDIT" }, [opening]), -0);
});

test("internal transfers move balances while preserving total net value", () => {
  const source = { id: 1, type: "CHECKING", initialBalance: 200 };
  const destination = { id: 2, type: "SAVINGS", initialBalance: 50 };
  const transfers = [{ accountId: 1, destinationAccountId: 2, type: "INTERNAL_TRANSFER", amount: "75" }];
  assert.equal(calculateAccountBalance(source, transfers), 125);
  assert.equal(calculateAccountBalance(destination, transfers), 125);
  assert.equal(calculateAccountNetValue(source, transfers) + calculateAccountNetValue(destination, transfers), 250);
  assert.equal(calculateAccountBalance({ id: 3, type: "CASH", initialBalance: 10 }, transfers), 10);
});

test("an internal transfer to a credit account reduces debt without changing net worth", () => {
  const source = { id: 1, type: "CHECKING", initialBalance: 200 };
  const card = { id: 2, type: "CREDIT" };
  const history = [
    { accountId: 2, type: "EXPENSE", amount: 100 },
    { accountId: 1, destinationAccountId: 2, type: "INTERNAL_TRANSFER", amount: 40 },
  ];
  assert.equal(calculateAccountBalance(card, history), 60);
  assert.equal(calculateAccountNetValue(source, history) + calculateAccountNetValue(card, history), 100);
});

test("external transfers reduce the source balance and deletion restores it", () => {
  const account = { id: 1, type: "CHECKING", initialBalance: 200 };
  assert.equal(calculateAccountBalance(account, [{ accountId: 1, type: "EXTERNAL_TRANSFER", amount: 30 }]), 170);
  assert.equal(calculateAccountBalance(account, []), 200);
});
