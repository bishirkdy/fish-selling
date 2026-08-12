import {OrderStatusStyle} from "../../../constants/orderStatusStyles"
const OrderProductCard = ({
  item,
  paymentStatus,
  isPending,
  orderStatusHandler,
}) => {
  return (
    <div className="rounded-3xl border border-gray-100 overflow-hidden">
      <div className="p-3 md:p-6">
        <div className="flex flex-col sm:flex-row gap-4">

          {/* Product Image */}
          <img
            src={item?.productImage || "/no-image.png"}
            alt={item?.productName || "Product"}
            className="w-full sm:w-28 h-48 sm:h-28 object-cover rounded-2xl"
          />

          <div className="flex-1">
            {/* Name + Status */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

              <h1 className="font-bold text-base md:text-lg text-gray-800">
                {item?.productName || "Product Removed"}
              </h1>

              <div className="flex flex-col gap-2">

                {/* Current Status */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${
                    OrderStatusStyle[item.orderStatus]
                  }`}
                >
                  {item.orderStatus}
                </span>

                {/* Change Status */}
                <select
                  disabled={isPending}
                  value={item.orderStatus}
                  onChange={(e) =>
                    orderStatusHandler(
                      item.productId,
                      e.target.value
                    )
                  }
                  className="px-3 py-2 rounded-xl border border-gray-300"
                >
                  <option value="OrderPlaced">
                    Order Placed
                  </option>

                  <option value="Confirmed">
                    Confirmed
                  </option>

                  <option value="Packed">
                    Packed
                  </option>

                  <option value="Shipping">
                    Shipping
                  </option>

                  <option value="Shipped">
                    Out For Delivery
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>
                </select>

              </div>
            </div>

            {/* Price / Quantity / Payment */}
            <div className="flex flex-wrap items-center gap-3 md:gap-5 mt-4">

              {/* Price */}
              <div className="flex items-center gap-2">

                <span className="font-bold text-green-600 text-lg">
                  ₹{Math.floor(item.discountedPrice)}
                </span>

                {item.discountPercentage > 0 && (
                  <span className="text-sm text-gray-400 line-through">
                    ₹{Math.floor(item.originalPrice)}
                  </span>
                )}

              </div>

              {/* Quantity */}
              <span className="px-3 py-1 rounded-full bg-gray-100 text-xs md:text-sm">
                Qty : {item.quantity}
              </span>

              {/* Payment Status */}
              <span className="px-3 py-1 rounded-full bg-blue-100 text-(--color-surface) text-xs md:text-sm">
                Payment : {paymentStatus}
              </span>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProductCard;