import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as allIcons from "@fortawesome/free-solid-svg-icons";
import { motion } from "motion/react";
import { formatDateOnly } from "../../../shared/date";
import { transactionTypeLabels, paymentMethodLabels } from "../../../shared/transactionLabels";

function formatDate(dateStr) {
  if (!dateStr) return "";

  return formatDateOnly(dateStr, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function TransactionRow({
  transaction,
  account,
  destinationAccount,
  category,
  onOpenOptions,
}) {
  const isOpening = transaction.type === "ACCOUNT_OPENING";
  const isTransfer = transaction.type === "INTERNAL_TRANSFER" || transaction.type === "EXTERNAL_TRANSFER";
  const icon = isOpening ? allIcons.faBuildingColumns : isTransfer ? allIcons.faArrowRightArrowLeft : category?.icon
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
          {isOpening ? "Account opening" : category?.name}
        </p>
      </div>

      <div className="w-full text-left text-xs">
        <p>
          {account?.name} - {account?.institution}
        </p>
        {destinationAccount && <p>To: {destinationAccount.name}</p>}
        {transaction.payMethod && <p className="text-slate-500">{paymentMethodLabels[transaction.payMethod] || transaction.payMethod}</p>}
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
          {transaction.type === "INCOME" ? "+" : transaction.type === "EXPENSE" || isTransfer ? "-" : ""}$
          {Number(transaction.amount).toFixed(2)}
        </p>
        <p
          className={`text-xs px-1 py-0.5 rounded-2xl ${
            isOpening || isTransfer ? "bg-slate-200" : transaction.type === "INCOME" ? "bg-green-200" : "bg-red-200"
          }`}
        >
          {transactionTypeLabels[transaction.type] || transaction.type}
        </p>
      </div>

      {!isOpening && <button
        className="justify-self-end"
        onClick={() => onOpenOptions(transaction)}
        aria-label={`Open options for ${transaction.title}`}
      >
        <FontAwesomeIcon icon={allIcons.faEllipsisV} />
      </button>}
    </motion.div>
  );
}
