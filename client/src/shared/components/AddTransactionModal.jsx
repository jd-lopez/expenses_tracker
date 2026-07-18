import { useState } from "react";
import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../context/ModalContext";

export default function AddTransactionModal({
  accounts,
  createTransaction,
  categories,
  createCategory,
}) {
  const { openModal, closeModal } = useModal();
  const [transData, setTransData] = useState({
    title: "",
    description: "",
    type: "",
    amount: "",
    accountId: "",
    categoryId: "",
    transactionDate: new Date().toISOString().split("T")[0],
  });

  const type = ["INCOME", "EXPENSE", "TRANSFER"];

  function handleChange(e) {
    const { name, value } = e.target;
    setTransData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...transData,
      amount: Number(transData.amount),
      accountId: Number(transData.accountId),
      categoryId: transData.categoryId
        ? Number(transData.categoryId)
        : undefined,
      transactionDate: transData.transactionDate || undefined,
    };

    await createTransaction(payload);
    closeModal();
  }

  return (
    <>
      <motion.dialog
        open
        className="fixed w-[90%] md:overflow-y-auto md:max-h-116 md:w-2/6 top-1/2 left-1/2 no-scrollbar -translate-x-1/2 -translate-y-1/2 shadow-2xl rounded-2xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
      >
        <div className="p-6">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <h1 className="text-blue-700 font-bold text-2xl">
              Add new transaction
            </h1>

            <div className="flex flex-col gap-1">
              <label>Title</label>
              <input
                className="input"
                type="text"
                name="title"
                value={transData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={transData.description}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>Date</label>
              <input
                type="date"
                name="transactionDate"
                value={transData.transactionDate}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>Type</label>
              <select
                name="type"
                value={transData.type}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select type</option>
                {type.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label>Account</label>
              <select
                name="accountId"
                value={transData.accountId}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select account</option>
                {accounts.map((act) => (
                  <option key={act.id} value={act.id}>
                    {act.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label>Category</label>
                <button
                  type="button"
                  onClick={() => openModal("addCategory")}
                  className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer flex items-center gap-1"
                >
                  <FontAwesomeIcon icon={faPlus} size="xs" />
                  New
                </button>
              </div>
              <select
                name="categoryId"
                value={transData.categoryId}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="label">Amount</label>
              <input
                type="number"
                name="amount"
                value={transData.amount}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-blue-600 text-white font-bold rounded-md py-1 px-2 mt-4 cursor-pointer"
              >
                Create
              </button>
              <button
                className="bg-red-600 text-white font-bold rounded-md py-1 px-2 mt-4 cursor-pointer"
                onClick={() => closeModal()}
                type="button"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </motion.dialog>
    </>
  );
}
