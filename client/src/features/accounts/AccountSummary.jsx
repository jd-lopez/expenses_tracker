import React from "react";
import TotalCard from "../transactions/components/TotalCard";
import SummaryCards from "../transactions/components/SummaryCards";
import { useParams } from "react-router-dom";
import { useTransactions } from "../../context/TransactionsContext";
import { useAccounts } from "../../context/AccountContext";
import { useTheme } from "../../context/ThemeContext";
import TransactionTable from "../transactions/components/TransactionsTable";
import RecentActivity from "./components/RecentActivity";

export default function AccountSummary() {
  const { id } = useParams();
  const { transactions } = useTransactions();
  const { accounts } = useAccounts();
  const { isDark } = useTheme();

  const accountTransactions = transactions.filter(
    (t) => t.accountId === Number(id),
  );

  const currentAccount = accounts.find((act) => act.id === Number(id));

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
  const initialBalance = Number(currentAccount?.initialBalance ?? 0);

  console.log(totalIncome);

  console.log(initialBalance);

  const totalNet = Number(initialBalance + totalIncome - totalExpenses);

  return (
    <div className={`flex flex-col gap-6 p-4 `}>
      <div>
        <h1 className="text-xl font-bold">{currentAccount?.name}</h1>
        <div className={`flex gap-4 p-4 rounded-xl justify-between `}>
          <p>${totalNet.toFixed(2)}</p>
          <div className="flex gap-2 justify-between items-center">
            <button>Pay bill</button>
            <button>Transfer</button>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div className="flex gap-4 flex-col flex-1">
          <div className="flex flex-col gap-4 rounded-2xl p-4 bg-white shadow-sm flex-2">
            <h2>Account Information</h2>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <p>Tipo de cuenta</p>
                <p>{currentAccount.type}</p>
              </div>
              <div className="flex justify-between">
                <p>Numero de Cuenta</p>
                <p>{currentAccount.id}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-2xl p-4 bg-white shadow-sm flex-2 ">
            <h2>Spend Analytics</h2>
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-2xl p-4 bg-white shadow-sm flex-2">
          <div>
            <h2>Recent Activity</h2>

            <div></div>
          </div>
          <RecentActivity accountTransactions={accountTransactions} />
        </div>
      </div>
    </div>
  );
}
