const OrderStats = ({ data }) => {
  const stats = [
    {
      label: "Total Orders",
      value: data?.totalOrders ?? 0,
    },
    {
      label: "Order Placed",
      value: data?.orderPlaced ?? 0,
    },
    {
      label: "Confirmed",
      value: data?.confirmed ?? 0,
    },
    {
      label: "Packed",
      value: data?.packed ?? 0,
    },
    {
      label: "Shipping",
      value: data?.shipping ?? 0,
    },
    {
      label: "Delivered",
      value: data?.delivered ?? 0,
    },
    {
      label: "Cancelled",
      value: data?.cancelled ?? 0,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4 mb-6">
      {stats.map((item) => (
        <div
          key={item.label}
          className="bg-white rounded-xl p-4 shadow-sm"
        >
          <p className="text-sm text-gray-500">{item.label}</p>

          <h2 className="text-2xl font-bold text-gray-800 mt-1">
            {item.value}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default OrderStats;