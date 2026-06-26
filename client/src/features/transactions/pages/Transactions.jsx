import React from "react";
import { useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import { useAccounts } from "../hooks/useAccounts";
import AddTransactionModal from "../../../shared/components/AddTransactionModal";
import { AnimatePresence } from "motion/react";

export default function Transactions() {
  const [transModal, setTransModal] = useState(false);
  const { transactions, createTransaction } = useTransactions();
  const { accounts } = useAccounts();

  console.log(transactions);

  return (
    <div>
      <h1>Transactions</h1>

      <button onClick={() => setTransModal(!transModal)}>
        Add transaction
      </button>

      <div>
        {transactions.map((tr) => {
          return <div key={tr.id}>{tr.title}</div>;
        })}
      </div>

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
              setTransModal={setTransModal}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
