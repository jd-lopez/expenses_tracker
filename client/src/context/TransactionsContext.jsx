import React from "react";
import { useContext, createContext } from "react";
import { transactionService } from "../features/transactions/api/transactionService";
import { useState, useEffect } from "react";

const TransContext = createContext();

export function TransProvider({ children }) {
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

  async function deleteTransaction(id) {
    try {
      const data = await transactionService.deleteTransaction(id);
      setTransactions((prev) => prev.filter((trans) => trans.id !== id));
      setError(null);
      return data;
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    }
  }

  const removeTransByAccount = (accountId) => {
    setTransactions((prev) => prev.filter((t) => t.accountId !== accountId));
  };

  return (
    <TransContext.Provider
      value={{
        transactions,
        error,
        loadTransactions,
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
