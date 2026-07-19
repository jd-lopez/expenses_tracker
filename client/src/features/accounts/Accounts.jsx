import React from "react";
import AddAccountModal from "./components/AddAccountModal";
import { useTransactions } from "../../context/TransactionsContext";
import { motion, AnimatePresence } from "motion/react";
import AccountsList from "./components/AccountsList";
import AccountSummary from "./AccountSummary";
import SummaryCards from "../transactions/components/SummaryCards";
import { useAccounts } from "../../context/AccountContext";
import { useModal } from "../../context/ModalContext";
import { useCategory } from "../../context/CategoryContext";

export default function Accounts() {
  const { isModalActive, openModal, closeModal } = useModal();
  const { accounts, setAccounts, createAccount } = useAccounts();
  const { transactions } = useTransactions();
  const { categories, createCategory } = useCategory();

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
          placeholder="Busca una cuenta..."
          className="rounded-2xl border border-gray-500 px-4 py-1 min-w-40 max-w-80 lg:w-2xl bg-blue-100/30"
        />
      </div>

      <SummaryCards
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        totalNet={totalNet}
      />

      <AccountsList accounts={accounts} transactions={transactions} />
    </div>
  );
}
