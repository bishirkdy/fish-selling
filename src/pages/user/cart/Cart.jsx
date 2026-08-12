import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartItem from "../../../components/cart/CartItem";
import CartFooter from "../../../components/cart/CartFooter";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "../../../redux/features/cartSlice";
import { useRemoveFromCart, useUpdateQuantity } from "../../../tanstack/hooks/mutations/cart/cartMutations";



const Cart = ({ closeCart, cart, grandTotal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    mutate: removeMutation,
    isPending: removeIsPending,
  } = useRemoveFromCart();

  const {
    mutate: quantityMutation,
    isPending: quantityUpdatePending,
  } = useUpdateQuantity();

  const removeHandler = (id) => {
    removeMutation(id, {
      onSuccess: () => {
        toast.success("Data removed from cart");
        dispatch(removeFromCart(id));
      },

      onError: (err) => {
        toast.error(
          err.message || "Failed to remove data"
        );
      },
    });
  };

  const quantityHandler = (
    type,
    cartItemId,
    quantity
  ) => {
    let updatedQuantity;

    if (type === "increment") {
      updatedQuantity = quantity + 1;
    } else {
      if (quantity <= 1) return;

      updatedQuantity = quantity - 1;
    }

    quantityMutation(
      {
        id: cartItemId,
        quantity: updatedQuantity,
      },
      {
        onSuccess: () => {
          if (type === "increment") {
            dispatch(increaseQuantity(cartItemId));
          } else {
            dispatch(decreaseQuantity(cartItemId));
          }
        },

        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  };

  const hasNoStock = cart?.some(
    (item) => item.quantity > item.availableStock
  );

  return (
    <div className="md:w-90 w-screen md:pl-0 pl-8 h-screen bg-(--color-surface) text-(--color-text) shadow-xl flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">

        <h2 className="text-lg font-semibold">
          Your Cart
        </h2>

        <button onClick={closeCart}>
          <X
            className="cursor-pointer hover:text-(--color-accent)"
          />
        </button>

      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">

        {cart?.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">
            Your cart is empty
          </p>
        ) : (
          cart.map((item) => (
            <CartItem
              key={item.cartItemId}
              item={item}
              removeHandler={removeHandler}
              quantityHandler={quantityHandler}
              removeIsPending={removeIsPending}
              quantityUpdatePending={quantityUpdatePending}
            />
          ))
        )}

      </div>

      {/* Footer */}
      <CartFooter
        cart={cart}
        grandTotal={grandTotal}
        hasNoStock={hasNoStock}
        closeCart={closeCart}
        navigate={navigate}
      />

    </div>
  );
};

export default Cart;