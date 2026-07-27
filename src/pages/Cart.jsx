import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../redux/features/cartSlice";
import {
  useRemoveFromCart,
  useUpdateQuantity,
} from "../tanstack/hooks/mutations/cartMutation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Cart = ({ closeCart, cart , grandTotal}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const removeMutation = useRemoveFromCart();
  const quantityMutation = useUpdateQuantity();

  
  function removeHandler(id) {
    removeMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Data removed from cart");
        dispatch(removeFromCart(id));
      },
      onError: (err) => {
        toast.error(`${err.message || "Failed to remove data"}`);
      },
    });
  }

  function quantityHandler(type, cartItemId, quantity) {
    let updatedQuantity;

    if (type === "increment") {
      updatedQuantity = quantity + 1;
      dispatch(increaseQuantity(cartItemId));
    }
    if (type === "decrement") {
      if (quantity <= 1) return;
      updatedQuantity = quantity - 1;
      dispatch(decreaseQuantity(cartItemId));
    }

    quantityMutation.mutate({
      id: cartItemId,
      quantity: updatedQuantity,
    });
  }
  return (
    <div className="md:w-90 w-screen md:pl-0 pl-8 h-screen bg-(--color-surface)  text-(--color-text) shadow-xl flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button onClick={closeCart}>
          <X className="cursor-pointer hover:text-(--color-accent)" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {cart?.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">Your cart is empty</p>
        ) : (
          cart?.map((item) => (
            <div key={item.id} className="flex gap-3 bg-white/5 p-3 rounded-lg">
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
                  ₹
                  {Math.round(
                    item.price - (item.price * item.discountPercentage) / 100,
                  )}{" "}
                  × {item.quantity || 1}
                </p>

                <p className="text-sm font-bold mt-1">
                  ₹
                  {Math.round(
                    item.price - (item.price * item.discountPercentage) / 100,
                  ) * item.quantity || 1}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2 justify-between">
                <X
                  onClick={() => removeHandler(item.cartItemId)}
                  className="text-red-400 cursor-pointer text-xs"
                ></X>

                <div className="flex items-center gap-2 bg-white/10 rounded-md px-2 py-1">
                  <button
                    onClick={() =>
                      quantityHandler(
                        "decrement",
                        item.cartItemId,
                        item.quantity,
                      )
                    }
                    className="text-sm font-bold px-2 hover:text-(--color-accent) cursor-pointer"
                  >
                    -
                  </button>

                  <span className="text-sm min-w-5 text-center">
                    {item.quantity || 1}
                  </span>

                  <button
                    onClick={() =>
                      quantityHandler(
                        "increment",
                        item.cartItemId,
                        item.quantity,
                      )
                    }
                    className="text-sm font-bold px-2 hover:text-(--color-accent) cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 mb-4 border-t border-white/10 flex flex-col gap-3">
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>₹{grandTotal}</span>
        </div>
        <button
          disabled={cart?.length === 0}
          onClick={() => {
            closeCart();
            navigate("/payment/cart", {
              state: {
                items: cart,
                grandTotal,
              },
            });
          }}
          className="bg-(--color-accent) cursor-pointer py-2 rounded-lg font-semibold"
        >
          Buy now
        </button>
      </div>
    </div>
  );
};

export default Cart;
