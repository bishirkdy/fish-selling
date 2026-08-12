const OrderPagination = ({
  page,
  setPage,
  totalPages,
  isFetching,
}) => {
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        disabled={page === 1 || isFetching}
        onClick={() => setPage((prev) => prev - 1)}
        className="px-4 py-2 rounded-lg bg-white border disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <span className="px-4 py-2 font-semibold">
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages || isFetching}
        onClick={() => setPage((prev) => prev + 1)}
        className="px-4 py-2 rounded-lg bg-white border disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default OrderPagination;