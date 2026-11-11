import { AnimatePresence } from "motion/react";
import TransactionRow from "./TransactionRow";
import TransactionPagination from "../../../shared/components/TransactionPagination";

export default function TransactionsTable({
  transactions,
  accounts,
  categories,
  pagination,
  loading,
  error,
  onPageChange,
  onOpenOptions,
}) {
  return (
    <div className="mt-6 flex flex-col rounded-2xl border border-gray-200 dark:border-gray-400">
      {error ? (
        <div role="alert" className="px-4 py-8 text-center text-rose-600">
          {error}
        </div>
      ) : loading && transactions.length === 0 ? (
        <div className="px-4 py-8 text-center text-slate-500">
          Loading transactions…
        </div>
      ) : transactions.length > 0 ? (
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
              destinationAccount={accounts.find(
                (account) => account.id === transaction.destinationAccountId,
              )}
              category={categories.find(
                (category) => category.id === transaction.categoryId,
              )}
              onOpenOptions={onOpenOptions}
            />
          ))}
        </AnimatePresence>
      </div>

      {!error && pagination.totalPages > 0 && (
        <TransactionPagination
          pagination={pagination}
          loading={loading}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
