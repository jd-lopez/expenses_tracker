import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBank } from "@fortawesome/free-solid-svg-icons";
import { motion } from "motion/react";

export default function AddAccountModal({ createAccount, setAccountModal }) {
  const [accountData, setAccountData] = useState({
    name: "",
    institution: "",
    type: "credit",
    initialBalance: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setAccountData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...accountData,
      initialBalance: Number(accountData.initialBalance),
    };

    await createAccount(payload);
    setAccountModal(false);
  }

  return (
    <motion.dialog
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      open
      className="fixed w-full md:w-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md"
    >
      <div className="rounded-md border border-gray-200 p-4">
        <h1 className="text-2xl font-bold text-blue-950">Add New Account</h1>
        <p className="text-slate-600">
          Manually track a bank account, credit card or investments.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-2">
          <div className="accountModalFields">
            <label htmlFor="">Account Name</label>
            <input
              name="name"
              value={accountData.name}
              onChange={handleChange}
              className="modalInput"
              type="text"
              required
            />
          </div>
          <div className="accountModalFields">
            <label htmlFor="">Institucion o Banco</label>
            <input
              name="institution"
              value={accountData.institution}
              onChange={handleChange}
              className="modalInput"
              type="text"
              required
            />
          </div>
          <div className="accountModalFields">
            <label htmlFor="">Account Type</label>
            <select
              name="type"
              value={accountData.type}
              onChange={handleChange}
              className="modalInput"
              id=""
              required
            >
              <option value="CREDIT">Credit card</option>
              <option value="CHECKING">Checking</option>
              <option value="CASH">Cash</option>
              <option value="SAVINGS">Savings</option>
            </select>
          </div>
          <div className="accountModalFields">
            <label htmlFor="">Balance inicial</label>
            <input
              name="initialBalance"
              value={accountData.initialBalance}
              onChange={handleChange}
              className="modalInput"
              type="number"
              required
            />
          </div>
          <div className="flex justify-between gap-4 mt-6">
            <button
              type="submit"
              className="flex-1 text-white font-bold py-1 rounded-2xl  hover:bg-blue-600 bg-blue-500"
            >
              Agregar
            </button>
            <button
              className="flex-1 text-white font-bold py-1 rounded-2xl  hover:bg-red-600 bg-red-500"
              onClick={() => setAccountModal(false)}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </motion.dialog>
  );
}
