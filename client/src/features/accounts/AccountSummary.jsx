import { Link, useParams } from "react-router-dom";
import { useTransactions } from "../../context/TransactionsContext";
import { useAccounts } from "../../context/AccountContext";
import {
  calculateAccountBalance,
  calculateAvailableCredit,
  isCreditAccount,
  toAmount,
} from "../../shared/finance";
import RecentActivity from "./components/RecentActivity";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function AccountSummary() {
  const { id } = useParams();
  const { transactions } = useTransactions();
  const { accounts } = useAccounts();

  const accountTransactions = transactions.filter(
    (t) => t.accountId === Number(id),
  );

  const currentAccount = accounts.find((act) => act.id === Number(id));

  if (!currentAccount) {
    return <p className="p-4 text-slate-500">Account not found.</p>;
  }

  const isCredit = isCreditAccount(currentAccount);
  const balance = calculateAccountBalance(currentAccount, transactions);
  const availableCredit = calculateAvailableCredit(
    currentAccount,
    transactions,
  );
  const creditLimit = toAmount(currentAccount.creditLimit);
  const utilization =
    isCredit && creditLimit > 0 ? (balance / creditLimit) * 100 : 0;
  const utilizationWidth = Math.min(Math.max(utilization, 0), 100);

  return (
    <div className="flex flex-col gap-6 p-4 text-black dark:text-white">
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {currentAccount.institution}
        </p>
        <h1 className="text-2xl font-bold">{currentAccount.name}</h1>
        <div className="mt-3 flex items-end justify-between gap-4 rounded-xl">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {isCredit ? "Balance owed" : "Current balance"}
            </p>
            <p
              className={`text-3xl font-bold ${
                isCredit ? "text-rose-600 dark:text-rose-400" : ""
              }`}
            >
              {currencyFormatter.format(balance)}
            </p>
          </div>
          <Link
            to="/transactions"
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            {isCredit ? "Record purchase or payment" : "View transactions"}
          </Link>
        </div>
      </div>

      {isCredit && (
        <section className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-gray-700">
            <p className="text-sm text-slate-500 dark:text-slate-300">
              Available credit
            </p>
            <p className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {availableCredit == null
                ? "Not set"
                : currencyFormatter.format(availableCredit)}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">
              Credit limit: {currencyFormatter.format(creditLimit)}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-gray-700">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-slate-500 dark:text-slate-300">
                Credit utilization
              </p>
              <p className="font-bold">{utilization.toFixed(1)}%</p>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-600">
              <div
                className={`h-full rounded-full ${
                  utilization > 80
                    ? "bg-rose-500"
                    : utilization > 30
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                }`}
                style={{ width: `${utilizationWidth}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-300">
              Purchases increase debt; payments reduce it.
            </p>
          </div>
        </section>
      )}

      <div className={`flex flex-col justify-between gap-4 md:flex-row `}>
        <div className={`flex gap-4 flex-col flex-1 `}>
          <div className="flex flex-2 flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-700">
            <h2>Account Information</h2>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <p className="text-slate-600">Tipo de cuenta</p>
                <p>{currentAccount.type}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-slate-600">Numero de Cuenta</p>
                <p>•••• {currentAccount.accountNumber}</p>
              </div>
              {!isCredit && (
                <div className="flex justify-between">
                  <p className="text-slate-600 dark:text-slate-300">
                    Opening balance
                  </p>
                  <p>
                    {currencyFormatter.format(currentAccount.initialBalance)}
                  </p>
                </div>
              )}
              {isCredit && (
                <div className="flex justify-between">
                  <p className="text-slate-600 dark:text-slate-300">
                    Credit limit
                  </p>
                  <p>{currencyFormatter.format(creditLimit)}</p>
                </div>
              )}
            </div>
          </div>
          <div
            className={`flex flex-col gap-4 rounded-2xl p-4 shadow-sm flex-2 bg-white dark:bg-gray-700`}
          >
            <h2>Spend Analytics</h2>
          </div>
        </div>
        <div
          className={`flex flex-col gap-4 rounded-2xl p-4 shadow-sm flex-2   bg-white/80 dark:bg-gray-700`}
        >
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
