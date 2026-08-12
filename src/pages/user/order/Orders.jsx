import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {ORDER_STATUS as STATUS} from "../../../constants/orderStatusWithIcon";
import Loader from "../../../components/common/Loader";
import OrderCard from "../../../components/orders/OrderCard";
import ViewOrderDetail from "../../../components/orders/ViewOrderDetail";
import TrackOrderDetail from "../../../components/orders/TrackOrderDetail";
import {PAYMENT_STATUS} from "../../../constants/paymentStatus"
import {
  useRemoveUserById,
} from "../../../tanstack/hooks/mutations/order/orderMutations";

import {
  useGetAllOrdersOfUser,
} from "../../../tanstack/hooks/queries/order/orderQueries";
import { ShoppingBag } from "lucide-react";


const Orders = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [viewDetail, setViewDetail] = useState(false);
  const [viewTrack, setViewTrack] = useState(false);

  const [viewableData, setViewableData] = useState(null);
  const [trackableData, setTrackableData] = useState(null);

  const {
    data = [],
    isLoading,
  } = useGetAllOrdersOfUser();

  const {
    mutate: cancelOrder,
    isPending,
  } = useRemoveUserById();


  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-(--color-background)">
        <Loader />
      </div>
    );
  }


  if (data.length === 0) {
    return (
      <div className="min-h-screen bg-(--color-background) text-white flex flex-col items-center justify-center">

        <ShoppingBag
          size={60}
          className="text-green-500 mb-4"
        />

        <h1 className="text-2xl font-bold">
          No Orders Yet
        </h1>

        <button
          onClick={() => navigate("/")}
          className="mt-5 bg-(--color-accent) px-5 py-2 rounded-lg"
        >
          Continue Shopping
        </button>

      </div>
    );
  }


  const handleCancel = (orderId, productId) => {
    cancelOrder(
      {
        orderId,
        productId,
      },
      {
        onSuccess: () => {
          toast.success("Order cancelled");

          queryClient.invalidateQueries({
            queryKey: ["user-orders"],
          });
        },
      }
    );
  };


  return (
    <div className="min-h-screen bg-(--color-background) text-white pt-24 pb-16 px-3">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          My Orders
        </h1>


        <div className="space-y-5">

          {data.map((order) =>
            order.items.map((item) => {

              const status = STATUS[item.orderStatus] ?? {
                label: item.orderStatus,
                icon: <Clock size={14} />,
                bg: "bg-gray-500/10",
                text: "text-gray-400",
              };


              const paymentStatus =
                item.refunded &&
                order.paymentMethod === "Cash" &&
                item.orderStatus === "Cancelled"
                  ? "Cancelled"
                  : item.refunded &&
                    order.paymentMethod === "Razorpay" &&
                    item.orderStatus === "Cancelled"
                    ? "Refunded"
                    : order.paymentStatus;


              const payment =
                PAYMENT_STATUS[paymentStatus] ?? {
                  text: paymentStatus,
                  color: "text-gray-400",
                };


              const canCancel =
                item.orderStatus === "OrderPlaced" ||
                item.orderStatus === "Confirmed";


              return (
                <OrderCard
                  key={`${order.id}-${item.productId}`}
                  order={order}
                  item={item}
                  status={status}
                  payment={payment}
                  canCancel={canCancel}
                  isPending={isPending}
                  setViewableData={setViewableData}
                  setViewDetail={setViewDetail}
                  setTrackableData={setTrackableData}
                  setViewTrack={setViewTrack}
                  handleCancel={handleCancel}
                />
              );

            })
          )}

        </div>

      </div>


      {/* Order Details */}

      {viewDetail && (
        <ViewOrderDetail
          viewableData={viewableData}
          setViewDetail={setViewDetail}
        />
      )}


      {/* Track Order */}

      {viewTrack && (
        <TrackOrderDetail
          data={trackableData}
          setViewTrack={() => setViewTrack(false)}
        />
      )}

    </div>
  );
};


export default Orders;