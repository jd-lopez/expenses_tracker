import React from "react";
import { useTransactions } from "../hooks/useTransactions";

export default function Transactions() {
  const { transactions } = useTransactions();

  return (
    <div>
      <h1>Transactions</h1>

      <div>{transactions.length === 0 && "No transaction yet"}</div>
    </div>
  );
}
