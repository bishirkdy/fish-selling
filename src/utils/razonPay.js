import { createOrderWithPayment, verifyPayment } from "../services/payment/paymentService";


export const handleOnlinePayment = async ({
  Razorpay,
  orderData,
  navigate,
  toast,
}) => {
  try {
    // Create Razorpay Order
    const payment = await createOrderWithPayment(orderData);

    const options = {
      key: payment.key,
      amount: payment.amount,
      currency: payment.currency,
      order_id: payment.razorpayOrderId,

      name: "Aquora",
      description: "Online Payment",

      handler: async function (response) {
        try {
          console.log(
            JSON.stringify(
              {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                order: orderData,
              },
              null,
              2,
            ),
          );
          const order = await verifyPayment({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            order: orderData,
          });

          toast.success("Payment Successful");

          navigate("/success", {
            state: {
              id: order.id,
            },
          });
        } catch (err) {
          toast.error(
            err.response?.data?.message || "Payment verification failed",
          );
        }
      },

      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new Razorpay(options);

    razorpay.on("payment.failed", function (response) {
      toast.error(response.error.description);
    });

    razorpay.open();
  } catch (err) {
    toast.error(err.response?.data?.message || "Unable to initiate payment");
    console.log(err);
  }
};
