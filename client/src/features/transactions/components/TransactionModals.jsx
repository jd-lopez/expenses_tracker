import { AnimatePresence } from "motion/react";
import { useModal } from "../../../context/ModalContext";
import AddTransactionModal from "../../../shared/components/AddTransactionModal";
import TransacOptions from "../../../shared/components/TransacOptions";
import AddCategoryModal from "./AddCategoryModal";
import AddAccountModal from "../../accounts/components/AddAccountModal";

export default function TransactionModals({
  accounts,
  categories,
  selectedTransaction,
  createTransaction,
  createCategory,
  createAccount,
}) {
  const { isModalActive, closeModal } = useModal();

  return (
    <>
      <AnimatePresence>
        {isModalActive("addTransaction") && (
          <div className="absolute inset-0 z-40 flex items-start justify-center overflow-y-auto p-4 md:items-center">
            <div
              className="absolute inset-0 bg-slate-700/35 backdrop-blur-sm"
              onClick={closeModal}
            />
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
        {isModalActive("addCategory") && (
          <div className="absolute inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 md:items-center">
            <div
              className="absolute inset-0 bg-slate-700/60 backdrop-blur-xs"
              onClick={closeModal}
            />
            <AddCategoryModal createCategory={createCategory} />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isModalActive("transOptions") && selectedTransaction && (
          <div className="absolute inset-0 z-40 flex items-start justify-center overflow-y-auto p-4 md:items-center">
            <div
              className="absolute inset-0 bg-slate-700/35 backdrop-blur-sm"
              onClick={closeModal}
            />
            <TransacOptions selectedTransact={selectedTransaction} />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isModalActive("addAccount") && (
          <div className="absolute inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 md:items-center">
            <div
              className="absolute inset-0 bg-slate-700/60 backdrop-blur-xs"
              onClick={closeModal}
            />
            <AddAccountModal createAccount={createAccount} />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
