import React, { useState } from "react";
import {
  useAddOrders,
} from "../tanstack/hooks/mutations/orderMutation";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetProductById } from "../tanstack/hooks/queries/productQueries";
import { useRazorpay } from "react-razorpay";
import { handleOnlinePayment } from "../utils/razonPay";
import { priceDiscounted } from "../utils/priceDescounted";
import { usePostAnalysis } from "../tanstack/hooks/mutations/analisysMutation";
import { useAddShippingAddress } from "../tanstack/hooks/mutations/shippingAddress";
import { useSelector } from "react-redux";

const Payment = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      street: "",
      post: "",
      district: "",
      state: "",
      pincode: "",
      landmark: "",
    },
  });
  const {user} = useSelector(s => s.auth);
  const [shippingId, setShippingId] = useState("");
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { Razorpay } = useRazorpay();
  const { data: product } = useGetProductById(id);
  const orderMutation = useAddOrders();
  const { mutate: analysisMutate, isPending: analysisIsPending } = usePostAnalysis();
  const { mutate: addressMutate, isPending: addressPending } =
    useAddShippingAddress();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [field]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address.street ||
      !formData.address.district ||
      !formData.address.state ||
      !formData.address.pincode
    ) {
      toast.error("Please fill all required fields");
      return false;
    }
    return true;
  };

  const handlePayment = (type) => {
    if (!validateForm()) return;
    const addressData = {
      user: user?.id,
      ...formData,
    };

    addressMutate(addressData, {
      onSuccess: (data) => {
        const orderData = {
          user: user.id,
          shippingAddress: data.id,
          products: state?.items?.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            paymentStatus: type === "COD" ? "PENDING" : "PAID",
            orderStatus: "Order Placed",
          })),

          orderMethod: type === "COD" ? "CASH" : "RAZOR PAY",
          totalAmount: state?.total,
          orderedDate: Date.now(),
          id: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        };

        const analysisObj = {
          user: user?.id,
          total: state?.total,
          profit: Math.round((state.total * 15) / 100),
          paymentMethod: type,
          products: state?.items.map(p => ({
            productId : p.productId,
            quantity : p.quantity
          })),
          date: Date.now(),
        };
        analysisMutate(analysisObj);

        if (type === "COD") {
          orderMutation.mutate(orderData, {
            onSuccess: (order) => {
              toast.success("Order placed successfully");

              navigate("/success", {
                state: {
                  id: order.id,
                },
              });
            },

            onError: (err) => {
              toast.error(err.message || "Error while ordering");
            },
          });
        } else {
          handleOnlinePayment({
            Razorpay,
            orderData,
            mutation: orderMutation,
            navigate,
            toast,
          });
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
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg outline-none"
            />

            <input
              type="text"
              name="address.street"
              placeholder="Street / Area / Locality"
              value={formData.address.street}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg outline-none"
            />

            <input
              type="text"
              name="address.post"
              placeholder="Post Office"
              value={formData.address.post}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg outline-none"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="address.district"
                placeholder="District"
                value={formData.address.district}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg outline-none"
              />

              <input
                type="text"
                name="address.state"
                placeholder="State"
                value={formData.address.state}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="address.pincode"
                placeholder="PIN Code"
                value={formData.address.pincode}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg outline-none"
              />

              <input
                type="text"
                name="address.landmark"
                placeholder="Landmark"
                value={formData.address.landmark}
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
              onClick={() => handlePayment("COD")}
              className="w-full bg-(--color-text) text-black py-3 rounded-lg font-semibold hover:bg-transparent hover:text-white hover:border hover:border-(--color-text) transition cursor-pointer"
            >
              Cash On Delivery
            </button>
            <button
              onClick={() => handlePayment("ONLINE")}
              className="w-full bg-(--color-accent) py-3 rounded-lg font-semibold hover:bg-transparent hover:border hover:border-(--color-accent) transition cursor-pointer"
            >
              Pay Online With Razorpay
            </button>
          </div>

          <div className="mt-10 border-t border-gray-700 pt-5">
            <div className="flex justify-between mb-2">
              <span>Total</span>
              <span>₹ {state.total}</span>
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
