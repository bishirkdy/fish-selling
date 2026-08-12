const CustomerFilters = ({
  search,
  setSearch,
  filter,
  setFilter,
  setPage,
}) => {
  return (
    <div className="border-(--color-background) rounded-2xl shadow-sm mb-6">
      <div className="flex flex-col md:flex-row gap-4">

        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search customer..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 bg-white"
        >
          <option value="all">All Users</option>
          <option value="active">Active Users</option>
          <option value="blocked">Blocked Users</option>
        </select>

      </div>
    </div>
  );
};

export default CustomerFilters;