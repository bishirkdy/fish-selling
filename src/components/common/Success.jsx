import React from "react";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetLatestOrder } from "../../tanstack/hooks/queries/order/orderQueries";
import Loader from "./Loader";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading } = useGetLatestOrder(location?.state?.id);
  
  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-(--color-background) flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  // if (!data) {
  //   navigate("/");
  // }
  return (
    <div className="min-h-screen bg-(--color-background) flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-(--color-surface) border border-white/10 rounded-3xl p-8 text-center shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-green-500/15 flex items-center justify-center border border-green-500/20">
            <CheckCircle2 className="w-14 h-14 text-green-500" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">
          Payment Successful
        </h1>

        <p className="text-gray-400 leading-relaxed mb-8">
          Your payment has been completed successfully. Your order is now being
          processed and will be shipped soon
        </p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8">
          <div className="flex items-center justify-between text-sm mb-3">
            <span className="text-gray-400">Payment Method</span>
            <span className="text-green-400 font-semibold">
              {data.orderMethod}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Delivery</span>
            <span className="text-white font-medium">Estimated 3-5 Days</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate(`/orders/${data.user}`)}
            className="flex-1 bg-white/10 hover:bg-white/15 text-white py-3 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag size={18} />
            View Orders
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-(--color-primary) hover:opacity-80 text-white py-3 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            Continue Shopping
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
