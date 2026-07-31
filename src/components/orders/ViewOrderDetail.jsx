import {
  CircleX,
  Clock,
  CheckCircle,
  ShoppingBag,
  Truck,
  MapPin,
  XCircle,
} from "lucide-react";
import React from "react";
import { priceDiscounted } from "../../utils/priceDescounted";

const STATUS = {
  OrderPlaced: {
    label: "Order Placed",
    icon: <Clock size={18} />,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  Confirmed: {
    label: "Confirmed",
    icon: <CheckCircle size={18} />,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  Packed: {
    label: "Packed",
    icon: <ShoppingBag size={18} />,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  Shipping: {
    label: "Shipping",
    icon: <Truck size={18} />,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  Shipped: {
    label: "Out For Delivery",
    icon: <MapPin size={18} />,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  Delivered: {
    label: "Delivered",
    icon: <CheckCircle size={18} />,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  Cancelled: {
    label: "Cancelled",
    icon: <XCircle size={18} />,
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
};

const ViewOrderDetail = ({ viewableData, setViewDetail }) => {
  const status = STATUS[viewableData?.orderStatus] ?? {
    label: viewableData?.orderStatus,
    icon: <Clock size={18} />,
    color: "text-gray-400",
    bg: "bg-gray-500/10",
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="
        relative
        w-full
        max-w-5xl
        max-h-[92vh]
        overflow-y-auto
        rounded-3xl
        border
        border-(--color-tertiary)
        bg-(--color-surface)
        shadow-2xl
        p-8
        no-scrollbar
      "
      >
        <button
          onClick={() => setViewDetail(false)}
          className="
          absolute
          right-6
          top-6
          w-10
          h-10
          rounded-full
          bg-(--color-background)
          flex
          items-center
          justify-center
          hover:bg-red-500
          hover:text-white
          transition
        "
        >
          <CircleX size={22} />
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div
            className="
            aspect-square
            rounded-2xl
            overflow-hidden
            border
            border-(--color-tertiary)
            bg-(--color-background)
            shadow-lg
          "
          >
            <img
              src={viewableData?.productImage || "/no-image.png"}
              alt={viewableData?.productName}
              className="
              w-full
              h-full
              object-cover
              hover:scale-105
              transition
              duration-300
            "
            />
          </div>

          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-white">
              {viewableData?.productName}
            </h1>

            <p className="mt-3 text-gray-400 leading-relaxed">
              Premium quality product ordered from our store.
            </p>

            <div className="grid grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
              <div className="rounded-xl border border-(--color-tertiary) bg-(--color-background) p-5">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Quantity
                </p>

                <h2 className="text-2xl font-bold mt-2 text-(--color-primary)">
                  {viewableData?.quantity}
                </h2>
              </div>

              <div className="rounded-xl border border-(--color-tertiary) bg-(--color-background) p-5">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Unit Price
                </p>

                <h2 className="text-2xl font-bold mt-2 text-(--color-primary)">
                  ₹
                  {priceDiscounted(
                    viewableData?.price,
                    viewableData?.discount
                  )}
                </h2>
              </div>

              <div className="rounded-xl border border-(--color-tertiary) bg-(--color-background) p-5">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Total Price
                </p>

                <h2 className="text-2xl font-bold mt-2 text-green-400">
                  ₹{viewableData?.totalPrice}
                </h2>
              </div>

              <div className="rounded-xl border border-(--color-tertiary) bg-(--color-background) p-5">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Payment Method
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  {viewableData?.paymentMethod}
                </h2>
              </div>

              <div className="rounded-xl border border-(--color-tertiary) bg-(--color-background) p-5">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Payment Status
                </p>

                <h2 className="text-2xl font-bold mt-2 text-yellow-400">
                  {viewableData?.paymentStatus}
                </h2>
              </div>

              <div className="rounded-xl border border-(--color-tertiary) bg-(--color-background) p-5">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Order Status
                </p>

                <div
                  className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 ${status.bg} ${status.color}`}
                >
                  {status.icon}
                  <span className="font-semibold">
                    {status.label}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-8 border-t border-(--color-tertiary)" />

        <section>
          <h2 className="text-2xl font-bold text-(--color-primary) mb-6">
            Order Information
          </h2>

          <div className="grid lg:grid-cols-3 gap-5">
            <div className="rounded-2xl border border-(--color-tertiary) bg-(--color-background) p-5">
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Order ID
              </p>

              <h3 className="mt-3 break-all text-sm font-medium">
                {viewableData?.orderId}
              </h3>
            </div>

            <div className="rounded-2xl border border-(--color-tertiary) bg-(--color-background) p-5">
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Ordered On
              </p>

              <h3 className="mt-3 text-lg font-semibold">
                {new Date(viewableData?.orderedAt).toLocaleDateString()}
              </h3>
            </div>

            <div className="rounded-2xl border border-(--color-tertiary) bg-(--color-background) p-5">
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Total Amount
              </p>

              <h3 className="mt-3 text-3xl font-bold text-(--color-primary)">
                ₹{viewableData?.totalAmount}
              </h3>
            </div>
          </div>
        </section>

        <div className="my-8 border-t border-(--color-tertiary)" />

        <section>
          <h2 className="text-2xl font-bold text-(--color-primary) mb-6">
            Shipping Address
          </h2>

          <div className="rounded-2xl border border-(--color-tertiary) bg-(--color-background) p-6">
            <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-(--color-tertiary) pb-3">
                <span className="text-gray-400">Full Name</span>

                <span className="font-medium">
                  {viewableData?.shippingAddress?.fullName}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-(--color-tertiary) pb-3">
                <span className="text-gray-400">Phone</span>

                <span className="font-medium">
                  {viewableData?.shippingAddress?.phoneNumber}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-(--color-tertiary) pb-3">
                <span className="text-gray-400">Street</span>

                <span className="font-medium text-right">
                  {viewableData?.shippingAddress?.street}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-(--color-tertiary) pb-3">
                <span className="text-gray-400">Post</span>

                <span className="font-medium">
                  {viewableData?.shippingAddress?.post}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-(--color-tertiary) pb-3">
                <span className="text-gray-400">District</span>

                <span className="font-medium">
                  {viewableData?.shippingAddress?.district}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-(--color-tertiary) pb-3">
                <span className="text-gray-400">State</span>

                <span className="font-medium">
                  {viewableData?.shippingAddress?.state}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-(--color-tertiary) pb-3">
                <span className="text-gray-400">PIN Code</span>

                <span className="font-medium">
                  {viewableData?.shippingAddress?.pincode}
                </span>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-gray-400">Landmark</span>

                <span className="font-medium text-right max-w-sm">
                  {viewableData?.shippingAddress?.landmark || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ViewOrderDetail;