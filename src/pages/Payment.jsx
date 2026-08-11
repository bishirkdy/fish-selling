import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRazorpay } from "react-razorpay";
import { handleOnlinePayment } from "../utils/razonPay";
import { useAddShippingAddress } from "../tanstack/hooks/mutations/address/shippingAddressMutations";
import { useAddOrders } from "../tanstack/hooks/mutations/order/orderMutations";
import { useQueryClient } from "@tanstack/react-query";

const Payment = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    post: "",
    district: "",
    state: "",
    pincode: "",
    landmark: "",
  });
  const [paymentType, setPaymentType] = useState(null);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { Razorpay } = useRazorpay();
  const { mutate: orderMutation, isPending: orderIsPending } = useAddOrders();
  const { mutate: addressMutate, isPending: addressIsPending } = useAddShippingAddress();
  const client = useQueryClient();

  useEffect(() => {
    if (!state) {
      navigate("/");
      toast.error("No order found.");
    }
  }, [state, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.street ||
      !formData.district ||
      !formData.state ||
      !formData.pincode
    ) {
      toast.error("Please fill all required fields");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email");
      return false;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Phone number must contain 10 digits");
      return false;
    }

    return true;
  };

  const handlePayment = (type) => {
    if (!validateForm()) return;

    const addressData = {
      ...formData,
      fullName: formData.name,
      PhoneNumber: formData.phone,
    };

    addressMutate(addressData, {
      onSuccess: (address) => {
        setPaymentType(null);
        const orderData = {
          addressId: address.id,
          paymentMethod: type === "COD" ? "Cash" : "RazorPay",
          items: state.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        };

        if (type === "COD") {
          orderMutation(orderData, {
            onSuccess: (order) => {
              client.invalidateQueries({
                queryKey: ["cart"],
              });
              setPaymentType(null);
              toast.success("Order placed successfully");

              navigate("/success", {
                state: {
                  id: order.id,
                },
              });
            },

            onError: (err) => {
              toast.error(err.message || "Failed to place order");
            },
          });
        } else {
          try {
            handleOnlinePayment({
              Razorpay,
              orderData,
              navigate,
              toast,
              client
            });
          } catch (error) {
            toast.error(error.message);
          }
        }
      },

      onError: (err) => {
        toast.error(err.message || "Failed to save address");
      },
    });
  };

  return (
    <div className="min-h-screen pt-24 md:pt-4 bg-(--color-background) flex justify-center items-center p-5">
      <div className="w-full max-w-5xl bg-(--color-text) rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-(--color-surface) mb-6">
            Delivery Details
          </h2>
          <div className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg outline-none"
            />

            <input
              type="tel"
              maxLength={10}
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg outline-none"
            />

            <input
              type="text"
              name="street"
              placeholder="Street / Area / Locality"
              value={formData.street}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg outline-none"
            />

            <input
              type="text"
              name="post"
              placeholder="Post Office"
              value={formData.post}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg outline-none"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="district"
                placeholder="District"
                value={formData.district}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg outline-none"
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                maxLength={6}
                name="pincode"
                placeholder="PIN Code"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg outline-none"
              />

              <input
                type="text"
                name="landmark"
                placeholder="Landmark"
                value={formData.landmark}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-(--color-surface) text-white p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Payment Method</h2>

          <p className="text-gray-300 mb-8">
            Choose your preferred payment option
          </p>

          <div className="space-y-5">
            <button
              disabled={addressIsPending || orderIsPending}
              onClick={() => handlePayment("COD")}
              className="w-full bg-(--color-text) text-black py-3 rounded-lg font-semibold hover:bg-transparent hover:text-white hover:border hover:border-(--color-text) transition cursor-pointer"
            >
              {paymentType === "COD" && (addressIsPending || orderIsPending)
                ? "Processing..."
                : "Cash On Delivery"}
            </button>
            <button
              disabled={addressIsPending || orderIsPending}
              onClick={() => handlePayment("ONLINE")}
              className="w-full bg-(--color-accent) py-3 rounded-lg font-semibold hover:bg-transparent hover:border hover:border-(--color-accent) transition cursor-pointer"
            >
              {paymentType === "ONLINE" && (addressIsPending || orderIsPending)
                ? "Processing..."
                : "Pay Online With Razorpay"}
            </button>
          </div>

          <div className="mt-10 border-t border-gray-700 pt-5">
            <div className="flex justify-between mb-2">
              <span>Total</span>
              <span>₹ {Math.floor(state.grandTotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Delivery</span>
              <span>Free</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
