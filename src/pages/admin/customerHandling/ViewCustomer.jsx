import React, { useEffect, useState } from "react";
import {
  Search,
  Eye,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Users,
  Ban,
  BaggageClaim,
} from "lucide-react";
import { useGetUsers } from "../../../tanstack/hooks/queries/userQueries";
import { useGetAllOrdersOfUser } from "../../../tanstack/hooks/queries/orderQueries";
import { toast } from "react-toastify";
const ViewCustomer = () => {
  const [search, setSearch] = useState("");
  const [showOrderId, setShowOrderId] = useState(null);
  const [viewUserOrder, setViewUserOrder] = useState(false);
  const [orderedData, setOrderedData] = useState(null);
  const { data, isLoading, isError } = useGetUsers();
  const {
    data: userOrders,
    isLoading: userOrderLoading,
    isError: userOrderIsError,
  } = useGetAllOrdersOfUser(showOrderId);
  const filteredCustomers = data?.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase()),
  );
  useEffect(() => {
    if (userOrders) {
      const formattedOrders = userOrders.orders.map((order) => {
        const products = order.products.map((item) => {
          const fullProduct = userOrders.products.find(
            (p) => p.id === item.productId,
          );

          return {
            ...fullProduct,
            quantity: item.quantity,
          };
        });

        return {
          ...order,
          products,
        };
      });
      setOrderedData(formattedOrders);
    }
  }, [userOrders]);
  useEffect(() => {
    if (viewUserOrder && userOrders && userOrders.orders.length === 0) {
      toast.info("User not ordered yet");
      setViewUserOrder(false);
    }
  }, [viewUserOrder, userOrders]);

  function orderShowHandler(userId) {
    setOrderedData(null);
    setShowOrderId(userId);
    setViewUserOrder(true);
  }
  return (
    <div className="w-full min-h-screen bg-gray-100 p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-(--background)">Customers</h1>
          <p className="text-(--color-background)">
            Manage all registered customers
          </p>
        </div>

        <div
          className="
            bg-(--color-background)
            text-white
            px-6
            py-3
            rounded-2xl
            font-semibold
          "
        >
          Total : {data?.length}
        </div>
      </div>

      <div className="border-(--color-background) border-2 rounded-2xl shadow-sm mb-6">
        <div className="relative">
          <Search
            size={18}
            className="
              absolute
              top-1/2
              left-4
              -translate-y-1/2
            "
          />
          <input
            type="text"
            placeholder="Search customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              border
              border-gray-300
              rounded-2xl
              pl-11
              pr-4
              py-3
              outline-none
              focus:ring-2
            "
          />
        </div>
      </div>
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-250">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Customer
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Contact
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Orders
                </th>

                <th className="text-center py-2 text-sm font-semibold text-gray-600">
                  Block User
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers?.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div>
                        <h2 className="font-semibold text-gray-800">
                          {customer.name}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          ID : #{customer.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={15} />

                        <span className="text-sm">{customer.email}</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-semibold
                        ${
                          customer.isBlocked
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-700"
                        }
                      `}
                    >
                      {customer.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="py-5">
                    <div
                      onClick={() => orderShowHandler(customer.id)}
                      className="inline-flex items-center cursor-pointer gap-2 bg-cyan-50 text-(--color-surface) px-4 py-2 rounded-xl font-semibold"
                    >
                      <BaggageClaim size={16} />
                      Orders
                    </div>
                  </td>
                  <td className="py-5 pl-6">
                    <button
                      className="
                          w-10 cursor-pointer h-10 flex items-center justify-center rounded-xl
                          bg-red-100
                          hover:bg-red-200
                          text-red-600
                          transition
                        "
                    >
                      <Ban size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {filteredCustomers?.length === 0 && (
        <div
          className="
            bg-white
            rounded-3xl
            p-12
            mt-8
            text-center
          "
        >
          <Users size={60} className="mx-auto text-gray-300 mb-4" />

          <h2 className="text-2xl font-bold text-gray-700">
            No Customer Found
          </h2>

          <p className="text-gray-500 mt-2">
            Try searching with another keyword
          </p>
        </div>
      )}
      {viewUserOrder && orderedData && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl no-scrollbar overflow-hidden">
            <div className="flex items-center justify-between px-8 py-5 border-b">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Customer Orders
                </h1>

                <p className="text-gray-500 text-sm mt-1">
                  Total Orders : {orderedData?.length}
                </p>
              </div>

              <button
                onClick={() => {
                  setViewUserOrder(false);
                  setOrderedData(null);
                  setShowOrderId(null);
                }}
                className="w-10 h-10 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="max-h-[75vh] overflow-y-auto no-scrollbar p-6 space-y-6">
              {orderedData?.map((order, index) => (
                <div
                  key={index}
                  className="border rounded-3xl overflow-hidden shadow-sm"
                >
                  <div className="bg-gray-50 px-6 py-4 flex flex-wrap gap-6 items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <h2 className="font-bold text-gray-700">{order.id}</h2>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Payment</p>
                      <h2 className="font-semibold text-cyan-700">
                        {order.orderMethod}
                      </h2>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 font-semibold">
                        {order.orderStatus}
                      </span>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <h2 className="font-bold text-(--color-background)">
                        ₹ {order.totalAmount}
                      </h2>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    {order.products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-5 border rounded-2xl p-4 hover:bg-gray-50 transition"
                      >
                        <img
                          src={product.images}
                          alt={product.title}
                          className="w-24 h-24 object-cover rounded-2xl"
                        />

                        <div className="flex-1">
                          <h1 className="font-bold text-lg text-gray-800">
                            {product.title}
                          </h1>

                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {product.description}
                          </p>

                          <div className="flex items-center gap-5 mt-3">
                            <span className="font-bold text-cyan-700">
                              ₹ {product.price}
                            </span>

                            <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
                              Qty : {product.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t px-6 py-5 bg-gray-50">
                    <h2 className="font-bold text-gray-700 mb-3">
                      Shipping Address
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <p>
                          <span className="font-semibold">Name :</span>{" "}
                          {order.shippingAddress.name}
                        </p>

                        <p>
                          <span className="font-semibold">Email :</span>{" "}
                          {order.shippingAddress.email}
                        </p>

                        <p>
                          <span className="font-semibold">Phone :</span>{" "}
                          {order.shippingAddress.phone}
                        </p>
                      </div>

                      <div>
                        <p>
                          {order.shippingAddress.address.street},{" "}
                          {order.shippingAddress.address.post},{" "}
                          {order.shippingAddress.address.district},{" "}
                          {order.shippingAddress.address.state}
                        </p>

                        <p className="mt-1">
                          Pincode : {order.shippingAddress.address.pincode}
                        </p>

                        <p className="mt-1">
                          Landmark : {order.shippingAddress.address.landmark}
                        </p>
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
  );
};

export default ViewCustomer;
