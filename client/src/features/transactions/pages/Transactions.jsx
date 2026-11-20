import { useEffect, useState } from "react";
import { useTransactions } from "../../../context/TransactionsContext";
import { useAccounts } from "../../../context/AccountContext";
import { useCategory } from "../../../context/CategoryContext";
import { useModal } from "../../../context/ModalContext";
import TransactionSearch from "../components/TransactionSearch";
import TransactionsHeader from "../components/TransactionsHeader";
import TransactionsTable from "../components/TransactionsTable";

export default function Transactions() {
  const [query, setQuery] = useState("");
  const { openModal } = useModal();
  const {
    pageTransactions,
    pagination,
    loading,
    error,
    loadTransactions,
  } = useTransactions();
  const { accounts } = useAccounts();
  const { categories } = useCategory();

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

    </div>
  );
}
