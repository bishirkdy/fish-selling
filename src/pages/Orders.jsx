import React from "react";
import {
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  ShoppingBag,
  ShoppingBagIcon,
} from "lucide-react";
import { toast } from "react-toastify";
import { useGetAllOrdersOfUser } from "../tanstack/hooks/queries/orderQueries";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useRemoveUserById } from "../tanstack/hooks/mutations/orderMutation";
import { useQueryClient } from "@tanstack/react-query";
import { priceDiscounted } from "../utils/priceDescounted";

const statusStyles = {
  ORDERED: {
    bg: "bg-yellow-500/10",
    text: "text-yellow-400",
    icon: <Clock size={14} />,
  },

  SHIPPING: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    icon: <Truck size={14} />,
  },

  DELIVERED: {
    bg: "bg-green-500/10",
    text: "text-green-400",
    icon: <CheckCircle size={14} />,
  },
};

const Orders = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutate: removeMutate, isPending } = useRemoveUserById();
  const { data, isLoading } = useGetAllOrdersOfUser(id);
  const client = useQueryClient();
  if (isLoading) {
    return (
      <div className="w-screen h-screen bg(--color-bg) flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!data || data?.orders?.length === 0) {
    return (
      <div className="min-h-screen text-white bg-(--color-background) flex flex-col items-center justify-center">
        <ShoppingBagIcon size={60} className="text-green-500 mb-4" />

        <h1 className="text-2xl font-bold">No Order Yet</h1>

        <p className="text-gray-400 mt-2">Your Order will appear here</p>
        <button
          onClick={() => navigate("/")}
          className="md:hidden px-4 py-2 rounded-lg mt-2 bg-(--color-accent)"
        >
          Back to Home
        </button>
      </div>
    );
  }

  function handleRemove(orderId) {
    removeMutate(orderId, {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ["orders", id] });
        toast.success("Order canceled");
      },
    });
  }
    
  return (
    <div className="min-h-screen pt-24 pb-16 bg-(--color-background) text-white px-4">
      <div className="max-w-[65%] mx-auto mb-6">
        <h1 className="text-2xl font-bold">My Orders</h1>
      </div>

      <div className="space-y-6">
        {data?.orders?.map((order) => {
          const style = statusStyles[order.orderStatus];
          const orderProducts = order?.products?.map((product) => {
            const productData = data.products?.find(
              (p) => p.id === product.productId,
            );       
            const singleProduct = data.products.find(p => {
              p.id 
            })
             
            return {
              ...product,
              productData,
            };
          });
          return (
            <div
              key={order.id}
              className="mx-auto max-w-[65%] border border-(--color-tertiary) rounded-2xl overflow-hidden hover:border-(--color-accent) transition p-5"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold">{order.id}</h2>
                  <p className="text-zinc-400 text-sm mt-1">
                    {new Date(order.orderedDate).toLocaleDateString()}
                  </p>
                </div>

                <div
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${style.bg} ${style.text}`}
                >
                  {style.icon}
                  <span>{order.orderStatus}</span>
                </div>
              </div>

              <div className="space-y-4">
                {orderProducts?.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 border border-zinc-800 rounded-xl p-3"
                  >
                    <div className="w-32 h-28 overflow-hidden rounded-xl shrink-0">
                      <img
                        src={item.productData?.images}
                        alt={item.productData?.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">
                        {item.productData?.title}
                      </h3>

                      <p className="text-zinc-400 text-sm line-clamp-2 mt-1">
                        {item.productData?.description}
                      </p>

                      <div className="flex flex-wrap gap-5 mt-4 text-sm">
                        <p>
                          Quantity :
                          <span className="text-cyan-400 ml-1">
                            {item.quantity}
                          </span>
                        </p>

                        <p>
                          Price :
                          <span className="text-cyan-400 ml-1">
                            ₹{priceDiscounted(item.productData?.price, item.productData.discountPercentage )}
                          </span>
                        </p>

                        <p>
                          Payment method:
                          <span className="text-yellow-400 ml-1">
                            {order.orderMethod}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                  <MapPin size={15} />

                  <p>
                    {/* {order.shippingAddress.address.street},{" "}
                    {order.shippingAddress.address.state} */}
                  </p>
                </div>

                <div className="text-lg font-semibold text-cyan-400">
                  ₹{order.totalAmount}
                </div>
              </div>

              <div className="flex gap-3 mt-5">
                <button className="bg-cyan-500 hover:bg-cyan-400 text-black px-3 py-2 rounded-xl text-sm font-medium transition">
                  Details
                </button>

                <button className="border border-zinc-700 hover:border-cyan-400 px-3 py-2 rounded-xl text-sm transition">
                  Track
                </button>

                <button
                  disabled={isPending}
                  onClick={() => handleRemove(order.id)}
                  className="border border-zinc-700 hover:border-red-500 hover:text-red-400 px-3 py-2 rounded-xl text-sm transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
