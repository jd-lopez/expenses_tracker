import React from "react";
import { useState } from "react";
import { useTransactions } from "../../features/transactions/hooks/useTransactions";
import { useAccounts } from "../../features/transactions/hooks/useAccounts";
import { motion } from "motion/react";

export default function AddTransactionModal({
  accounts,
  transactions,
  loadTransactions,
  createTransaction,
  setTransModal,
  categories,
}) {
  const [transData, serTransData] = useState({
    title: "",
    description: "",
    type: "",
    amount: "",
    accountId: "",
    categoryId: "",
  });

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
    await loadTransactions();
    setTransModal(false);
  }

  return (
    <motion.dialog
      open
      className="fixed w-full md:w-2/4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <div className=" p-6">
        <form action="" className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <h1>Add new transaction</h1>

          <div className={`flex flex-col gap-1`}>
            <label htmlFor="">Title</label>
            <input
              className="border border-gray-700 rounded-md outline-0"
              type="text"
              name="title"
              value={transData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={`flex flex-col gap-1`}>
            <label htmlFor="">Description</label>
            <input
              type="text"
              name="description"
              value={transData.name}
              onChange={handleChange}
              className="border border-gray-700 rounded-md outline-0"
            />
          </div>

          <div className={`flex flex-col gap-1`}>
            <label htmlFor="">Type</label>
            <select
              name="type"
              value={transData.name}
              onChange={handleChange}
              className="border border-gray-700 rounded-md outline-0 py-1"
            >
              <option value="">Select a Type of transaction</option>

              {type.map((type) => (
                <option key={type} value={type.id}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className={`flex flex-col gap-1`}>
            <label htmlFor="">Account</label>
            <select
              name="accountId"
              value={transData.name}
              onChange={handleChange}
              className="border border-gray-700 rounded-md outline-0 py-1"
            >
              <option value="">Select a account</option>

              {accounts.map((act) => (
                <option key={act.id} value={act.id}>
                  {act.name}
                </option>
              ))}
            </select>
          </div>

          <div className={`flex flex-col gap-1`}>
            <label htmlFor="">Category</label>
            <select
              name="CategoryId"
              value={transData.name}
              onChange={handleChange}
              className="border border-gray-700 rounded-md outline-0 py-1"
            >
              <option value=""> Select Category</option>

              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className={`flex flex-col gap-1`}>
            <label htmlFor="">Amount</label>
            <input
              type="number"
              name="amount"
              value={transData.name}
              onChange={handleChange}
              className="border border-gray-700 rounded-md outline-0"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold rounded-md py-0.5 px-1 mt-4"
          >
            Crear
          </button>
        </form>
      </div>
    </motion.dialog>
  );
}
