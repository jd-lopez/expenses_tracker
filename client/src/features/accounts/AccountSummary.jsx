import React from "react";
import TotalCard from "../transactions/components/TotalCard";
import SummaryCards from "../transactions/components/SummaryCards";
import { useParams } from "react-router-dom";
import { useTransactions } from "../../context/TransactionsContext";
import { useAccounts } from "../../context/AccountContext";

export default function AccountSummary() {
  const { id } = useParams();
  const { transactions } = useTransactions();
  const { accounts } = useAccounts();

  const accountTransactions = transactions.filter(
    (t) => t.accountId === Number(id),
  );

  const totalIncome = Number(
    accountTransactions
      .filter((t) => t.type === "INCOME")
      .reduce((sum, t) => sum + Number(t.amount), 0),
  );

  const totalExpenses = Number(
    accountTransactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((sum, t) => sum + Number(t.amount), 0),
  );
  const initialBalance = Number(
    accounts.find((act) => act.id === Number(id))?.initialBalance ?? 0,
  );

  console.log(totalIncome);

  console.log(initialBalance);

  const totalNet = Number(initialBalance + totalIncome - totalExpenses);

  return (
    <div>
      <h1>Summary</h1>

      <div>{totalNet.toFixed(2)}</div>
    </div>
  );
}
