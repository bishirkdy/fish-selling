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
  CircleX,
  Unlock,
} from "lucide-react";
import { toast } from "react-toastify";
// import { useEditOrderStatus } from "../../../tanstack/hooks/mutations/orderMutation";
import { useQueryClient } from "@tanstack/react-query";

import Loader from "../../../components/Loader";
import { useBlockUser, useUnblockUser } from "../../../tanstack/hooks/mutations/user/adminUserMutations";
import { useGetAllOrdersOfUser } from "../../../tanstack/hooks/queries/order/orderQueries";
import { useGetUsers } from "../../../tanstack/hooks/queries/user/adminUserQueries";
const ViewCustomer = () => {
  const [showOrderId, setShowOrderId] = useState(null);
  const [viewUserOrder, setViewUserOrder] = useState(false);
  const [orderedData, setOrderedData] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const { data, isLoading, isError } = useGetUsers();
  const client = useQueryClient();
  const {
    data: userOrders,
    isLoading: userOrderLoading,
    isError: userOrderIsError,
  } = useGetAllOrdersOfUser(showOrderId);
  const { mutate: userBlockMutate, isPending: blockPending } = useBlockUser();
  const { mutate: userUnblockMutate, isPending: unblockPending } =
    useUnblockUser();
  // const { mutate, isPending } = useEditOrderStatus();
  const filteredCustomers = data?.filter((customer) => {
    const searchMatch =
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      filter === "all"
        ? true
        : filter === "blocked"
          ? customer.isBlocked
          : !customer.isBlocked;

    return searchMatch && statusMatch;
  });
  useEffect(() => {
    if (showOrderId && userOrders) {
      setOrderedData(userOrders);

      if (userOrders.length === 0) {
        toast.info("User not ordered yet");
        setViewUserOrder(false);
      }
    }
  }, [userOrders, showOrderId]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  function orderShowHandler(userId) {
    setOrderedData(null);
    setShowOrderId(userId);
    setViewUserOrder(true);
  }

  function orderStatusHandler(orderId, productId, value) {
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

          toast.success("Status Updated");
        },

        onError: (err) => {
          toast.error(err.message);
        },
      },
    );
  }

  function blockUserHandler(id) {
    userBlockMutate(id, {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ["users"] });
        toast.success("User has been blocked");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  }
  function unblockUserHandler(id) {
    userUnblockMutate(id, {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ["users"] });
        toast.success("User has been unblocked");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
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

      <div className="border-(--color-background) rounded-2xl shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
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

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="
      border
      border-gray-300
      rounded-2xl
      px-4
      py-3
      outline-none
      focus:ring-2
      bg-white
    "
          >
            <option value="all">All Users</option>
            <option value="active">Active Users</option>
            <option value="blocked">Blocked Users</option>
          </select>
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
              {filteredCustomers?.map((customer, index) => (
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
                      className={`px-4 py-2 rounded-full text-sm font-semibold
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
                      {userOrderLoading ? "Fetching..." : "Orders"}
                    </div>
                  </td>
                  <td className="py-5 pl-6">
                    <button
                      onClick={() =>
                        customer.isBlocked
                          ? unblockUserHandler(customer.id)
                          : blockUserHandler(customer.id)
                      }
                      className={`w-10 h-10 flex items-center justify-center rounded-xl transition cursor-pointer 
                        ${
                          customer.isBlocked
                            ? "bg-green-100 hover:bg-green-200 text-green-600"
                            : "bg-red-100 hover:bg-red-200 text-red-600"
                        }
    `}
                    >
                      {customer.isBlocked ? (
                        <Unlock size={18} />
                      ) : (
                        <Ban size={18} />
                      )}
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
          className="p-12 mt-8 text-center
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
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition cursor-pointer"
              >
                <CircleX />
              </button>
            </div>

            <div className="max-h-[75vh] overflow-y-auto no-scrollbar p-3 md:p-6 space-y-6">
              {orderedData?.map((order, orderId) => (
                <div
                  key={orderId}
                  className="border rounded-3xl overflow-hidden shadow-sm"
                >
                  <div className=" px-4 md:px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b">
                    <div>
                      <p className="text-xs md:text-sm text-gray-500">
                        Order ID
                      </p>

                      <h2 className="font-bold text-sm md:text-base text-gray-700 break-all">
                        {order.id}
                      </h2>
                    </div>

                    <div>
                      <p className="text-xs md:text-sm text-gray-500">
                        Payment
                      </p>

                      <h2 className="font-semibold text-(--color-secondary) text-sm md:text-base">
                        {order.orderMethod}
                      </h2>
                    </div>

                    <div>
                      <p className="text-xs md:text-sm text-gray-500">Total</p>

                      <h2 className="font-bold text-(--color-background) text-sm md:text-base">
                        ₹ {order.totalAmount}
                      </h2>
                    </div>
                  </div>

                  <div className="p-3 md:p-6 space-y-4">
                    {order.products.map((item, productId) => (
                      <div
                        key={productId}
                        className="border rounded-2xl p-3 md:p-5 flex flex-col sm:flex-row gap-4"
                      >
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
                                  order.id,
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
                            <span className="font-bold text-(--color-accent) text-base md:text-lg">
                              ₹ {item.product.price}
                            </span>

                            <span className="px-3 py-1 rounded-full bg-gray-100 text-xs md:text-sm">
                              Qty : {item.quantity}
                            </span>

                            <span className="px-3 py-1 rounded-full bg-blue-100 text-(--color-background) text-xs md:text-sm">
                              {item.paymentStatus}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t px-4 md:px-6 py-5 bg-gray-50">
                    <h2 className="font-bold text-gray-700 mb-3 text-sm md:text-base">
                      Shipping Address
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm text-gray-600">
                      <div className="space-y-1">
                        <p>
                          <span className="font-semibold">Name :</span>{" "}
                          {order.shippingAddress.name}
                        </p>

                        <p>
                          <span className="font-semibold">Phone :</span>{" "}
                          {order.shippingAddress.phone}
                        </p>

                        <p>
                          <span className="font-semibold">Email :</span>{" "}
                          {order.shippingAddress.email}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <p>
                          {order.shippingAddress.address.street},
                          {order.shippingAddress.address.post},{" "}
                          {order.shippingAddress.address.district},{" "}
                          {order.shippingAddress.address.state}
                        </p>

                        <p>Pincode : {order.shippingAddress.address.pincode}</p>

                        <p>
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
