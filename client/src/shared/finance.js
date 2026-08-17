export function toAmount(value) {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
}

export function isCreditAccount(account) {
  return account?.type === "CREDIT";
}

export function calculateAccountBalance(account, transactions = []) {
  const openingBalance = isCreditAccount(account)
    ? 0
    : toAmount(account?.initialBalance);

  return transactions
    .filter((transaction) => transaction.accountId === account?.id)
    .reduce((balance, transaction) => {
      const amount = toAmount(transaction.amount);

      if (transaction.type === "EXPENSE") {
        return isCreditAccount(account) ? balance + amount : balance - amount;
      }

      if (transaction.type === "INCOME") {
        return isCreditAccount(account) ? balance - amount : balance + amount;
      }

      return balance;
    }, openingBalance);
}

export function calculateAccountNetValue(account, transactions = []) {
  const balance = calculateAccountBalance(account, transactions);
  return isCreditAccount(account) ? -balance : balance;
}

export function calculateAvailableCredit(account, transactions = []) {
  if (!isCreditAccount(account) || account.creditLimit == null) return null;
  return toAmount(account.creditLimit) - calculateAccountBalance(account, transactions);
}
