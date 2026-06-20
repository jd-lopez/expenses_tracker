import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBank } from "@fortawesome/free-solid-svg-icons";

export default function AddAccountModal({ createAccount }) {
  const [accountData, setAccountData] = useState({
    name: "",
    institution: "",
    type: "credit",
    balance: "",
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
      balance: Number(accountData.balance),
    };

    await createAccount(payload);
    console.log(payload);
  }

  return (
    <dialog
      open
      className="absolute top-20 left-1/2 -translate-x-2/3 rounded-2xl shadow-xl"
    >
      <div className="rounded-md border border-gray-200 p-4">
        <h1>Add New Account</h1>
        <p>Manually track a bank account, credit card or investments.</p>

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
              <option value="creditcard">Credit card</option>
              <option value="debitcard">Debit Card</option>
            </select>
          </div>
          <div className="accountModalFields">
            <label htmlFor="">Balance inicial</label>
            <input
              name="balance"
              value={accountData.balance}
              onChange={handleChange}
              className="modalInput"
              type="number"
              required
            />
          </div>
          <button className=" text-white font-bold py-1 rounded-2xl hover:bg-blue-600 bg-blue-500">
            Agregar
          </button>
        </form>
      </div>
    </dialog>
  );
}
