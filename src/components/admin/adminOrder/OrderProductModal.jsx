import { CircleX } from "lucide-react";
import OrderProductCard from "./OrderProductCard";

const OrderProductModal = ({
  order,
  onClose,
  isPending,
  orderStatusHandler,
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-5xl max-h-[95vh] rounded-3xl shadow-2xl overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Order Products</h1>

            <p className="text-gray-500 text-sm mt-1">
              Total Products : {order.items?.length ?? 0}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition cursor-pointer"
          >
            <CircleX />
          </button>
        </div>

        {/* Customer Details */}
        <div className="border-b bg-gray-50 p-6">
          <h2 className="font-bold text-lg text-gray-800 mb-4">
            Customer Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm text-gray-700">
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Name :</span>{" "}
                {order.shippingAddress?.fullName}
              </p>

              <p>
                <span className="font-semibold">Phone :</span>{" "}
                {order.shippingAddress?.phoneNumber}
              </p>

              <p>
                <span className="font-semibold">Email :</span>{" "}
                {order.shippingAddress?.email}
              </p>
            </div>

            <div className="space-y-2">
              <p>
                {order.shippingAddress?.street}, {order.shippingAddress?.post},{" "}
                {order.shippingAddress?.district},{" "}
                {order.shippingAddress?.state}
              </p>

              <p>Pincode : {order.shippingAddress?.pincode}</p>

              <p>Landmark : {order.shippingAddress?.landmark}</p>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="p-3 md:p-6 space-y-6">
          {order.items?.map((item) => {
            let paymentStatus = order.paymentStatus;

            if (
              item.orderStatus === "Delivered" &&
              order.paymentMethod === "Cash"
            ) {
              paymentStatus = "Paid";
            }

            if (item.orderStatus === "Cancelled") {
              if (order.paymentMethod === "Cash") {
                paymentStatus = "Cancelled";
              } else if (item.refunded) {
                paymentStatus = "Refunded";
              }
            }

            return (
              <OrderProductCard
                key={item.productId}
                item={item}
                paymentStatus={paymentStatus}
                isPending={isPending}
                orderStatusHandler={orderStatusHandler}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderProductModal;
