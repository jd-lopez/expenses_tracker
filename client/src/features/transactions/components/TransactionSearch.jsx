export default function TransactionSearch({ query, onQueryChange }) {
  return (
    <input
      value={query}
      onChange={(event) => onQueryChange(event.target.value)}
      type="search"
      placeholder="Busca trasaccion por titulo, cuenta o desc..."
      className="rounded-2xl border border-gray-500 px-4 py-1 min-w-40 max-w-80 lg:w-2xl bg-blue-100/30"
    />
  );
}
