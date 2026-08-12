import { X } from "lucide-react";

const CartItem = ({
  item,
  removeHandler,
  quantityHandler,
  removeIsPending,
  quantityUpdatePending,
}) => {
  return (
    <div className="flex gap-3 bg-white/5 p-3 rounded-lg">

      <img
        src={item.imageUrl ?? null}
        alt={item.title}
        className="w-16 h-16 object-cover rounded-md"
      />

      <div className="flex flex-col flex-1">
        <h3 className="text-sm font-semibold line-clamp-1">
          {item.title}
        </h3>

        <p className="text-xs text-gray-400">
          ₹{item.discountedPrice} × {item.quantity || 1}
        </p>

        <p className="text-sm font-bold mt-1">
          ₹{item.totalPrice}
        </p>

        {item.quantity > item.availableStock && (
          <p className="text-xs text-red-400 mt-1">
            Only {item.availableStock} available.
          </p>
        )}
      </div>

      <div className="flex flex-col items-end gap-2 justify-between">

        {/* Remove */}
        <button
          disabled={removeIsPending}
          onClick={() => removeHandler(item.cartItemId)}
          className="text-red-400 cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Quantity */}
        <div className="flex items-center gap-2 bg-white/10 rounded-md px-2 py-1">

          <button
            disabled={quantityUpdatePending}
            onClick={() =>
              quantityHandler(
                "decrement",
                item.cartItemId,
                item.quantity
              )
            }
            className="text-sm font-bold px-2 hover:text-(--color-accent) cursor-pointer disabled:opacity-50"
          >
            -
          </button>

          <span className="text-sm min-w-5 text-center">
            {item.quantity || 1}
          </span>

          <button
            disabled={quantityUpdatePending}
            onClick={() =>
              quantityHandler(
                "increment",
                item.cartItemId,
                item.quantity
              )
            }
            className="text-sm font-bold px-2 hover:text-(--color-accent) cursor-pointer disabled:opacity-50"
          >
            +
          </button>

        </div>
      </div>
    </div>
  );
};

export default CartItem;