export const handleOnlinePayment = ({
  Razorpay,
  orderData,
  mutation,
  navigate,
  toast,
}) => {
  const options = {
    key: "rzp_test_SmMxUHSNpRAev1",
    amount: orderData.totalAmount * 100,
    currency: "INR",
    name: "Aquora",
    description: "Online Payment",
    handler: function (response) {
      const finalOrder = {
        ...orderData,
        paymentId: response.razorpay_payment_id,
        paymentStatus: "PAID",
      };
      mutation.mutate(finalOrder, {
        onSuccess: (order) => {
          toast.success("Payment Successful");
          navigate("/success", {
            state: {
              id: order.id,
            },
          });
        },
        onError: (err) => {
          toast.error(err.message || "Error happened while ordering");
        },
      });
    },

    prefill: {
      name: orderData.shippingAddress.name,
      email: orderData.shippingAddress.email,
      contact: orderData.shippingAddress.phone,
    },

    theme: {
      color: "#3399cc",
    },
  };

  const razorpay = new Razorpay(options);

  razorpay.on("payment.failed", function (response) {
    console.log(response.error);

    toast.error(response.error.description);
  });

  razorpay.open();
};
