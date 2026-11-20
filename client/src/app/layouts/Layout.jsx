import { Outlet } from "react-router-dom";
import Sidebar from "../../shared/components/Sidebar";
import { useState } from "react";
import MobileTop from "../../shared/components/MobileTop";
import BottomNav from "../../shared/components/BottomNav";
import { useModal } from "../../context/ModalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAccounts } from "../../context/AccountContext";
import { useTransactions } from "../../context/TransactionsContext";
import { useCategory } from "../../context/CategoryContext";
import TransactionModals from "../../features/transactions/components/TransactionModals";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const { activeModal, modalData, openModal } = useModal();
  const { accounts, createAccount } = useAccounts();
  const { categories, createCategory } = useCategory();
  const { createTransaction } = useTransactions();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex h-screen w-full flex-col bg-background text-black dark:bg-[#13182b] dark:text-white">
      <MobileTop />
      <div className="flex flex-col md:flex-row md:justify-between flex-1 overflow-hidden">
        <Sidebar
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
        />
        <main className="relative flex-1 overflow-hidden px-3 py-4 ">
          <div
            className={`h-full md:pb-24 no-scrollbar ${activeModal ? "overflow-y-hidden" : "overflow-y-auto"}`}
          >
            <Outlet />
          </div>
          <div
            id="main-modal-root"
            className="pointer-events-none absolute inset-0 z-40"
          />
          {!activeModal && (
            <button
              type="button"
              onClick={() => openModal("addTransaction")}
              aria-label="Add transaction"
              title="Add transaction"
              className="absolute bottom-6 right-6 z-30 hidden size-14 items-center justify-center rounded-full bg-indigo-600 text-2xl text-white shadow-lg transition hover:scale-105 hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500 md:flex"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          )}
          <TransactionModals
            accounts={accounts}
            categories={categories}
            selectedTransaction={modalData?.selectedTransact}
            createTransaction={createTransaction}
            createCategory={createCategory}
            createAccount={createAccount}
          />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
