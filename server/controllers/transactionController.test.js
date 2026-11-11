import assert from "node:assert/strict";
import { afterEach, mock, test } from "node:test";
import { createTransactionHandler } from "./transactionController.js";

const prisma = {
  account: {
    async findFirst() {
      throw new Error("Unexpected account query");
    },
  },
  category: {
    async findFirst() {
      throw new Error("Unexpected category query");
    },
  },
  transaction: {
    async create() {
      throw new Error("Unexpected write");
    },
  },
};
const createTransaction = createTransactionHandler(prisma);

afterEach(() => mock.restoreAll());

function request(overrides = {}) {
  return {
    user: { id: 7 },
    body: {
      title: " Test ",
      amount: "25",
      type: "EXPENSE",
      payMethod: "CASH",
      accountId: "1",
      ...overrides,
    },
  };
}

function response() {
  return {
    code: 200,
    body: null,
    status(code) {
      this.code = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}

test("each payment method is validated and persisted with normalized fields", async () => {
  mock.method(prisma.account, "findFirst", async () => ({
    id: 1,
    userId: 7,
    type: "CHECKING",
  }));
  const create = mock.method(
    prisma.transaction,
    "create",
    async ({ data }) => ({ id: 9, ...data }),
  );
  for (const payMethod of ["CASH", "ATM", "DEBIT_CARD", "BANK_TRANSFER"]) {
    const res = response();
    await createTransaction(request({ payMethod }), res);
    assert.equal(res.code, 201);
    assert.equal(res.body.payMethod, payMethod);
    assert.equal(res.body.amount, 25);
    assert.equal(res.body.accountId, 1);
    assert.equal(res.body.title, "Test");
  }
  assert.equal(create.mock.callCount(), 4);
});

test("invalid or missing methods, old types, audit types, and bad amounts are rejected", async () => {
  const create = mock.method(prisma.transaction, "create", async () =>
    assert.fail("must not write"),
  );
  for (const override of [
    { payMethod: undefined },
    { payMethod: "INVALID" },
    { type: "TRANSFER" },
    { type: "ACCOUNT_OPENING" },
    { amount: -1 },
    { amount: "no" },
    { amount: 0 },
  ]) {
    const res = response();
    await createTransaction(request(override), res);
    assert.equal(res.code, 400);
  }
  assert.equal(create.mock.callCount(), 0);
});

test("internal transfers require distinct owned destination accounts", async () => {
  mock.method(prisma.account, "findFirst", async ({ where }) => {
    assert.equal(where.userId, 7);
    return where.id === 1 ? { id: 1, type: "CHECKING" } : null;
  });
  for (const [destinationAccountId, expected] of [
    [1, 400],
    [undefined, 400],
    [99, 404],
  ]) {
    const res = response();
    await createTransaction(
      request({ type: "INTERNAL_TRANSFER", destinationAccountId }),
      res,
    );
    assert.equal(res.code, expected);
  }
});

test("internal transfers store one record with source and destination", async () => {
  mock.method(prisma.account, "findFirst", async ({ where }) => ({
    id: where.id,
    type: "CHECKING",
  }));
  const create = mock.method(
    prisma.transaction,
    "create",
    async ({ data }) => data,
  );
  const res = response();
  await createTransaction(
    request({
      type: "INTERNAL_TRANSFER",
      destinationAccountId: "2",
      payMethod: "BANK_TRANSFER",
    }),
    res,
  );
  assert.equal(res.code, 201);
  assert.equal(res.body.destinationAccountId, 2);
  assert.equal(create.mock.callCount(), 1);
});

test("foreign accounts and foreign or mismatched categories cannot be used", async () => {
  mock.method(prisma.account, "findFirst", async ({ where }) =>
    where.id === 1 ? { id: 1, type: "CHECKING" } : null,
  );
  mock.method(prisma.category, "findFirst", async ({ where }) => {
    assert.equal(where.userId, 7);
    return where.id === 2 ? { type: "INCOME" } : null;
  });
  for (const [override, expected] of [
    [{ accountId: 99 }, 404],
    [{ categoryId: 99 }, 404],
    [{ categoryId: 2 }, 400],
  ]) {
    const res = response();
    await createTransaction(request(override), res);
    assert.equal(res.code, expected);
  }
});
