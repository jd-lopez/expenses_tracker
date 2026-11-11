import { useEffect, useState } from "react";
import { useTransactions } from "../../../context/TransactionsContext";
import { useAccounts } from "../../../context/AccountContext";
import { useCategory } from "../../../context/CategoryContext";
import { useModal } from "../../../context/ModalContext";
import TransactionModals from "../components/TransactionModals";
import TransactionSearch from "../components/TransactionSearch";
import TransactionsHeader from "../components/TransactionsHeader";
import TransactionsTable from "../components/TransactionsTable";

export default function Transactions() {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [query, setQuery] = useState("");
  const { openModal } = useModal();
  const {
    pageTransactions,
    pagination,
    loading,
    error,
    loadTransactions,
    createTransaction,
  } = useTransactions();
  const { accounts, createAccount } = useAccounts();
  const { categories, createCategory } = useCategory();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadTransactions({ page: 1, search: query.trim() }).catch(() => {});
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [loadTransactions, query]);

  function handlePageChange(page) {
    if (page === pagination.page || page < 1 || page > pagination.totalPages) {
      return;
    }

    loadTransactions({ page, search: query.trim() }).catch(() => {});
  }

  function handleOpenOptions(transaction) {
    setSelectedTransaction(transaction);
    openModal("transOptions", { selectedTransact: transaction });
  }

  return (
    <div className="flex flex-col gap-3">
      <TransactionsHeader
        onAddTransaction={() => openModal("addTransaction")}
      />

      <TransactionSearch query={query} onQueryChange={setQuery} />

      <TransactionsTable
        transactions={pageTransactions}
        accounts={accounts}
        categories={categories}
        pagination={pagination}
        loading={loading}
        error={error}
        onPageChange={handlePageChange}
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
