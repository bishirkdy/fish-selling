import { useState } from "react";
import {
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import Loader from "../components/Loader";
import ViewOrderDetail from "../components/orders/ViewOrderDetail";
import TrackOrderDetail from "../components/orders/TrackOrderDetail";

import { useRemoveUserById } from "../tanstack/hooks/mutations/order/orderMutations";
import { useGetAllOrdersOfUser } from "../tanstack/hooks/queries/order/orderQueries";

const STATUS = {
  OrderPlaced: {
    label: "Ordered",
    icon: <Clock size={14} />,
    bg: "bg-yellow-500/10",
    text: "text-yellow-400",
  },

  Confirmed: {
    label: "Confirmed",
    icon: <CheckCircle size={14} />,
    bg: "bg-blue-500/10",
    text: "text-blue-400",
  },

  Packed: {
    label: "Packed",
    icon: <ShoppingBag size={14} />,
    bg: "bg-purple-500/10",
    text: "text-purple-400",
  },

  Shipping: {
    label: "Shipping",
    icon: <Truck size={14} />,
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
  },

  Shipped: {
    label: "Out For Delivery",
    icon: <MapPin size={14} />,
    bg: "bg-orange-500/10",
    text: "text-orange-400",
  },

  Delivered: {
    label: "Delivered",
    icon: <CheckCircle size={14} />,
    bg: "bg-green-500/10",
    text: "text-green-400",
  },

  Cancelled: {
    label: "Cancelled",
    icon: <XCircle size={14} />,
    bg: "bg-red-500/10",
    text: "text-red-400",
  },
};

const PAYMENT_STATUS = {
  Pending: {
    text: "Pending",
    color: "text-yellow-400",
  },

  Paid: {
    text: "Paid",
    color: "text-green-400",
  },

  Failed: {
    text: "Failed",
    color: "text-red-500",
  },

  Refunded: {
    text: "Refunded",
    color: "text-blue-400",
  },
};

const Orders = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [viewDetail, setViewDetail] = useState(false);
  const [viewTrack, setViewTrack] = useState(false);
  const [viewableData, setViewableData] = useState(null);
  const [trackableData, setTrackableData] = useState(null);

  const { data = [], isLoading } = useGetAllOrdersOfUser();
  const { mutate: cancelOrder, isPending } = useRemoveUserById();
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-(--color-background)">
        <Loader />
      </div>
    );
  }
console.log(data)
  if (data.length === 0) {
    return (
      <div className="min-h-screen bg-(--color-background) text-white flex flex-col items-center justify-center">
        <ShoppingBag size={60} className="text-green-500 mb-4" />
        <h1 className="text-2xl font-bold">No Orders Yet</h1>

        <button
          onClick={() => navigate("/")}
          className="mt-5 bg-(--color-accent) px-5 py-2 rounded-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleCancel = (orderId, productId) => {
    cancelOrder(
      { orderId, productId },
      {
        onSuccess: () => {
          toast.success("Order cancelled");
          queryClient.invalidateQueries({
            queryKey: ["user-orders"],
          });
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-(--color-background) text-white pt-24 pb-16 px-3">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>

        <div className="space-y-5">
          {data.map((order) =>
            order.items.map((item) => {
              const status = STATUS[item.orderStatus] ?? {
                label: item.orderStatus,
                icon: <Clock size={14} />,
                bg: "bg-gray-500/10",
                text: "text-gray-400",
              };

              const payment = PAYMENT_STATUS[order.paymentStatus] ?? {
                text: order.paymentStatus,
                color: "text-gray-400",
              };

              return (
                <div
                  key={`${order.id}-${item.productId}`}
                  className="border border-(--color-tertiary) rounded-2xl p-5"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {item.productName}
                      </h2>

                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-400">
                          <span className="font-medium text-white">
                            Order ID :
                          </span>{" "}
                          {order.id}
                        </p>

                      </div>
                    </div>

                    <div className="flex flex-col gap-2 items-start md:items-end">
                      <div
                        className={`flex items-center gap-2 px-4 py-2 rounded-full ${status.bg} ${status.text}`}
                      >
                        {status.icon}
                        <span className="font-medium">{status.label}</span>
                      </div>

              
                    </div>
                  </div>

                  <div className="mt-5 flex gap-5 flex-col md:flex-row">
                    <div className="w-36 h-36 rounded-xl overflow-hidden border border-gray-700 shadow-md shrink-0">
                      <img
                        src={item.productImage ?? "/no-image.png"}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm mt-1">
                        <div>
                          <p className="text-gray-400">Quantity</p>
                          <p className="font-medium">{item.quantity}</p>
                        </div>

                        <div>
                          <p className="text-gray-400">Unit Price</p>

                          <div className="flex items-center gap-2">
                            <p className="font-medium">
                              ₹{Math.floor(item.discountedPrice)}
                            </p>

                            {item.discountPercentage > 0 && (
                              <span className="text-xs text-gray-500 line-through">
                                ₹{Math.floor(item.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="text-gray-400">Total Amount</p>
                          <p className="font-semibold text-green-400">
                            ₹{Math.floor(item.totalPrice)}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-400">Payment Method</p>
                          <p className="font-medium">{order.paymentMethod}</p>
                        </div>

                        <div>
                          <p className="text-gray-400">Payment Status</p>

                          <p className={`font-medium ${payment.color}`}>
                            {payment.text}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-400">Ordered On</p>

                          <p className="font-medium">
                            {new Date(order.orderedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <button
                          onClick={() => {
                            setViewableData({
                              ...item,
                              orderId: order.id,
                              orderedAt: order.orderedAt,
                              shippingAddress: order.shippingAddress,
                              paymentMethod: order.paymentMethod,
                              paymentStatus: order.paymentStatus,
                              totalAmount: order.totalAmount,
                            });

                            setViewDetail(true);
                          }}
                          className="px-5 py-2 rounded-lg bg-(--color-primary) hover:opacity-90 transition font-medium"
                        >
                          View Details
                        </button>

                        <button
                          onClick={() => {
                            setTrackableData({
                              ...item,
                              orderedAt: order.orderedAt,
                            });

                            setViewTrack(true);
                          }}
                          className="px-5 py-2 rounded-lg border border-(--color-primary) hover:bg-(--color-primary) hover:text-white transition font-medium"
                        >
                          Track Order
                        </button>

                        <button
                          disabled={
                            isPending ||
                            item.orderStatus === "Cancelled" ||
                            item.orderStatus === "Delivered"
                          }
                          onClick={() => handleCancel(order.id, item.productId)}
                          className="
                           px-5
                           py-2
                           rounded-lg
                           border
                           border-red-500
                           text-red-500
                           hover:bg-red-500
                           hover:text-white
                            transition
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                            disabled:hover:bg-transparent
                           disabled:hover:text-red-500
                            "
                        >
                          {isPending
                            ? "Cancelling..."
                            : item.orderStatus === "Cancelled"
                              ? "Cancelled"
                              : item.orderStatus === "Delivered"
                                ? "Delivered"
                                : "Cancel Order"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }),
          )}
        </div>
      </div>

      {viewDetail && (
        <ViewOrderDetail
          viewableData={viewableData}
          setViewDetail={setViewDetail}
        />
      )}

      {viewTrack && (
        <TrackOrderDetail
          data={trackableData}
          setViewTrack={() => setViewTrack(false)}
        />
      )}
    </div>
  );
};

export default Orders;
