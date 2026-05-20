import React, { useState } from "react";
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Search,
  Eye,
  View,
  ShoppingCart,
  BadgeCheck,
  Archive,
  Bike,
  CircleX,
  ShoppingBagIcon,
  Boxes,
} from "lucide-react";
import {
  useGetAllOrders,
  useGetOrderedStatus,
} from "../../tanstack/hooks/queries/orderQueries";
import { useEditOrderStatus } from "../../tanstack/hooks/mutations/orderMutation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const statusStyle = {
  "Order Placed": "bg-blue-100 text-blue-700",
  Confirmed: "bg-cyan-100 text-cyan-700",
  Packed: "bg-yellow-100 text-yellow-700",
  Shipping: "bg-purple-100 text-purple-700",
  "Out For Delivery": "bg-orange-100 text-orange-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const OrdersList = () => {
  const { data, isLoading, isError } = useGetAllOrders();
  const [view, setView] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const {
    data: orderStatus,
    isLoading: statusLoading,
    isError: statusError,
  } = useGetOrderedStatus();
  const { mutate, isPending } = useEditOrderStatus();
  const client = useQueryClient();

    if (isLoading || statusLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <ShoppingBagIcon size={60} className="mb-4" />

        <h1 className="text-2xl font-bold">No Orders Yet</h1>
        <p className="text-gray-400 mt-2">All orders will appear here</p>
      </div>
    );
  }
  const currentOrder = data?.find((order) => order.id === selectedOrder?.id);

  function viewOrderProducts(order) {
    setSelectedOrder(order);
    setOrderId(order.id);
    setView(true);
  }
  function orderStatusHandler(productId, value) {
    const updatedTime = {};

    switch (value) {
      case "Confirmed":
        updatedTime.confirmTime = Date.now();
        break;
      case "Packed":
        updatedTime.packedTime = Date.now();
        break;
      case "Shipping":
        updatedTime.shippingTime = Date.now();
        break;
      case "Out For Delivery":
        updatedTime.deliveryStartTime = Date.now();
        break;
      case "Delivered":
        updatedTime.deliveredTime = Date.now();
        break;
      case "Cancelled":
        updatedTime.canceledTime = Date.now();
        break;
      default:
        break;
    }
    const final = {
      status: value,
      ...updatedTime,
    };
    mutate(
      { orderId, productId, final },
      {
        onSuccess: () => {
          client.invalidateQueries({
            queryKey: ["orders"],
          });
          client.invalidateQueries({
            queryKey: ["orders-status"],
          });
          toast.success("Status Updated");
        },
        onError: (err) => {
          toast.error(err.message);
        },
      },
    );
  }
  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Orders Management</h1>
        <p className="text-gray-500 mt-1">Manage and track customer orders</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Orders</p>
            <h2 className="text-2xl font-bold mt-1">
              {orderStatus?.orderedCount}
            </h2>
          </div>

          <div className="bg-gray-100 p-3 rounded-xl">
            <Boxes className="text-black" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Order Placed</p>
            <h2 className="text-2xl font-bold mt-1">{orderStatus?.ordered}</h2>
          </div>

          <div className="bg-blue-100 p-3 rounded-xl">
            <ShoppingCart className="text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Confirmed</p>
            <h2 className="text-2xl font-bold mt-1">
              {orderStatus?.confirmed}
            </h2>
          </div>

          <div className="bg-cyan-100 p-3 rounded-xl">
            <BadgeCheck className="text-cyan-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Packed</p>
            <h2 className="text-2xl font-bold mt-1">{orderStatus?.packed}</h2>
          </div>

          <div className="bg-yellow-100 p-3 rounded-xl">
            <Archive className="text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Shipping</p>
            <h2 className="text-2xl font-bold mt-1">{orderStatus?.shipped}</h2>
          </div>

          <div className="bg-purple-100 p-3 rounded-xl">
            <Truck className="text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Out For Delivery</p>
            <h2 className="text-2xl font-bold mt-1">
              {orderStatus?.outOfDelivery}
            </h2>
          </div>

          <div className="bg-orange-100 p-3 rounded-xl">
            <Bike className="text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Delivered</p>
            <h2 className="text-2xl font-bold mt-1">
              {orderStatus?.delivered}
            </h2>
          </div>

          <div className="bg-green-100 p-3 rounded-xl">
            <CheckCircle className="text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Cancelled</p>
            <h2 className="text-2xl font-bold mt-1">
              {orderStatus?.cancelled}
            </h2>
          </div>

          <div className="bg-red-100 p-3 rounded-xl">
            <XCircle className="text-red-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>

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
          <table className="w-full min-w-275">
            <thead className="bg-gray-50 border-b">
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
                  Payment Method
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Payment Status
                </th>
                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">
                  View
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((order, index) => (
                <tr
                  key={order.id || index}
                  className="border-b last:border-none transition"
                >
                  <td className="px-6 py-2">
                    <div className="font-semibold text-gray-800">
                      {order?.id}
                    </div>
                  </td>

                  <td className="px-6 py-2">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-gray-800">
                        {order.user_name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {order.shippingAddress?.email}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-2 text-gray-600">
                    {new Date(order.orderedDate).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-2">
                    <span className="font-bold text-gray-800">
                      ₹{order.totalAmount}
                    </span>
                  </td>

                  <td className="px-6 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.orderMethod === "RAZOR PAY"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.orderMethod}
                    </span>
                  </td>

                  <td className="px-6 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.paymentStatus === "PAID"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-2">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => viewOrderProducts(order)}
                        className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition cursor-pointer"
                      >
                        <View size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {view && currentOrder && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-5xl max-h-[95vh] rounded-3xl shadow-2xl no-scrollbar overflow-y-auto">
              <div className="flex items-center justify-between px-8 py-5 border-b">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    Order Products
                  </h1>
                  <p className="text-gray-500 text-sm mt-1">
                    Total Products : {currentOrder?.products.length}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setView(false);
                    setSelectedOrder(null);
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition cursor-pointer"
                >
                  <CircleX />
                </button>
              </div>

              <div className="border-b bg-gray-50 p-6">
                <h2 className="font-bold text-lg text-gray-800 mb-4">
                  Customer Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm text-gray-700">
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold">Name :</span>{" "}
                      {currentOrder?.shippingAddress?.name}
                    </p>
                    <p>
                      <span className="font-semibold">Phone :</span>{" "}
                      {currentOrder?.shippingAddress?.phone}
                    </p>
                    <p>
                      <span className="font-semibold">Email :</span>{" "}
                      {currentOrder?.shippingAddress?.email}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p>
                      {currentOrder?.shippingAddress?.address?.street},
                      {currentOrder?.shippingAddress?.address?.post},{" "}
                      {currentOrder?.shippingAddress?.address?.district},{" "}
                      {currentOrder?.shippingAddress?.address?.state}
                    </p>
                    <p>
                      Pincode :{" "}
                      {currentOrder?.shippingAddress?.address?.pincode}
                    </p>
                    <p>
                      Landmark :{" "}
                      {currentOrder?.shippingAddress?.address?.landmark}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 md:p-6 space-y-6">
                {currentOrder?.products?.map((item, index) => (
                  <div key={index} className="rounded-3xl overflow-hidden">
                    <div className="p-3 md:p-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <img
                          src={item.product.images}
                          alt={item.product.name}
                          className="w-full sm:w-28 h-48 sm:h-28 object-cover rounded-2xl"
                        />

                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                            <div>
                              <h1 className="font-bold text-base md:text-lg text-gray-800">
                                {item.product.name}
                              </h1>

                              <p className="text-xs md:text-sm text-gray-500 mt-1">
                                {item.product.category}
                              </p>
                            </div>
                            <select
                              disabled={isPending}
                              value={item.orderStatus}
                              onChange={(e) =>
                                orderStatusHandler(
                                  item.productId,
                                  e.target.value,
                                )
                              }
                              className="px-3 py-2 rounded-xl border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                              <option value="Order Placed">Order Placed</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Packed">Packed</option>
                              <option value="Shipping">Shipping</option>
                              <option value="Out For Delivery">
                                Out For Delivery
                              </option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </div>
                          <p className="text-xs md:text-sm text-gray-500 mt-3">
                            {item.product.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-3 md:gap-5 mt-4">
                            <span className="font-bold text-green-600 text-base md:text-lg">
                              ₹ {item.product.price}
                            </span>

                            <span className="px-3 py-1 rounded-full bg-gray-100 text-xs md:text-sm">
                              Qty : {item.quantity}
                            </span>

                            <span className="px-3 py-1 rounded-full bg-blue-100 text-(--color-surface) text-xs md:text-sm">
                              {item.paymentStatus}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersList;
