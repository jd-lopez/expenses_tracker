import React from "react";
import { useState } from "react";
import AddAccountModal from "../components/AddAccountModal";
import { useAccounts } from "../hooks/useAccounts";

export default function Accounts() {
  const [accountModal, setAccountModal] = useState(false);
  const { accounts, createAccount } = useAccounts();

  return (
    <div className=" ">
      <h1>Accounts Overview</h1>

      <button onClick={() => setAccountModal(!accountModal)}>
        Add New Account
      </button>

      {accountModal && (
        <div className="">
          <div
            className="absolute inset-0 bg-blue-300/20 backdrop-blur-md "
            onClick={() => setAccountModal(false)}
          ></div>
          <AddAccountModal createAccount={createAccount} />
        </div>
      )}
    </div>
  );
}
