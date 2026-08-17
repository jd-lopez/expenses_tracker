import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowUp,
  faBuildingColumns,
  faPiggyBank,
  faReceipt,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAccounts } from "../../context/AccountContext";
import { useCategory } from "../../context/CategoryContext";
import { useTransactions } from "../../context/TransactionsContext";
import {
  calculateAccountBalance,
  calculateAccountNetValue,
  calculateAvailableCredit,
  isCreditAccount,
} from "../../shared/finance";
import DashHeading from "./components/DashHeading";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function getTransactionDate(transaction) {
  return new Date(transaction.transactionDate ?? transaction.createdAt);
}

export default function Dashboard() {
  const { accounts } = useAccounts();
  const { transactions } = useTransactions();
  const { categories } = useCategory();

  const now = new Date();
  const currentMonthTransactions = transactions.filter((transaction) => {
    const date = getTransactionDate(transaction);
    return (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth()
    );
  });

  const monthlyIncome = currentMonthTransactions
    .filter((transaction) => {
      const account = accounts.find(
        (item) => item.id === transaction.accountId,
      );
      return transaction.type === "INCOME" && !isCreditAccount(account);
    })
    .reduce(
      (sum, transaction) => sum + (Number(transaction.amount) || 0),
      0,
    );

  const monthlyExpenses = currentMonthTransactions
    .filter((transaction) => transaction.type === "EXPENSE")
    .reduce(
      (sum, transaction) => sum + (Number(transaction.amount) || 0),
      0,
    );

  const accountsWithBalance = accounts.map((account) => ({
    ...account,
    balance: calculateAccountBalance(account, transactions),
    netValue: calculateAccountNetValue(account, transactions),
    availableCredit: calculateAvailableCredit(account, transactions),
  }));

  const totalBalance = accountsWithBalance.reduce(
    (sum, account) => sum + account.netValue,
    0,
  );
  const cashBalance = accountsWithBalance
    .filter((account) => !isCreditAccount(account))
    .reduce((sum, account) => sum + account.balance, 0);
  const creditDebt = accountsWithBalance
    .filter(isCreditAccount)
    .reduce((sum, account) => sum + account.balance, 0);
  const availableCredit = accountsWithBalance
    .filter(isCreditAccount)
    .reduce((sum, account) => sum + (account.availableCredit ?? 0), 0);

  const recentTransactions = [...transactions]
    .sort((a, b) => getTransactionDate(b) - getTransactionDate(a))
    .slice(0, 5);

  const summaryCards = [
    {
      label: "Cash balance",
      value: cashBalance,
      detail: "Cash, checking, and savings",
      icon: faWallet,
      iconClass: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300",
    },
    {
      label: "Credit balance",
      value: creditDebt,
      detail: `${currencyFormatter.format(availableCredit)} available`,
      icon: faBuildingColumns,
      iconClass: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300",
    },
    {
      label: "Net worth",
      value: totalBalance,
      detail: "Cash balance minus credit debt",
      icon: faPiggyBank,
      iconClass: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
    },
    {
      label: "Monthly net",
      value: monthlyIncome - monthlyExpenses,
      detail: `${currencyFormatter.format(monthlyIncome)} income · ${currencyFormatter.format(monthlyExpenses)} spent`,
      icon: faArrowUp,
      iconClass: "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300",
    },
  ];

  return (
    <section className="flex flex-col gap-6">
      <DashHeading />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <article
            key={card.label}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-inverse-surface"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {card.label}
                </p>
                <p className="mt-2 text-2xl font-bold tracking-tight">
                  {currencyFormatter.format(card.value)}
                </p>
              </div>
              <span
                className={`grid size-10 shrink-0 place-items-center rounded-xl ${card.iconClass}`}
              >
                <FontAwesomeIcon icon={card.icon} />
              </span>
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              {card.detail}
            </p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(18rem,1fr)]">
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-inverse-surface">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">
            <div>
              <h2 className="text-lg font-bold">Recent transactions</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Your latest financial activity
              </p>
            </div>
            <Link
              to="/transactions"
              className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-300"
            >
              View all
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>

          {recentTransactions.length > 0 ? (
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {recentTransactions.map((transaction) => {
                const account = accounts.find(
                  (item) => item.id === transaction.accountId,
                );
                const category = categories.find(
                  (item) => item.id === transaction.categoryId,
                );
                const isIncome = transaction.type === "INCOME";
                const isExpense = transaction.type === "EXPENSE";

                return (
                  <div
                    key={transaction.id}
                    className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-5 py-3"
                  >
                    <span
                      className={`grid size-9 place-items-center rounded-full ${
                        isIncome
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                          : isExpense
                            ? "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300"
                            : "bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-300"
                      }`}
                    >
                      <FontAwesomeIcon icon={faReceipt} />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {transaction.title}
                      </p>
                      <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                        {[category?.name, account?.name]
                          .filter(Boolean)
                          .join(" · ") || "Uncategorized"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-bold ${
                          isIncome
                            ? "text-emerald-600 dark:text-emerald-400"
                            : isExpense
                              ? "text-rose-600 dark:text-rose-400"
                              : "text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        {isIncome ? "+" : isExpense ? "−" : ""}
                        {currencyFormatter.format(
                          Number(transaction.amount) || 0,
                        )}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {getTransactionDate(transaction).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" },
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="px-5 py-10 text-center">
              <p className="font-medium">No transactions yet</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Add your first transaction from the Transactions page.
              </p>
            </div>
          )}
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-inverse-surface">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Accounts</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Balance by account
              </p>
            </div>
            <Link
              to="/accounts"
              className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-300"
            >
              Manage
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>

          {accountsWithBalance.length > 0 ? (
            <div className="mt-4 flex flex-col gap-3">
              {accountsWithBalance.slice(0, 4).map((account) => (
                <Link
                  key={account.id}
                  to={`/accounts/${account.id}`}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/60"
                >
                  <span className="grid size-9 place-items-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
                    <FontAwesomeIcon icon={faBuildingColumns} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{account.name}</p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {account.institution} · {account.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold ${
                        isCreditAccount(account)
                          ? "text-rose-600 dark:text-rose-400"
                          : ""
                      }`}
                    >
                      {currencyFormatter.format(account.balance)}
                    </p>
                    {isCreditAccount(account) && (
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        owed
                        {account.availableCredit != null &&
                          ` · ${currencyFormatter.format(account.availableCredit)} available`}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center">
              <p className="font-medium">No accounts yet</p>
              <Link
                to="/accounts"
                className="mt-2 inline-block text-sm font-semibold text-indigo-600 dark:text-indigo-300"
              >
                Add your first account
              </Link>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
