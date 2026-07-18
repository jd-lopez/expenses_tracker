import React from "react";
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
import { useAccounts } from "../../context/AccountContext";
import { useCategory } from "../../context/CategoryContext";
import { useTransactions } from "../../context/TransactionsContext";
import MobileActionsModal from "./MobileActionsModal";
import AddTransactionModal from "./AddTransactionModal";

import AddAccountModal from "../../features/accounts/components/AddAccountModal";
import { useModal } from "../../context/ModalContext";

export default function BottomNav() {
  const { transactions, loadTransactions, createTransaction } =
    useTransactions();
  const { accounts, createAccount } = useAccounts();
  const { categories, createCategory } = useCategory();
  const { isModalActive, openModal, closeModal } = useModal();

  return (
    <div className=" bottom-0 border-t border-gray-700 bg-inverse-on-surface text-base  md:hidden">
      <ul className="flex justify-between py-4 px-6 text-lg">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `bottomNavButtons ${isActive ? "border-b border-blue-600" : ""}`
            }
            onClick={() => closeModal()}
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
            onClick={() => closeModal()}
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
          className=" absolute bottom-10 z-40 left-1/2 -translate-x-1/2 shadow rounded-full  size-14 grid place-content-center active:scale-110 active:animate-spin active:-translate-y-4 transition-all"
          onClick={() => openModal("mobileActions")}
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
            onClick={() => closeModal()}
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
            onClick={() => openModal("mobileMore")}
          >
            <FontAwesomeIcon icon={faCirclePlus} />
            <p>More</p>
          </button>
        </li>
      </ul>

      <AnimatePresence>
        {isModalActive("mobileMore") && (
          <div>
            <div
              className="absolute left-0 right-0 top-1/13 bottom-20  bg-linear-to-r from-blue-400/10 to-blue-200/10 backdrop-blur-sm saturate-100"
              onClick={closeModal}
            ></div>
            <MobileMoreModal />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isModalActive("mobileActions") && (
          <div>
            <div
              className="absolute left-0 right-0 top-1/13 bottom-20 bg-linear-to-r from-blue-400/10 to-blue-200/10 backdrop-blur-sm saturate-100"
              onClick={closeModal}
            ></div>
            <MobileActionsModal />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isModalActive("addTransaction") && (
          <div>
            <div
              className="absolute inset-x-0 top-18 bottom-20 bg-linear-to-r from-blue-400/10 to-blue-200/10 backdrop-blur-sm saturate-100"
              onClick={closeModal}
            ></div>
            <AddTransactionModal
              accounts={accounts}
              createTransaction={createTransaction}
              categories={categories}
              createCategory={createCategory}
            />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isModalActive("addAccount") && (
          <div className="">
            <div
              className="absolute inset-x-0 top-18 bottom-20 bg-linear-to-r from-blue-400/10 to-blue-200/10 backdrop-blur-sm saturate-100"
              onClick={closeModal}
            ></div>

            <AddAccountModal createAccount={createAccount} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
