import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as allIcons from "@fortawesome/free-solid-svg-icons";
import { motion } from "motion/react";

function formatDate(dateStr) {
  if (!dateStr) return "";

  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function TransactionRow({
  transaction,
  account,
  category,
  onOpenOptions,
}) {
  const icon = category?.icon
    ? allIcons[category.icon]
    : transaction.type === "INCOME"
      ? allIcons.faMoneyBillWave
      : allIcons.faCartShopping;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,0.85fr)_minmax(0,1.25fr)_minmax(0,1fr)_2rem] items-center p-2 border border-gray-200 md:hover:-translate-y-0.5 transition-all duration-200"
    >
      <p className="w-full text-left font-medium">{transaction.title}</p>

      <p className="w-full text-left text-xs text-gray-500">
        {formatDate(transaction.transactionDate)}
      </p>

      <div className="flex w-full flex-col items-start">
        {icon && (
          <div className="size-7 rounded-full bg-blue-100 text-blue-700 grid place-content-center">
            <FontAwesomeIcon icon={icon} />
          </div>
        )}
        <p className="hidden md:block text-xs bg-blue-200 rounded-xl px-1 py-0.5">
          {category?.name}
        </p>
      </div>

      <div className="w-full text-left text-xs">
        <p>
          {account?.name} - {account?.institution}
        </p>
      </div>

      <div className="flex flex-col items-center flex-1">
        <p
          className={`font-bold ${
            transaction.type === "INCOME"
              ? "text-green-600"
              : transaction.type === "EXPENSE"
                ? "text-red-600"
                : "text-gray-600"
          }`}
        >
          {transaction.type === "INCOME" ? "+" : "-"}$
          {Number(transaction.amount).toFixed(2)}
        </p>
        <p
          className={`text-xs px-1 py-0.5 rounded-2xl ${
            category?.type === "INCOME" ? "bg-green-200" : "bg-red-200"
          }`}
        >
          {category?.type}
        </p>
      </div>

      <button
        className="justify-self-end"
        onClick={() => onOpenOptions(transaction)}
        aria-label={`Open options for ${transaction.title}`}
      >
        <FontAwesomeIcon icon={allIcons.faEllipsisV} />
      </button>
    </motion.div>
  );
}
