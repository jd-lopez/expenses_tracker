import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFile,
  faChartLine,
  faCirclePlus,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import MobileMoreModal from "./MobileMoreModal";
import { AnimatePresence } from "motion/react";
import AddTransactionModal from "./AddTransactionModal";
import { useTransactions } from "../../features/transactions/hooks/useTransactions";
import { useAccounts } from "../../features/transactions/hooks/useAccounts";

export default function BottomNav() {
  const { transactions, createTransaction } = useTransactions();
  const { accounts } = useAccounts();
  const [openMore, setOpenMore] = useState(false);
  const [transModal, setTransModal] = useState(false);

  return (
    <div className=" bottom-0 border-t border-gray-700 bg-inverse-on-surface text-base  md:hidden">
      <ul className="flex justify-between py-4 px-6 text-lg">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `bottomNavButtons ${isActive ? "border-b border-blue-600" : ""}`
            }
          >
            {({ isActive }) => (
              <>
                <FontAwesomeIcon
                  icon={faHome}
                  className={isActive ? "text-blue-700" : "text-black"}
                />
                <p
                  className={
                    isActive ? "text-blue-700 font-semibold" : "text-black"
                  }
                >
                  Home
                </p>
              </>
            )}
          </NavLink>
        </li>
        <li className=" mr-20">
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `bottomNavButtons ${isActive ? "border-b border-blue-600" : ""}`
            }
          >
            {({ isActive }) => (
              <>
                <FontAwesomeIcon
                  icon={faFile}
                  className={isActive ? "text-blue-700" : "text-black"}
                />
                <p
                  className={
                    isActive ? "text-blue-700 font-semibold" : "text-black"
                  }
                >
                  History
                </p>
              </>
            )}
          </NavLink>
        </li>

        <button
          className="absolute bottom-10 z-40 left-1/2 -translate-x-1/2 shadow rounded-full  size-14 grid place-content-center active:scale-110 active:animate-spin active:-translate-y-4 transition-all"
          onClick={() => setTransModal(!transModal)}
        >
          <FontAwesomeIcon
            icon={faCirclePlus}
            className="text-blue-600 text-6xl"
          />
        </button>

        <li>
          <NavLink
            to="/accounts"
            className={({ isActive }) =>
              `bottomNavButtons ${isActive ? "border-b border-blue-600" : ""}`
            }
          >
            {({ isActive }) => (
              <>
                <FontAwesomeIcon
                  icon={faMoneyCheckDollar}
                  className={isActive ? "text-blue-700" : "text-black"}
                />
                <p
                  className={
                    isActive ? "text-blue-700 font-semibold" : "text-black"
                  }
                >
                  Accounts
                </p>
              </>
            )}
          </NavLink>
        </li>
        <li>
          <button
            className="bottomNavButtons focus:text-blue-600 "
            onClick={() => setOpenMore(!openMore)}
          >
            <FontAwesomeIcon icon={faCirclePlus} />
            <p>More</p>
          </button>
        </li>
      </ul>

      <AnimatePresence>
        {openMore && (
          <div>
            <div className="absolute -top-220 left-0 right-0 bottom-20  bg-slate-700/60 backdrop-blur-xs "></div>
            <MobileMoreModal />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {transModal && (
          <div>
            <div
              className="absolute top-18 left-0 right-0 bottom-20  bg-slate-700/60 backdrop-blur-xs "
              onClick={() => setTransModal(false)}
            ></div>
            <AddTransactionModal
              accounts={accounts}
              transactions={transactions}
              createTransaction={createTransaction}
              setTransModal={setTransModal}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
