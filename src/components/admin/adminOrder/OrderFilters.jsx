const OrderFilters = ({
  search,
  setSearch,
  filterStatus,
  setFilterStatus,
  setPage,
}) => {
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatus = (e) => {
    setFilterStatus(e.target.value);
    setPage(1);
  };

  return (
    <div className="bg-white rounded-xl p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-4">
      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search orders..."
        className="flex-1 border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-(--color-accent)"
      />

      {/* Status */}
      <select
        value={filterStatus}
        onChange={handleStatus}
        className="border border-gray-200 rounded-lg px-4 py-2 outline-none"
      >
        <option value="">All Orders</option>
        <option value="OrderPlaced">Order Placed</option>
        <option value="Confirmed">Confirmed</option>
        <option value="Packed">Packed</option>
        <option value="Shipping">Shipping</option>
        <option value="Shipped">Out For Delivery</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>
    </div>
  );
};

export default OrderFilters;