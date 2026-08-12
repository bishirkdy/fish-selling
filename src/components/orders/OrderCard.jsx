const OrderCard = ({
  order,
  item,
  status,
  payment,
  canCancel,
  isPending,
  setViewableData,
  setViewDetail,
  setTrackableData,
  setViewTrack,
  handleCancel,
}) => {
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

            <span className="font-medium">
              {status.label}
            </span>
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
              <p className="text-gray-400">
                Quantity
              </p>

              <p className="font-medium">
                {item.quantity}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Unit Price
              </p>

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
              <p className="text-gray-400">
                Total Amount
              </p>

              <p className="font-semibold text-green-400">
                ₹{Math.floor(item.totalPrice)}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Payment Method
              </p>

              <p className="font-medium">
                {order.paymentMethod}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Payment Status
              </p>

              <p className={`font-medium ${payment.color}`}>
                {payment.text}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Ordered On
              </p>

              <p className="font-medium">
                {new Date(
                  order.orderedAt
                ).toLocaleDateString()}
              </p>
            </div>

          </div>

          <div className="mt-6 flex flex-wrap gap-3">

            {/* View Details */}
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

            {/* Track Order */}
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

            {/* Cancel Order */}
            <button
              disabled={isPending || !canCancel}
              onClick={() =>
                handleCancel(
                  order.id,
                  item.productId
                )
              }
              className="px-5 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-red-500"
            >
              {isPending
                ? "Cancelling..."
                : item.orderStatus === "Cancelled"
                  ? "Cancelled"
                  : canCancel
                    ? "Cancel Order"
                    : "Order shipped. Cannot Cancel"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;