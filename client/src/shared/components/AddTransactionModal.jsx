import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddCategoryModal from "../../features/transactions/components/AddCategoryModal";

export default function AddTransactionModal({
  accounts,
  createTransaction,
  setTransModal,
  categories,
  createCategory,
}) {
  const [catModal, setCatModal] = useState(false);
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
    setTransModal(false);
  }

  return (
    <>
      <motion.dialog
        open
        className="fixed md:w-2/4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
      >
        <div className="p-6">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <h1>Add new transaction</h1>

            <div className="flex flex-col gap-1">
              <label>Title</label>
              <input
                className="border border-gray-700 rounded-md outline-0 px-2 py-1"
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
                className="border border-gray-700 rounded-md outline-0 px-2 py-1"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>Date</label>
              <input
                type="date"
                name="transactionDate"
                value={transData.transactionDate}
                onChange={handleChange}
                className="border border-gray-700 rounded-md outline-0 px-2 py-1"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>Type</label>
              <select
                name="type"
                value={transData.type}
                onChange={handleChange}
                className="border border-gray-700 rounded-md outline-0 py-1"
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
                className="border border-gray-700 rounded-md outline-0 py-1"
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
                  onClick={() => setCatModal(true)}
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
                className="border border-gray-700 rounded-md outline-0 py-1"
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
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                value={transData.amount}
                onChange={handleChange}
                className="border border-gray-700 rounded-md outline-0 px-2 py-1"
                step="0.01"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white font-bold rounded-md py-1 px-2 mt-4 cursor-pointer"
            >
              Create
            </button>
          </form>
        </div>
      </motion.dialog>

      <AnimatePresence>
        {catModal && (
          <div>
            <div
              className="fixed inset-0 bg-slate-700/60 backdrop-blur-xs z-40"
              onClick={() => setCatModal(false)}
            />
            <div className="relative z-50">
              <AddCategoryModal
                createCategory={createCategory}
                setCatModal={setCatModal}
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
