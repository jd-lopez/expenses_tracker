export default function RecentActivity({ accountTransactions }) {
  function formatDate(dateStr) {
    if (!dateStr) return "";

    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="flex flex-col gap-2">
      {accountTransactions.length > 0 ? (
        <div className="-mx-4 grid grid-cols-4 gap-4 bg-background px-5 py-2 text-slate-500 dark:bg-slate-400/50 dark:text-white">
          <p>Title</p>
          <p>Amount</p>
          <p>Date</p>
          <p>Type</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 bg-background p-2">
          There is no transaction in this account
        </div>
      )}

      <div className=" ">
        {accountTransactions.slice(0, 5).map((transaction) => (
          <div
            className="grid grid-cols-4 gap-4 border-b border-gray-200 py-2 px-1 text-sm hover:-translate-y-0.5 transition-all duration-200"
            key={transaction.id}
          >
            <p>{transaction.title}</p>
            <p
              className={`font-bold ${
                transaction.type === "INCOME"
                  ? "text-green-600"
                  : transaction.type === "EXPENSE"
                    ? "text-red-600"
                    : "text-gray-600"
              }`}
            >
              $ {transaction.amount}
            </p>
            <p>{formatDate(transaction.transactionDate)}</p>

            <p
              className={`font-bold ${
                transaction.type === "INCOME"
                  ? "text-green-600"
                  : transaction.type === "EXPENSE"
                    ? "text-red-600"
                    : "text-gray-600"
              }`}
            >
              {transaction.type}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
