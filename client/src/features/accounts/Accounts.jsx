import React from "react";
import { useState } from "react";
import AddAccountModal from "./components/AddAccountModal";
import { useAccounts } from "../transactions/hooks/useAccounts";

import { motion, AnimatePresence } from "motion/react";
import AccountsList from "./components/AccountsList";

export default function Accounts() {
  const [accountModal, setAccountModal] = useState(false);
  const { accounts, setAccounts, createAccount } = useAccounts();

  return (
    <div className=" ">
      <h1>Accounts Overview</h1>

      <button onClick={() => setAccountModal(!accountModal)}>
        Add New Account
      </button>

      <AccountsList accounts={accounts} />

      <AnimatePresence>
        {accountModal && (
          <div className="">
            <div
              className="absolute inset-0 bg-blue-300/20 backdrop-blur-md "
              onClick={() => setAccountModal(false)}
            ></div>

            <AddAccountModal
              createAccount={createAccount}
              setAccountModal={setAccountModal}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
