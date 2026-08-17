import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingColumns,
  faCreditCard,
  faLandmark,
  faMoneyBill,
  faPiggyBank,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "motion/react";
import { useModal } from "../../../context/ModalContext";

const ACCOUNT_TYPES = [
  { value: "CHECKING", label: "Checking", icon: faLandmark },
  { value: "SAVINGS", label: "Savings", icon: faPiggyBank },
  { value: "CASH", label: "Cash", icon: faMoneyBill },
  { value: "CREDIT", label: "Credit card", icon: faCreditCard },
];

const initialForm = {
  name: "",
  accountNumber: "",
  institution: "",
  type: "CHECKING",
  initialBalance: "",
  creditLimit: "",
};

export default function AddAccountModal({ createAccount }) {
  const { closeModal } = useModal();
  const [accountData, setAccountData] = useState(initialForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isCredit = accountData.type === "CREDIT";
  const isCash = accountData.type === "CASH";

  function handleChange(event) {
    const { name, value } = event.target;
    const nextValue =
      name === "accountNumber" ? value.replace(/\D/g, "").slice(0, 4) : value;

    setAccountData((previous) => ({
      ...previous,
      [name]: nextValue,
      ...(name === "type" && value === "CREDIT"
        ? { initialBalance: "" }
        : {}),
    }));
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isCash && accountData.accountNumber.length !== 4) {
      setError("Enter exactly the last four digits of the account.");
      return;
    }

    const initialBalance = Number(accountData.initialBalance || 0);
    const creditLimit = Number(accountData.creditLimit);

    if (initialBalance < 0) {
      setError("Opening balance cannot be negative.");
      return;
    }

    if (isCredit && (!Number.isFinite(creditLimit) || creditLimit <= 0)) {
      setError("Enter a credit limit greater than zero.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createAccount({
        ...accountData,
        name: accountData.name.trim(),
        accountNumber: isCash ? undefined : accountData.accountNumber,
        institution: isCash ? "Cash" : accountData.institution.trim(),
        initialBalance: isCredit ? 0 : initialBalance,
        creditLimit: isCredit ? creditLimit : undefined,
      });
      closeModal();
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          requestError.message ||
          "Unable to create the account.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.dialog
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 12 }}
      open
      aria-labelledby="add-account-title"
      className="relative z-10 max-h-full w-[min(100%,36rem)] overflow-y-auto rounded-2xl bg-white text-slate-900 shadow-2xl dark:bg-slate-800 dark:text-white"
    >
      <form onSubmit={handleSubmit} className="flex flex-col">
        <header className="flex items-start justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-700">
          <div>
            <h1 id="add-account-title" className="text-2xl font-bold">
              Add an account
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Track cash, bank accounts, savings, or credit cards.
            </p>
          </div>
          <button type="button" onClick={closeModal} className="grid size-9 place-items-center rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700" aria-label="Close account form">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </header>

        <div className="flex flex-col gap-5 px-6 py-5">
          <fieldset>
            <legend className="mb-2 text-sm font-semibold">Account type</legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {ACCOUNT_TYPES.map((type) => (
                <label key={type.value} className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border p-3 text-sm transition-colors ${accountData.type === type.value ? "border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300" : "border-slate-200 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-700"}`}>
                  <input type="radio" name="type" value={type.value} checked={accountData.type === type.value} onChange={handleChange} className="sr-only" />
                  <FontAwesomeIcon icon={type.icon} className="text-lg" />
                  {type.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div className={`grid gap-4 ${isCash ? "" : "sm:grid-cols-2"}`}>
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Account name
              <input name="name" value={accountData.name} onChange={handleChange} className="rounded-xl border border-slate-300 bg-transparent px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-600" placeholder={isCredit ? "Everyday rewards" : "Primary checking"} autoComplete="off" required />
            </label>
            {!isCash && (
              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Institution
                <input name="institution" value={accountData.institution} onChange={handleChange} className="rounded-xl border border-slate-300 bg-transparent px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-600" placeholder="Bank or institution" autoComplete="organization" required />
              </label>
            )}
          </div>

          {!isCash && (
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Last four digits
              <div className="relative">
                <FontAwesomeIcon icon={faBuildingColumns} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input name="accountNumber" value={accountData.accountNumber} onChange={handleChange} className="w-full rounded-xl border border-slate-300 bg-transparent py-2.5 pl-10 pr-3 tracking-[0.35em] outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-600" placeholder="1234" inputMode="numeric" autoComplete="off" minLength={4} maxLength={4} required />
              </div>
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400">Only the last four digits are stored.</span>
            </label>
          )}

          {isCredit ? (
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Credit limit
              <input name="creditLimit" value={accountData.creditLimit} onChange={handleChange} className="rounded-xl border border-slate-300 bg-transparent px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-600" type="number" min="0.01" step="0.01" placeholder="5000.00" required />
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400">A new credit card starts at $0 owed. Purchases create debt.</span>
            </label>
          ) : (
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Opening balance
              <input name="initialBalance" value={accountData.initialBalance} onChange={handleChange} className="rounded-xl border border-slate-300 bg-transparent px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-600" type="number" min="0" step="0.01" placeholder="0.00" />
            </label>
          )}

          {error && <p role="alert" className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-500/15 dark:text-rose-300">{error}</p>}
        </div>

        <footer className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4 dark:border-slate-700">
          <button type="button" onClick={closeModal} disabled={isSubmitting} className="rounded-xl border border-slate-300 px-4 py-2 font-semibold hover:bg-slate-50 disabled:opacity-50 dark:border-slate-600 dark:hover:bg-slate-700">Cancel</button>
          <button type="submit" disabled={isSubmitting} className="rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? "Adding…" : "Add account"}</button>
        </footer>
      </form>
    </motion.dialog>
  );
}
