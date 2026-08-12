const CartFooter = ({
  cart,
  grandTotal,
  hasNoStock,
  closeCart,
  navigate,
}) => {
  const handleBuyNow = () => {
    closeCart();

    navigate("/payment/cart", {
      state: {
        items: cart,
        grandTotal,
      },
    });
  };

  return (
    <div className="p-4 mb-4 border-t border-white/10 flex flex-col gap-3">

      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span>₹{grandTotal}</span>
      </div>

      <button
        disabled={cart?.length === 0 || hasNoStock}
        onClick={handleBuyNow}
        className="bg-(--color-accent) cursor-pointer py-2 rounded-lg font-semibold disabled:cursor-not-allowed disabled:opacity-50"
      >
        {hasNoStock ? "Update Cart Quantity" : "Buy now"}
      </button>

    </div>
  );
};

export default CartFooter;