const PaymentMethod = ({
  paymentType,
  addressIsPending,
  orderIsPending,
  handlePayment,
  grandTotal,
}) => {
  return (
    <div className="bg-(--color-surface) text-white p-8 flex flex-col justify-center">

      <h2 className="text-3xl font-bold mb-4">
        Payment Method
      </h2>

      <p className="text-gray-300 mb-8">
        Choose your preferred payment option
      </p>

      <div className="space-y-5">

        <button
          disabled={addressIsPending || orderIsPending}
          onClick={() => handlePayment("COD")}
          className="w-full bg-(--color-text) text-black py-3 rounded-lg font-semibold hover:bg-transparent hover:text-white hover:border hover:border-(--color-text) transition cursor-pointer"
        >
          {paymentType === "COD" &&
          (addressIsPending || orderIsPending)
            ? "Processing..."
            : "Cash On Delivery"}
        </button>

        <button
          disabled={addressIsPending || orderIsPending}
          onClick={() => handlePayment("ONLINE")}
          className="w-full bg-(--color-accent) py-3 rounded-lg font-semibold hover:bg-transparent hover:border hover:border-(--color-accent) transition cursor-pointer"
        >
          {paymentType === "ONLINE" &&
          (addressIsPending || orderIsPending)
            ? "Processing..."
            : "Pay Online With Razorpay"}
        </button>

      </div>

      <div className="mt-10 border-t border-gray-700 pt-5">

        <div className="flex justify-between mb-2">
          <span>Total</span>
          <span>₹ {Math.floor(grandTotal)}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-400">
          <span>Delivery</span>
          <span>Free</span>
        </div>

      </div>

    </div>
  );
};

export default PaymentMethod;