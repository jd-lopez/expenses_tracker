import { AnimatePresence } from "motion/react";
import { useModal } from "../../../context/ModalContext";
import AddTransactionModal from "../../../shared/components/AddTransactionModal";
import TransacOptions from "../../../shared/components/TransacOptions";
import AddCategoryModal from "./AddCategoryModal";

export default function TransactionModals({
  accounts,
  categories,
  selectedTransaction,
  createTransaction,
  createCategory,
}) {
  const { isModalActive, closeModal } = useModal();

  return (
    <>
      <AnimatePresence>
        {isModalActive("addTransaction") && (
          <div>
            <div
              className="absolute inset-0 bg-linear-to-r from-blue-400/10 to-blue-200/10 backdrop-blur-sm saturate-100 z-5"
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
          <div>
            <div
              className="fixed inset-0 bg-slate-700/60 backdrop-blur-xs z-40"
              onClick={closeModal}
            />
            <div className="relative z-50">
              <AddCategoryModal createCategory={createCategory} />
            </div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isModalActive("transOptions") && selectedTransaction && (
          <div>
            <div
              className="absolute inset-0 bg-linear-to-r from-blue-400/10 to-blue-200/10 backdrop-blur-sm saturate-100"
              onClick={closeModal}
            />
            <TransacOptions selectedTransact={selectedTransaction} />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
