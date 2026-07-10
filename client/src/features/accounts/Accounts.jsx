import React from "react";
import { useState } from "react";
import AddAccountModal from "./components/AddAccountModal";
import { useTransactions } from "../../context/TransactionsContext";
import { motion, AnimatePresence } from "motion/react";
import AccountsList from "./components/AccountsList";
import AccountSummary from "./AccountSummary";
import SummaryCards from "../transactions/components/SummaryCards";
import { useAccounts } from "../../context/AccountContext";

export default function Accounts() {
  const [accountModal, setAccountModal] = useState(false);
  const { accounts, setAccounts, createAccount } = useAccounts();
  const { transactions } = useTransactions();

  const AllBalance = accounts.reduce((sum, act) => {
    return sum + Number(act.initialBalance);
  }, 0);

  const totalIncome = Number(
    transactions
      .filter((t) => t.type === "INCOME")
      .reduce((sum, trans) => sum + Number(trans.amount), 0),
  );

  const totalExpenses = Number(
    transactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((sum, trans) => sum + Number(trans.amount), 0),
  );

  const totalNet = Number(AllBalance + totalIncome - totalExpenses);

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h1 className="text-blue-600 font-bold text-2xl">Accounts Overview</h1>

        <input
          type="text"
          placeholder="Search accounts"
          className="rounded-lg border border-gray-300 px-1 py-0.5"
        />
      </div>

      <SummaryCards
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        totalNet={totalNet}
      />

      <AccountsList
        accounts={accounts}
        transactions={transactions}
        setAccountModal={setAccountModal}
        accountModal={accountModal}
      />

      <AnimatePresence>
        {accountModal && (
          <div className="">
            <div
              className="absolute inset-0 bg-blue-300/20 backdrop-blur-md "
              onClick={() => setAccountModal(false)}
            ></div>

            <AddAccountModal
              createAccount={createAccount}
              setAccountModal={setAccountModal}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
