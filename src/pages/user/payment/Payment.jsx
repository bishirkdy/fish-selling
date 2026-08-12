import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRazorpay } from "react-razorpay";
import { useQueryClient } from "@tanstack/react-query";

import { handleOnlinePayment } from "../../../utils/razonPay";

import {
  useAddShippingAddress,
} from "../../../tanstack/hooks/mutations/address/shippingAddressMutations";

import {
  useAddOrders,
} from "../../../tanstack/hooks/mutations/order/orderMutations";

import {
  useGetLastUsedAddress,
} from "../../../tanstack/hooks/queries/address/addressQueries";

import Loader from "../../../components/common/Loader";

import DeliveryDetails from "../../../components/payment/DeliveryDetails";
import PaymentMethod from "../../../components/payment/PaymentMethod";


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

  const {
    data: lastUsedAddress,
    isLoading,
  } = useGetLastUsedAddress();

  const {
    mutate: orderMutation,
    isPending: orderIsPending,
  } = useAddOrders();

  const {
    mutate: addressMutate,
    isPending: addressIsPending,
  } = useAddShippingAddress();

  const client = useQueryClient();


  useEffect(() => {
    if (!lastUsedAddress) return;

    setFormData({
      name: lastUsedAddress.fullName || "",
      email: lastUsedAddress.email || "",
      phone: lastUsedAddress.phoneNumber || "",
      street: lastUsedAddress.street || "",
      post: lastUsedAddress.post || "",
      district: lastUsedAddress.district || "",
      state: lastUsedAddress.state || "",
      pincode: lastUsedAddress.pincode || "",
      landmark: lastUsedAddress.landmark || "",
    });
  }, [lastUsedAddress]);


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

          paymentMethod:
            type === "COD"
              ? "Cash"
              : "RazorPay",

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
              toast.success(
                "Order placed successfully"
              );
              
              navigate("/shop") 
            },

            onError: (err) => {
              toast.error(
                err.message ||
                "Failed to place order"
              );
            },

          });

        } else {

          try {

            handleOnlinePayment({
              Razorpay,
              orderData,
              navigate,
              toast,
              client,
            });

          } catch (error) {

            toast.error(error.message);

          }

        }

      },

      onError: (err) => {
        toast.error(
          err.message ||
          "Failed to save address"
        );
      },

    });
  };


  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-(--color-background)">
        <Loader />
      </div>
    );
  }


  return (
    <div className="min-h-screen pt-24 md:pt-4 bg-(--color-background) flex justify-center items-center p-5">

      <div className="w-full max-w-5xl bg-(--color-text) rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        <DeliveryDetails
          formData={formData}
          handleChange={handleChange}
        />

        <PaymentMethod
          paymentType={paymentType}
          addressIsPending={addressIsPending}
          orderIsPending={orderIsPending}
          handlePayment={handlePayment}
          grandTotal={state.grandTotal}
        />

      </div>

    </div>
  );
};

export default Payment;