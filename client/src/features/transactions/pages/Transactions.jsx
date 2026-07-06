import { useState } from "react";
import { useTransactions } from "../../../context/TransactionsContext";
import { useAccounts } from "../hooks/useAccounts";
import { useCategories } from "../hooks/useCategories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as allIcons from "@fortawesome/free-solid-svg-icons";
import AddTransactionModal from "../../../shared/components/AddTransactionModal";
import { AnimatePresence, motion } from "motion/react";
import SummaryCards from "../components/SummaryCards";

export default function Transactions() {
  const [transModal, setTransModal] = useState(false);
  const { transactions, createTransaction, deleteTransaction } =
    useTransactions();
  const { accounts } = useAccounts();
  const { categories, createCategory } = useCategories();

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

  function getCategory(categoryId) {
    return categories.find((c) => c.id === categoryId);
  }

  function formatDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  console.log(categories);

  return (
    <div className="overflow-x-hidden">
      <div className="flex justify-between items-center gap-2">
        <h1 className="text-3xl font-bold text-blue-800">Transactions</h1>
        <input
          type="text"
          placeholder="Busca una trasaccion..."
          className="rounded-2xl border border-gray-500 px-4 py-1 min-w-40 max-w-80 lg:w-2xl bg-blue-100/30"
        />
        <button
          onClick={() => setTransModal(!transModal)}
          className="hidden bg-blue-600 text-white px-4 py-1 rounded-md cursor-pointer
          md:block
          "
        >
          Add transaction
        </button>
      </div>

      <SummaryCards
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        totalNet={totalNet}
      />

      <div className="mt-6 space-y-2">
        <AnimatePresence>
          {transactions.map((tr) => {
            const account = accounts.find((act) => act.id === tr.accountId);
            const accountName = account?.name;
            const institution = account?.institution;
            console.log(accountName);

            console.log(accounts);
            console.log(tr.accountId);
            console.log(accounts.find((act) => act.id === tr.accountId));

            const cat = getCategory(tr.categoryId);
            const icon = cat?.icon
              ? allIcons[cat.icon]
              : tr.type === "INCOME"
                ? allIcons.faMoneyBillWave
                : allIcons.faCartShopping;

            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                key={tr.id}
                className="flex items-center justify-between p-2 border border-gray-200 rounded-lg"
              >
                <div className="flex items-start flex-col flex-1">
                  {icon && (
                    <div className="size-7 rounded-full bg-blue-100 text-blue-700 grid place-content-center">
                      <FontAwesomeIcon icon={icon} />
                    </div>
                  )}
                  <p className="text-xs bg-blue-200 rounded-xl px-1 py-0.5">
                    {cat?.name}
                  </p>
                </div>
                <div className="flex flex-col items-start flex-1">
                  <p className="font-medium">{tr.title}</p>
                  <p className="text-xs text-gray-500">
                    {tr.transactionDate &&
                      `  ${formatDate(tr.transactionDate)}`}
                  </p>
                </div>

                <div className="text-xs text-gray-600">
                  <p>
                    {accountName} - {institution}
                  </p>
                </div>

                <div className="flex flex-col items-center flex-1 ">
                  <p
                    className={`font-bold ${
                      tr.type === "INCOME"
                        ? "text-green-600"
                        : tr.type === "EXPENSE"
                          ? "text-red-600"
                          : "text-gray-600"
                    }`}
                  >
                    {tr.type === "INCOME" ? "+" : "-"}$
                    {Number(tr.amount).toFixed(2)}
                  </p>
                  <p
                    className={`text-xs px-1 py-0.5 rounded-2xl ${cat?.type === "INCOME" ? "bg-green-200" : "bg-red-200"}`}
                  >
                    {cat?.type}
                  </p>
                </div>

                <button onClick={() => deleteTransaction(tr.id)} className="">
                  <FontAwesomeIcon icon={allIcons.faEllipsisV} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {transModal && (
          <div>
            <div
              className="fixed inset-0 bg-slate-700/60 backdrop-blur-xs"
              onClick={() => setTransModal(false)}
            ></div>
            <AddTransactionModal
              accounts={accounts}
              createTransaction={createTransaction}
              setTransModal={setTransModal}
              categories={categories}
              createCategory={createCategory}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
