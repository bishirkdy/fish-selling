const CustomerPagination = ({
  page,
  setPage,
  totalPages,
  isFetching,
}) => {
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2 p-6">
      <button
        disabled={page === 1 || isFetching}
        onClick={() => setPage((prev) => prev - 1)}
        className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <span className="px-4 py-2">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages || isFetching}
        onClick={() => setPage((prev) => prev + 1)}
        className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default CustomerPagination;