import { useState, useEffect } from "react";
import { accountService } from "../api/accountService";

export function useAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAccounts();
  }, []);

  async function loadAccounts() {
    try {
      const data = await accountService.getAll();
      setAccounts(data);
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    }
  }
  async function createAccount(accountData) {
    try {
      const data = await accountService.createAccount(accountData);
      setAccounts((prev) => [...prev, data]);
      setError(null);
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message;
      setError(errorMessage);
      throw error;
    }
  }

  return {
    accounts,
    setAccounts,
    error,
    loadAccounts,
    createAccount,
  };
}
