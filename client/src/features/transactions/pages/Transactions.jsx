import React from "react";
import { useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import { useAccounts } from "../hooks/useAccounts";
import { useCategories } from "../hooks/useCategories";
import AddTransactionModal from "../../../shared/components/AddTransactionModal";
import { AnimatePresence } from "motion/react";
import SummaryCards from "../components/SummaryCards";
import { faToiletPaper } from "@fortawesome/free-solid-svg-icons";

export default function Transactions() {
  const [transModal, setTransModal] = useState(false);
  const { transactions, loadTransactions, createTransaction } =
    useTransactions();
  const { accounts } = useAccounts();
  const { categories } = useCategories();

  const AllBalance = accounts.reduce((sum, act) => {
    const amount = Number(act.initialBalance);

    return sum + amount;
  }, 0);

  const totalIncome = Number(
    transactions
      .filter((t) => t.type === "INCOME")
      .reduce((sum, trans) => {
        const amount = Number(trans.amount);

        return sum + amount;
      }, 0),
  );

  const totalExpenses = Number(
    transactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((sum, trans) => {
        const amount = Number(trans.amount);

        return sum + amount;
      }, 0),
  );

  const totalNet = Number(AllBalance + totalIncome - totalExpenses);

  console.log(totalNet);

  return (
    <div className="overflow-x-hidden">
      <h1 className="text-3xl font-bold text-blue-800">Transactions</h1>

      <div className="overflow-x-hidden">
        <SummaryCards
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          totalNet={totalNet}
        />
      </div>

      <div>
        {transactions.map((tr) => {
          return <div key={tr.id}>{tr.title}</div>;
        })}
      </div>

      <button onClick={() => setTransModal(!transModal)}>
        Add transaction
      </button>

      <AnimatePresence>
        {transModal && (
          <div>
            <div
              className="absolute top-0  left-0 right-0 bottom-0  bg-slate-700/60 backdrop-blur-xs "
              onClick={() => setTransModal(false)}
            ></div>
            <AddTransactionModal
              accounts={accounts}
              transactions={transactions}
              createTransaction={createTransaction}
              loadTransactions={loadTransactions}
              setTransModal={setTransModal}
              categories={categories}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
