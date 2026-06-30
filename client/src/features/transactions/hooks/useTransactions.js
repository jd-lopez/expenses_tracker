import { useState, useEffect } from "react";
import { transactionService } from "../api/transactionService";
export function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {
    try {
      const data = await transactionService.getAll();
      setTransactions(data);
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    }
  }

  async function createTransaction(transData) {
    try {
      const data = await transactionService.createTransaction(transData);
      setTransactions((prev) => [...prev, data]);
      setError(null);
      return data;
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err.message;
      setError(errorMessage);
      throw err;
    }
  }

  return {
    transactions,
    loadTransactions,
    createTransaction,
  };
}
