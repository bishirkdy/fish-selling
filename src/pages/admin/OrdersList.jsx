import React from "react";
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Search,
  Eye,
  View,
} from "lucide-react";
import { useGetAllOrders, useGetOrderedStatus } from "../../tanstack/hooks/queries/orderQueries";

const statusStyle = {
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-yellow-100 text-yellow-700",
  Shipped: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};

const statusIcon = {
  Delivered: <CheckCircle size={16} />,
  Processing: <Clock size={16} />,
  Shipped: <Truck size={16} />,
  Cancelled: <XCircle size={16} />,
};

const OrdersList = () => {
    const {data , isLoading , isError} = useGetAllOrders()
    const {data : orderStatus , isLoading : statusLoading , isError : statusError} = useGetOrderedStatus()
    console.log(orderStatus);
  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Orders Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and track customer orders
          </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
     
        <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Orders</p>
            <h2 className="text-2xl font-bold mt-1">{orderStatus?.orderedCount}</h2>
          </div>

          <div className="bg-gray-100 p-3 rounded-xl">
            <Package className="text-black" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Processing</p>
            <h2 className="text-2xl font-bold mt-1">{orderStatus?.ordered}</h2>
          </div>

          <div className="bg-yellow-100 p-3 rounded-xl">
            <Clock className="text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Delivered</p>
            <h2 className="text-2xl font-bold mt-1">{orderStatus?.pending}</h2>
          </div>

          <div className="bg-green-100 p-3 rounded-xl">
            <CheckCircle className="text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Cancelled</p>
            <h2 className="text-2xl font-bold mt-1">{orderStatus?.cancelled}</h2>
          </div>

          <div className="bg-red-100 p-3 rounded-xl">
            <XCircle className="text-red-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Recent Orders
          </h2>

          <div className="relative w-full md:w-75">
            <Search
              size={18}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search orders..."
              className="w-full border border-gray-300 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-225">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Order ID
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Customer
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Ordered Date
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Total
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Payment
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">
                  View
                </th>
              </tr>
            </thead>

            <tbody>
              {data?.orders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b last:border-none hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-5 font-semibold text-gray-800">
                    {order.id}
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    {order.userData.name}
                  </td>

                  <td className="px-6 py-5 text-gray-600">{new Date(order.orderedDate).toLocaleDateString()}</td>

                  <td className="px-6 py-5 font-medium text-gray-800">
                    {order.totalAmount}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.orderMethod === "RAZOR PAY"
                          ? "bg-green-100 text-green-700"
                          : order.payment === "COD"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.orderMethod}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                        statusStyle[order.orderStatus]
                      }`}
                    >
                      {statusIcon[order.orderStatus]}
                      {order.orderStatus}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center">
                      <button className="p-2 rounded-lg hover:bg-gray-100 transition">
                        <View size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* <div className="flex items-center justify-between px-6 py-4 border-t">
          <p className="text-sm text-gray-500">
            Showing 1 to 4 of 100 orders
          </p>

          <div className="flex items-center gap-2">
            <button className="border px-4 py-2 rounded-lg hover:bg-gray-100">
              Prev
            </button>

            <button className="bg-black text-white px-4 py-2 rounded-lg">
              1
            </button>

            <button className="border px-4 py-2 rounded-lg hover:bg-gray-100">
              2
            </button>

            <button className="border px-4 py-2 rounded-lg hover:bg-gray-100">
              Next
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default OrdersList;