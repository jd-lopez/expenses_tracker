import React from "react";
import { useTransactions } from "../../../context/TransactionsContext";

export default function AccountsList({ accounts = [] }) {
  const { transactions } = useTransactions();

  const accountsWithTotal = accounts.map((account) => {
    const initialBalance = Number(account.initialBalance) || 0;

    const total = transactions
      .filter((t) => t.accountId === account.id)
      .reduce((sum, t) => {
        const amount = Number(t.amount) || 0;
        return t.type === "INCOME" ? sum + amount : sum - amount;
      }, initialBalance);

    return { ...account, total };
  });

  return (
    <div>
      <h1>Fuente financiera</h1>
      <p>Gestiona tus cuentas y efectivo</p>

      <div className="flex gap-2 ">
        {accountsWithTotal.map((act) => {
          console.log(typeof act.initialBalance);

          return (
            <div key={act.id} className="border border-gray-600 rounded-xl p-4">
              <h2>{act.name}</h2>
              <p>{act.type}</p>
              <div>
                <p>Current Balance</p>
                <p>${act.total}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
