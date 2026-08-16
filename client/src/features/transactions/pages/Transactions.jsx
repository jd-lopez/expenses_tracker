import { useState } from "react";
import { useTransactions } from "../../../context/TransactionsContext";
import { useAccounts } from "../../../context/AccountContext";
import { useCategory } from "../../../context/CategoryContext";
import { useModal } from "../../../context/ModalContext";
import { useTheme } from "../../../context/ThemeContext";
import SummaryCards from "../components/SummaryCards";
import TransactionModals from "../components/TransactionModals";
import TransactionSearch from "../components/TransactionSearch";
import TransactionsHeader from "../components/TransactionsHeader";
import TransactionsTable from "../components/TransactionsTable";

export default function Transactions() {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [query, setQuery] = useState("");
  const { openModal, isModalActive } = useModal();
  const { transactions, createTransaction } = useTransactions();
  const { accounts, createAccount } = useAccounts();
  const { categories, createCategory } = useCategory();
  const { isDark } = useTheme();

  const allBalance = accounts.reduce(
    (sum, account) => sum + Number(account.initialBalance),
    0,
  );
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "INCOME")
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);
  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "EXPENSE")
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);
  const totalNet = allBalance + totalIncome - totalExpenses;

  const normalizedQuery = query.toLowerCase().trim();
  const visibleTransactions = normalizedQuery
    ? transactions.filter((transaction) => {
        const account = accounts.find(
          (item) => item.id === transaction.accountId,
        );
        const searchableValues = [
          transaction.title,
          transaction.description,
          account?.name,
        ];

        return searchableValues.some((value) =>
          value?.toLowerCase().includes(normalizedQuery),
        );
      })
    : transactions;

  function handleOpenOptions(transaction) {
    setSelectedTransaction(transaction);
    openModal("transOptions", { selectedTransact: transaction });
  }

  return (
    <div className="flex flex-col gap-3">
      <TransactionsHeader
        onAddTransaction={() => openModal("addTransaction")}
      />

      {/* <SummaryCards
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        totalNet={totalNet}
      /> */}

      <TransactionSearch query={query} onQueryChange={setQuery} />

      <TransactionsTable
        transactions={visibleTransactions}
        accounts={accounts}
        categories={categories}
        isDark={isDark}
        onOpenOptions={handleOpenOptions}
        // showPagination={!normalizedQuery && transactions.length > 0}
      />

      <TransactionModals
        accounts={accounts}
        categories={categories}
        selectedTransaction={selectedTransaction}
        createTransaction={createTransaction}
        createCategory={createCategory}
        createAccount={createAccount}
      />
    </div>
  );
}
