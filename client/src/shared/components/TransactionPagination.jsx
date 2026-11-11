function getVisiblePages(currentPage, totalPages) {
  const pageCount = Math.min(totalPages, 5);
  const start = Math.min(
    Math.max(currentPage - Math.floor(pageCount / 2), 1),
    Math.max(totalPages - pageCount + 1, 1),
  );

  return Array.from({ length: pageCount }, (_, index) => start + index);
}

export default function TransactionPagination({
  pagination,
  loading,
  onPageChange,
}) {
  const pages = getVisiblePages(pagination.page, pagination.totalPages);
  const firstItem = (pagination.page - 1) * pagination.limit + 1;
  const lastItem = Math.min(pagination.page * pagination.limit, pagination.total);

  return (
    <nav
      aria-label="Transaction pages"
      className="flex flex-col gap-3 rounded-b-2xl border-t border-gray-200 px-3 py-3 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-300 sm:flex-row sm:items-center sm:justify-between"
    >
      <p>
        Showing {firstItem}–{lastItem} of {pagination.total}
      </p>

      <div className="flex items-center justify-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(pagination.page - 1)}
          disabled={!pagination.hasPreviousPage || loading}
          className="rounded-lg border border-slate-300 px-3 py-1.5 font-semibold hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-600 dark:hover:bg-slate-700"
        >
          Previous
        </button>

        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            disabled={loading}
            aria-current={page === pagination.page ? "page" : undefined}
            className={`size-8 rounded-lg font-semibold ${
              page === pagination.page
                ? "bg-indigo-600 text-white"
                : "hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(pagination.page + 1)}
          disabled={!pagination.hasNextPage || loading}
          className="rounded-lg border border-slate-300 px-3 py-1.5 font-semibold hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-600 dark:hover:bg-slate-700"
        >
          Next
        </button>
      </div>
    </nav>
  );
}
