import { AnimatePresence } from "motion/react";
import TransactionRow from "./TransactionRow";

export default function TransactionsTable({
  transactions,
  accounts,
  categories,
  onOpenOptions,
}) {
  return (
    <div className="mt-6 flex flex-col rounded-2xl border border-gray-200 dark:border-gray-400">
      {transactions.length > 0 ? (
        <div className="grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,0.85fr)_minmax(0,1.25fr)_minmax(0,1fr)_2rem] items-center rounded-t-2xl px-2 py-4 text-sm font-bold text-slate-500 dark:text-white">
          <button className="w-full text-left">Titulo</button>
          <button className="w-full text-left">Fecha</button>
          <button className="w-full text-left">Categoria</button>
          <button className="w-full text-left">Cuenta</button>
          <button className="justify-self-center">Monto</button>
          <span className="sr-only">Actions</span>
        </div>
      ) : (
        <div className="py-4 px-2 text-center text-slate-500">
          No Transactions yet. Add your first transaction!
        </div>
      )}

      <div className="bg-white dark:bg-inverse-surface">
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
      </div>
    </div>
  );
}
