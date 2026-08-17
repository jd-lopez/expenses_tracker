import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "motion/react";
import { useModal } from "../../context/ModalContext";
import { isCreditAccount } from "../finance";

const initialForm = {
  title: "",
  description: "",
  type: "",
  amount: "",
  accountId: "",
  categoryId: "",
  transactionDate: new Date().toISOString().split("T")[0],
};

export default function AddTransactionModal({ accounts, createTransaction, categories }) {
  const { openModal, closeModal } = useModal();
  const [transData, setTransData] = useState(initialForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedAccount = accounts.find(
    (account) => account.id === Number(transData.accountId),
  );
  const isCredit = isCreditAccount(selectedAccount);
  const isCreditPayment = isCredit && transData.type === "INCOME";
  const transactionTypes = isCredit
    ? [
        { value: "EXPENSE", label: "Purchase / charge" },
        { value: "INCOME", label: "Payment / credit" },
      ]
    : [
        { value: "INCOME", label: "Income" },
        { value: "EXPENSE", label: "Expense" },
        { value: "TRANSFER", label: "Transfer" },
      ];
  const visibleCategories = categories.filter(
    (category) => !transData.type || category.type === transData.type,
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setTransData((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "accountId" ? { type: "", categoryId: "" } : {}),
      ...(name === "type" ? { categoryId: "" } : {}),
    }));
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const amount = Number(transData.amount);

    if (!Number.isFinite(amount) || amount <= 0) {
      setError("Enter an amount greater than zero.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createTransaction({
        ...transData,
        title: transData.title.trim(),
        description: transData.description.trim() || undefined,
        amount,
        accountId: Number(transData.accountId),
        categoryId: transData.categoryId
          ? Number(transData.categoryId)
          : undefined,
        transactionDate: transData.transactionDate || undefined,
      });
      closeModal();
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          requestError.message ||
          "Unable to create the transaction.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "rounded-xl border border-slate-300 bg-transparent px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-600 dark:bg-slate-800";

  return (
    <motion.dialog
      open
      aria-labelledby="add-transaction-title"
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 12 }}
      className="relative z-10 max-h-full w-[min(100%,38rem)] overflow-y-auto rounded-2xl bg-white text-slate-900 shadow-2xl dark:bg-slate-800 dark:text-white"
    >
      <form onSubmit={handleSubmit} className="flex flex-col">
        <header className="flex items-start justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-700">
          <div>
            <h1 id="add-transaction-title" className="text-2xl font-bold">Add a transaction</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Record income, spending, transfers, or credit-card activity.</p>
          </div>
          <button type="button" onClick={closeModal} className="grid size-9 place-items-center rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700" aria-label="Close transaction form">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </header>

        <div className="flex flex-col gap-4 px-6 py-5">
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Account
            <div className="flex gap-2">
              <select name="accountId" value={transData.accountId} onChange={handleChange} className={`${inputClass} min-w-0 flex-1`} required>
                <option value="">Select an account</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name} · {account.institution}{account.type === "CREDIT" ? " · Credit" : ""}
                  </option>
                ))}
              </select>
              <button type="button" onClick={() => openModal("addAccount")} className="rounded-xl border border-slate-300 px-3 text-indigo-600 hover:bg-indigo-50 dark:border-slate-600 dark:text-indigo-300 dark:hover:bg-slate-700" aria-label="Add a new account">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Transaction type
              <select name="type" value={transData.type} onChange={handleChange} className={inputClass} disabled={!selectedAccount} required>
                <option value="">{selectedAccount ? "Select a type" : "Choose an account first"}</option>
                {transactionTypes.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Date
              <input type="date" name="transactionDate" value={transData.transactionDate} onChange={handleChange} className={inputClass} required />
            </label>
          </div>

          {isCredit && <p className="rounded-xl bg-indigo-50 px-3 py-2 text-xs text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">Purchases increase this card&apos;s balance owed. Payments and credits reduce it.</p>}

          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_10rem]">
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Title
              <input name="title" value={transData.title} onChange={handleChange} className={inputClass} placeholder={isCredit ? "Grocery purchase" : "Transaction name"} maxLength={100} required />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Amount
              <input type="number" name="amount" value={transData.amount} onChange={handleChange} className={inputClass} min="0.01" step="0.01" placeholder="0.00" required />
            </label>
          </div>

          {!isCreditPayment && transData.type !== "TRANSFER" && (
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              <span>Category <span className="text-xs font-normal text-slate-500">Optional</span></span>
              <div className="flex gap-2">
                <select name="categoryId" value={transData.categoryId} onChange={handleChange} className={`${inputClass} min-w-0 flex-1`} disabled={!transData.type}>
                  <option value="">No category</option>
                  {visibleCategories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
                <button type="button" onClick={() => openModal("addCategory")} className="rounded-xl border border-slate-300 px-3 text-indigo-600 hover:bg-indigo-50 dark:border-slate-600 dark:text-indigo-300 dark:hover:bg-slate-700" aria-label="Add a new category">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </label>
          )}

          <label className="flex flex-col gap-1.5 text-sm font-medium">
            <span>Description <span className="text-xs font-normal text-slate-500">Optional</span></span>
            <textarea name="description" value={transData.description} onChange={handleChange} className={`${inputClass} min-h-20 resize-y`} placeholder="Add a note" maxLength={300} />
          </label>

          {error && <p role="alert" className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-500/15 dark:text-rose-300">{error}</p>}
        </div>

        <footer className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4 dark:border-slate-700">
          <button type="button" onClick={closeModal} disabled={isSubmitting} className="rounded-xl border border-slate-300 px-4 py-2 font-semibold hover:bg-slate-50 disabled:opacity-50 dark:border-slate-600 dark:hover:bg-slate-700">Cancel</button>
          <button type="submit" disabled={isSubmitting} className="rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? "Saving…" : "Save transaction"}</button>
        </footer>
      </form>
    </motion.dialog>
  );
}
