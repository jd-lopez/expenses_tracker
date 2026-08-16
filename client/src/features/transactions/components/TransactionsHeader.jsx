export default function TransactionsHeader({ onAddTransaction }) {
  return (
    <div className="flex justify-between items-center gap-2">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-blue-800">Transactions</h1>
        <p>Revisa y Gestiona tu actividad financiera</p>
      </div>

      <button
        onClick={onAddTransaction}
        className="hidden bg-blue-600 text-white px-4 py-1 rounded-md cursor-pointer md:block"
      >
        Add transaction
      </button>
    </div>
  );
}
