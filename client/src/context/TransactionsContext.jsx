import {
  useCallback,
  useContext,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { transactionService } from "../features/transactions/api/transactionService";

const TransContext = createContext();

export function TransProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [pageTransactions, setPageTransactions] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const lastRequestRef = useRef({
    page: 1,
    limit: 10,
    search: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTransactionHistory = useCallback(async () => {
    try {
      const data = await transactionService.getHistory();
      setTransactions(data);
      setError(null);
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    }
  }, []);

  const loadTransactions = useCallback(async (options = {}) => {
    const previousRequest = lastRequestRef.current;
    const request = {
      page: options.page ?? previousRequest.page,
      limit: options.limit ?? previousRequest.limit,
      search: options.search ?? previousRequest.search,
    };

    lastRequestRef.current = request;
    setLoading(true);
    try {
      const data = await transactionService.getPage(request);
      setPageTransactions(data.transactions);
      setPagination(data.pagination);
      setError(null);
      return data;
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTransactionHistory().finally(() => setLoading(false));
  }, [loadTransactionHistory]);

  async function createTransaction(transData) {
    try {
      const data = await transactionService.createTransaction(transData);
      setTransactions((prev) =>
        [...prev, data].sort((a, b) => {
          const dateDiff =
            new Date(b.transactionDate) - new Date(a.transactionDate);

          if (dateDiff !== 0) return dateDiff;

          return new Date(b.createdAt) - new Date(a.createdAt);
        }),
      );
      await loadTransactions({ ...lastRequestRef.current, page: 1 });
      setError(null);
      return data;
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err.message;
      setError(errorMessage);
      throw err;
    }
  }

  async function deleteTransaction(id) {
    try {
      const data = await transactionService.deleteTransaction(id);
      setTransactions((prev) => prev.filter((trans) => trans.id !== id));
      const page =
        pageTransactions.length === 1 && pagination.page > 1
          ? pagination.page - 1
          : pagination.page;
      await loadTransactions({ ...lastRequestRef.current, page });
      setError(null);
      return data;
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    }
  }

  const removeTransByAccount = (accountId) => {
    setTransactions((prev) => prev.filter((t) => t.accountId !== accountId));
    setPageTransactions((prev) =>
      prev.filter((transaction) => transaction.accountId !== accountId),
    );
    void loadTransactions(lastRequestRef.current);
  };

  return (
    <TransContext.Provider
      value={{
        transactions,
        pageTransactions,
        pagination,
        loading,
        error,
        loadTransactions,
        loadTransactionHistory,
        createTransaction,
        deleteTransaction,
        removeTransByAccount,
      }}
    >
      {children}
    </TransContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransContext);
}
