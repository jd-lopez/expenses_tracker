import React from "react";
import { useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import { useAccounts } from "../hooks/useAccounts";

export default function Transactions() {
  const { transactions, createTransaction } = useTransactions();
  const { accounts } = useAccounts();

  const [transData, serTransData] = useState({
    title: "",
    description: "",
    type: "",
    amount: "",
    accountId: "",
    categoryId: "",
  });

  const categories = ["Groceries", "Car", "Care"];
  const type = ["INCOME", "EXPENSE", "TRANSFER"];

  function handleChange(e) {
    const { name, value } = e.target;

    serTransData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...transData,
      amount: Number(transData.amount),
      accountId: Number(transData.accountId),
    };

    await createTransaction(payload);
  }

  return (
    <div>
      <h1>Transactions</h1>

      <div>{transactions.length === 0 && "No transaction yet"}</div>

      <form action="" onSubmit={handleSubmit}>
        <h1>Add new transaction</h1>

        <div>
          <label htmlFor="">Title</label>
          <input
            type="text"
            name="title"
            value={transData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="">Description</label>
          <input
            type="text"
            name="description"
            value={transData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="">Type</label>
          <select name="type" value={transData.name} onChange={handleChange}>
            <option value="">Select a Type of transaction</option>

            {type.map((type) => (
              <option key={type} value={type.id}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="">Account</label>
          <select
            name="accountId"
            value={transData.name}
            onChange={handleChange}
          >
            <option value="">Select a account</option>

            {accounts.map((act) => (
              <option key={act.id} value={act.id}>
                {act.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="">Category</label>
          <select
            name="CategoryId"
            value={transData.name}
            onChange={handleChange}
          >
            <option value=""> Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value="">
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="">Amount</label>
          <input
            type="number"
            name="amount"
            value={transData.name}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
