import { useState } from "react";
import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CategoryIconPicker from "./CategoryIconPicker";
import { useModal } from "../../../context/ModalContext";

export default function AddCategoryModal({ createCategory }) {
  const { closeModal } = useModal();
  const [catData, setCatData] = useState({
    name: "",
    type: "",
    icon: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setCatData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await createCategory({ ...catData, icon: catData.icon || undefined });
    closeModal();
  }

  return (
    <motion.dialog
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      open
      className="relative z-10 max-h-full w-[min(100%,32rem)] overflow-y-auto rounded-2xl shadow-2xl"
    >
      <div className="rounded-md border border-gray-200 p-4 bg-white">
        <h1 className="text-2xl font-bold text-blue-950">Add Category</h1>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="">Name</label>
            <input
              name="name"
              value={catData.name}
              onChange={handleChange}
              className="border border-gray-700 rounded-md outline-0 px-2 py-1"
              type="text"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="">Type</label>
            <select
              name="type"
              value={catData.type}
              onChange={handleChange}
              className="border border-gray-700 rounded-md outline-0 py-1"
              required
            >
              <option value="">Select type</option>
              <option value="INCOME">Income</option>
              <option value="EXPENSE">Expense</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label>Icon</label>
            <CategoryIconPicker
              selected={catData.icon}
              onSelect={(iconName) =>
                setCatData((prev) => ({ ...prev, icon: iconName }))
              }
            />
          </div>

          <div className="flex justify-between gap-4 mt-4">
            <button
              type="submit"
              className="flex-1 text-white font-bold py-1 rounded-2xl hover:bg-blue-600 bg-blue-500 cursor-pointer"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-1" />
              Create
            </button>
            <button
              type="button"
              className="flex-1 text-white font-bold py-1 rounded-2xl hover:bg-red-600 bg-red-500 cursor-pointer"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </motion.dialog>
  );
}
