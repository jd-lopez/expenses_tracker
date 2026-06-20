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
  async function createAccount() {
    try {
      const data = await accountService.createAccount(accountData);
      setAccounts(data);
    } catch (error) {}
  }

  return {
    accounts,
    error,
    loadAccounts,
    createAccount,
  };
}
