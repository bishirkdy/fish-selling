import React, { useState } from "react";
import {
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  ShoppingBagIcon,
} from "lucide-react";
import { toast } from "react-toastify";
import { useGetAllOrdersOfUser } from "../tanstack/hooks/queries/orderQueries";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useRemoveUserById } from "../tanstack/hooks/mutations/orderMutation";
import { dataTagErrorSymbol, useQueryClient } from "@tanstack/react-query";
import { priceDiscounted } from "../utils/priceDescounted";
import ViewOrderDetail from "../components/orders/ViewOrderDetail";
import TrackOrderDetail from "../components/orders/TrackOrderDetail";

const statusStyles = {
  ORDERED: {
    bg: "bg-yellow-500/10",
    text: "text-yellow-400",
    icon: <Clock size={14} />,
    label: "Order Placed",
  },

  CONFIRMED: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    icon: <CheckCircle size={14} />,
    label: "Confirmed",
  },

  PACKED: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    icon: <ShoppingBagIcon size={14} />,
    label: "Packed",
  },

  SHIPPING: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    icon: <Truck size={14} />,
    label: "Shipping",
  },

  OUT_FOR_DELIVERY: {
    bg: "bg-orange-500/10",
    text: "text-orange-400",
    icon: <MapPin size={14} />,
    label: "Out For Delivery",
  },

  DELIVERED: {
    bg: "bg-green-500/10",
    text: "text-green-400",
    icon: <CheckCircle size={14} />,
    label: "Delivered",
  },

  CANCELLED: {
    bg: "bg-red-500/10",
    text: "text-red-400",
    icon: <Clock size={14} />,
    label: "Cancelled",
  },
};

const Orders = () => {
  const [viewDetail, setViewDetail] = useState(false);
  const [viewTrack, setViewTrack] = useState(false);
  const [trackableData, setTrackableData] = useState(null);
  const [viewableData, setViewableData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const client = useQueryClient();

  const { mutate: removeMutate, isPending } = useRemoveUserById();
  const { data, isLoading } = useGetAllOrdersOfUser(id);

  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-(--color-background) flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen text-white bg-(--color-background) flex flex-col items-center justify-center">
        <ShoppingBagIcon size={60} className="text-green-500 mb-4" />

        <h1 className="text-2xl font-bold">No Orders Yet</h1>

        <p className="text-gray-400 mt-2">Your orders will appear here</p>

        <button
          onClick={() => navigate("/")}
          className="md:hidden px-4 py-2 rounded-lg mt-4 bg-(--color-accent)"
        >
          Back to Home
        </button>
      </div>
    );
  }

  function handleRemove(orderId) {
    removeMutate(orderId, {
      onSuccess: () => {
        client.invalidateQueries({
          queryKey: ["orders", id],
        });

        toast.success("Order canceled");
      },
    });
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-(--color-background) text-white px-3 sm:px-4">
      <div className="w-full max-w-6xl mx-auto mb-6">
        <h1 className="text-2xl font-bold">My Orders</h1>
      </div>

      <div className="space-y-5">
        {data?.map((order) =>
          order.products.map((item, index) => {
            const style = statusStyles[item.orderStatus];
            return (
              <div
                key={`${order?.id}-${index}`}
                className="mx-auto w-full max-w-6xl border border-(--color-tertiary) rounded-2xl p-3 sm:p-5 hover:border-(--color-accent) transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {item.product?.name}
                    </h2>

                    <p className="text-zinc-400 text-sm mt-1 break-all">
                      Order ID : {order.id}
                    </p>

                    <p className="text-zinc-500 text-xs mt-1">
                      {new Date(order.orderedDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm w-fit ${style?.bg} ${style?.text}`}
                  >
                    {style?.icon}

                    <span>{item.orderStatus}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="w-full sm:w-36 h-52 sm:h-32 rounded-xl overflow-hidden shrink-0 border border-(--color-tertiary)">
                    <img
                      src={item.product?.images}
                      alt={item.product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-zinc-400 text-sm line-clamp-3">
                      {item.product?.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5 text-sm">
                      <p>
                        Quantity :
                        <span className="ml-1 text-cyan-400">
                          {item.quantity}
                        </span>
                      </p>
                      <p>
                        Price :
                        <span className="ml-1 text-cyan-400">
                          ₹
                          {priceDiscounted(
                            item.product?.price,
                            item.product?.discountPercentage,
                          )}
                        </span>
                      </p>
                      <p>
                        Payment :
                        <span className="ml-1 text-yellow-400">
                          {item.paymentStatus}
                        </span>
                      </p>
                      <p>
                        Method :
                        <span className="ml-1 text-green-400">
                          {order.orderMethod}
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-5">
                      <button
                        onClick={() => {
                          setViewableData({
                            ...item,
                            orderedId: order.id,
                            orderedDate: order.orderedDate,
                            orderMethod: order.orderMethod,
                            address: order.shippingAddress,
                          });
                          setViewDetail(true);
                        }}
                        className="w-full sm:w-auto bg-(--color-primary) hover:bg-(--color-secondary) cursor-pointer text-black px-4 py-2 rounded-xl text-sm font-medium transition"
                      >
                        View Details
                      </button>

                      <button onClick={() => setViewTrack(true)} className="w-full sm:w-auto border border-gray-700 hover:border-(--color-primary) px-4 py-2 rounded-xl text-sm transition">
                        Track Order
                      </button>

                      <button
                        disabled={isPending}
                        onClick={() => handleRemove(order.id)}
                        className="w-full sm:w-auto border border-zinc-700 hover:border-red-500 hover:text-red-400 px-4 py-2 rounded-xl text-sm transition disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }),
        )}
      </div>
      {viewDetail && (
        <ViewOrderDetail
          viewableData={viewableData}
          setViewDetail={setViewDetail}
        />
      )}
      {viewTrack && <TrackOrderDetail />}
    </div>
  );
};

export default Orders;
