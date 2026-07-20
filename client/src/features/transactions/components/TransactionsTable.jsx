import { AnimatePresence } from "motion/react";
import TransactionPagination from "../../../shared/components/TransactionPagination";
import TransactionRow from "./TransactionRow";

export default function TransactionsTable({
  transactions,
  accounts,
  categories,
  isDark,
  onOpenOptions,
  showPagination,
}) {
  return (
    <div
      className={`flex flex-col mt-6 border rounded-2xl ${
        isDark ? "border-gray-400" : "border-gray-200"
      }`}
    >
      {transactions.length > 0 ? (
        <div
          className={`grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,0.85fr)_minmax(0,1.25fr)_minmax(0,1fr)_2rem] items-center rounded-tl-2xl rounded-tr-2xl py-4 px-2 text-sm font-bold ${
            isDark ? "text-white" : "text-slate-500"
          }`}
        >
          <button className="w-full text-left">Titulo</button>
          <button className="w-full text-left">Fecha</button>
          <button className="w-full text-left">Categoria</button>
          <button className="w-full text-left">Cuenta</button>
          <button className="justify-self-center">Monto</button>
          <span className="sr-only">Actions</span>
        </div>
      ) : (
        <div>No Transactions yet</div>
      )}

      <div className={isDark ? "bg-inverse-surface" : "bg-white"}>
        <AnimatePresence>
          {transactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              account={accounts.find(
                (account) => account.id === transaction.accountId,
              )}
              category={categories.find(
                (category) => category.id === transaction.categoryId,
              )}
              onOpenOptions={onOpenOptions}
            />
          ))}
        </AnimatePresence>

        {showPagination && <TransactionPagination />}
      </div>
    </div>
  );
}
