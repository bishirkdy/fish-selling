const OrdersTable = ({ orders, onView, onDelete }) => {
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="text-left p-4">Customer</th>
            <th className="text-left p-4">Order ID</th>
            <th className="text-left p-4">Total</th>
            <th className="text-left p-4">Payment</th>
            {/* <th className="text-left p-4">Payment Status</th> */}
            <th className="text-left p-4">Date</th>
            <th className="text-left p-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {orders?.map((order) => (
            <tr
              key={order.id}
              className="border-b last:border-b-0 hover:bg-gray-50"
            >
              <td className="p-4">
                {order.shippingAddress?.fullName}
              </td>

              <td className="p-4 text-gray-500">
                {order.id}
              </td>

              <td className="p-4 font-semibold">
                ₹{Math.floor(order.totalAmount)}
              </td>

              <td className="p-4">
                {order.paymentMethod}
              </td>
{/* 
              <td className="p-4">
                {order.paymentStatus}
              </td> */}

              <td className="p-4">
                {new Date(order.orderedAt).toLocaleDateString()}
              </td>

              <td className="p-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onView(order)}
                    className="px-3 py-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"
                  >
                    View
                  </button>

                  <button
                    onClick={() => onDelete(order.id)}
                    className="px-3 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {(!orders || orders.length === 0) && (
        <div className="p-10 text-center text-gray-500">
          No orders found.
        </div>
      )}
    </div>
  );
};

export default OrdersTable;