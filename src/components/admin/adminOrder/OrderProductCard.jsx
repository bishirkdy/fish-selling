const OrderProductCard = ({
  item,
  paymentStatus,
  isPending,
  statusStyle,
  orderStatusHandler,
}) => {
  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Image */}
        <img
          src={item?.productImage || "/no-image.png"}
          alt={item?.productName || "Product"}
          className="w-full sm:w-24 h-24 object-cover rounded-lg"
        />

        <div className="flex-1">
          {/* Name + Status */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
              <h3 className="font-semibold text-gray-800">
                {item?.productName || "Product Removed"}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Quantity: {item.quantity}
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${
                statusStyle[item.orderStatus]
              }`}
            >
              {item.orderStatus}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mt-3">
            <span className="font-semibold text-green-600">
              ₹{Math.floor(item.discountedPrice)}
            </span>

            {item.discountPercentage > 0 && (
              <span className="text-sm text-gray-400 line-through">
                ₹{Math.floor(item.originalPrice)}
              </span>
            )}
          </div>

          {/* Bottom */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs">
              Qty: {item.quantity}
            </span>

            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs">
              {paymentStatus || "Pending"}
            </span>

            <select
              disabled={isPending}
              value={item.orderStatus}
              onChange={(e) =>
                orderStatusHandler(
                  item.productId,
                  e.target.value
                )
              }
              className="px-3 py-2 text-sm rounded-lg border border-gray-300 outline-none"
            >
              <option value="OrderPlaced">Order Placed</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Packed">Packed</option>
              <option value="Shipping">Shipping</option>
              <option value="Shipped">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProductCard;