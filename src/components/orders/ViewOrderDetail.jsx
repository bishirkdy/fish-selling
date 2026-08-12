import {
  Clock,
  CircleX,
} from "lucide-react";

import { ORDER_STATUS as STATUS } from "../../constants/orderStatusWithIcon";

const ViewOrderDetail = ({ viewableData, setViewDetail }) => {
  const status = STATUS[viewableData?.orderStatus] ?? {
    label: viewableData?.orderStatus,
    icon: <Clock size={16} />,
    color: "text-gray-400",
    bg: "bg-gray-500/10",
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

      <div
        className="
          relative
          w-full
          max-w-5xl
          max-h-[92vh]
          overflow-y-auto
          rounded-3xl
          bg-(--color-surface)
          shadow-2xl
          p-6 md:p-8
          no-scrollbar
        "
      >

        {/* Close */}
        <button
          onClick={() => setViewDetail(false)}
          className="
            absolute
            right-5
            top-5
            w-10
            h-10
            rounded-full
            bg-(--color-background)
            text-gray-400
            flex
            items-center
            justify-center
            hover:bg-red-500
            hover:text-white
            transition
            cursor-pointer
          "
        >
          <CircleX size={21} />
        </button>


        {/* Product */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Image */}
          <div
            className="
              aspect-square
              rounded-2xl
              overflow-hidden
              bg-(--color-background)
            "
          >
            <img
              src={
                viewableData?.productImage ||
                "/no-image.png"
              }
              alt={viewableData?.productName}
              className="
                w-full
                h-full
                object-cover
                hover:scale-105
                transition
                duration-300
              "
            />
          </div>


          {/* Details */}
          <div className="lg:col-span-2">

            <h1 className="text-2xl md:text-3xl text-white tracking-tight">
              {viewableData?.productName}
            </h1>


            {/* Information */}
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 mt-7">

              {/* Quantity */}
              <div className="info-card">
                <p className="info-label">
                  Quantity
                </p>

                <p className="info-value text-(--color-primary)">
                  {viewableData?.quantity}
                </p>
              </div>


              {/* Unit Price */}
              <div className="info-card">
                <p className="info-label">
                  Unit Price
                </p>

                <p className="info-value text-(--color-primary)">
                  ₹{viewableData?.discountedPrice}
                </p>
              </div>


              {/* Total */}
              <div className="info-card">
                <p className="info-label">
                  Total Price
                </p>

                <p className="info-value text-green-400">
                  ₹{viewableData?.totalPrice}
                </p>
              </div>


              {/* Payment Method */}
              <div className="info-card">
                <p className="info-label">
                  Payment Method
                </p>

                <p className="mt-2 text-base text-white">
                  {viewableData?.paymentMethod}
                </p>
              </div>


              {/* Payment Status */}
              <div className="info-card">
                <p className="info-label">
                  Payment Status
                </p>

                <p className="mt-2 text-base text-yellow-400">
                  {viewableData?.paymentStatus}
                </p>
              </div>


              {/* Order Status */}
              <div className="info-card">
                <p className="info-label">
                  Order Status
                </p>

                <div
                  className={`
                    mt-3
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    px-3
                    py-1.5
                    text-sm
                    ${status.bg}
                    ${status.color}
                  `}
                >
                  {status.icon}

                  <span>
                    {status.label}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>


        {/* Divider */}
        <div className="my-8 border-t border-white/10" />


        {/* Shipping Address */}
        <section>

          <h2 className="text-xl text-(--color-primary) mb-5">
            Shipping Address
          </h2>


          <div className="rounded-2xl bg-(--color-background) p-5 md:p-6">

            <div className="divide-y divide-white/5">

              {/* Full Name */}
              <div className="flex justify-between items-center py-3 first:pt-0">
                <span className="text-sm text-gray-400">
                  Full Name
                </span>

                <span className="text-sm text-white text-right">
                  {viewableData?.shippingAddress?.fullName}
                </span>
              </div>


              {/* Phone */}
              <div className="flex justify-between items-center py-3">
                <span className="text-sm text-gray-400">
                  Phone
                </span>

                <span className="text-sm text-white">
                  {viewableData?.shippingAddress?.phoneNumber}
                </span>
              </div>


              {/* Street */}
              <div className="flex justify-between items-center py-3 gap-6">
                <span className="text-sm text-gray-400">
                  Street
                </span>

                <span className="text-sm text-white text-right">
                  {viewableData?.shippingAddress?.street}
                </span>
              </div>


              {/* Post */}
              <div className="flex justify-between items-center py-3">
                <span className="text-sm text-gray-400">
                  Post
                </span>

                <span className="text-sm text-white">
                  {viewableData?.shippingAddress?.post}
                </span>
              </div>


              {/* District */}
              <div className="flex justify-between items-center py-3">
                <span className="text-sm text-gray-400">
                  District
                </span>

                <span className="text-sm text-white">
                  {viewableData?.shippingAddress?.district}
                </span>
              </div>


              {/* State */}
              <div className="flex justify-between items-center py-3">
                <span className="text-sm text-gray-400">
                  State
                </span>

                <span className="text-sm text-white">
                  {viewableData?.shippingAddress?.state}
                </span>
              </div>


              {/* PIN */}
              <div className="flex justify-between items-center py-3">
                <span className="text-sm text-gray-400">
                  PIN Code
                </span>

                <span className="text-sm text-white">
                  {viewableData?.shippingAddress?.pincode}
                </span>
              </div>


              {/* Landmark */}
              <div className="flex justify-between items-start py-3 last:pb-0 gap-6">
                <span className="text-sm text-gray-400">
                  Landmark
                </span>

                <span className="text-sm text-white text-right max-w-sm">
                  {viewableData?.shippingAddress?.landmark || "N/A"}
                </span>
              </div>

            </div>

          </div>

        </section>

      </div>


      {/* Reusable card styles */}
      <style>
        {`
          .info-card {
            border-radius: 1rem;
            background: var(--color-background);
            padding: 1rem;
          }

          .info-label {
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #6b7280;
          }

          .info-value {
            margin-top: 0.5rem;
            font-size: 1.25rem;
          }
        `}
      </style>

    </div>
  );
};

export default ViewOrderDetail;