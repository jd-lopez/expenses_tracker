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

  return {
    transactions,
    error,
    loadTransactions,
  };
}
