import {
  CheckCircle,
  Clock,
  Package,
  Truck,
  MapPin,
  CircleX,
} from "lucide-react";

const TrackOrderDetail = ({ setViewTrack, data }) => {
const isCancelled = data?.orderStatus === "Cancelled";
const trackingSteps = [
  {
    title: "Order Placed",
    description: "Your order has been placed successfully.",
    icon: <Clock size={18} />,
    completed: !!data?.orderedAt,
    time: data?.orderedAt
      ? new Date(data.orderedAt).toLocaleString()
      : "",
  },

  {
    title: "Confirmed",
    description: "Seller confirmed your order.",
    icon: <CheckCircle size={18} />,
    completed: !!data?.confirmedAt,
    time: data?.confirmedAt
      ? new Date(data.confirmedAt).toLocaleString()
      : "",
  },

  {
    title: "Packed",
    description: "Your package has been packed.",
    icon: <Package size={18} />,
    completed: !!data?.packedAt,
    time: data?.packedAt
      ? new Date(data.packedAt).toLocaleString()
      : "",
  },

  {
    title: "Shipping",
    description: "Courier picked up your package.",
    icon: <Truck size={18} />,
    completed: !!data?.shippingAt,
    time: data?.shippingAt
      ? new Date(data.shippingAt).toLocaleString()
      : "",
  },

  {
    title: "Out For Delivery",
    description: "Delivery partner is on the way.",
    icon: <MapPin size={18} />,
    completed: !!data?.outForDeliveryAt,
    time: data?.outForDeliveryAt
      ? new Date(data.outForDeliveryAt).toLocaleString()
      : "",
  },

  {
    title: isCancelled ? "Cancelled" : "Delivered",
    description: isCancelled
      ? "Your order has been cancelled."
      : "Package delivered successfully.",
    icon: isCancelled ? <CircleX size={18} /> : <CheckCircle size={18} />,
    completed: isCancelled
      ? !!data?.cancelledAt
      : !!data?.deliveredAt,
    time: isCancelled
      ? data?.cancelledAt
        ? new Date(data.cancelledAt).toLocaleString()
        : ""
      : data?.deliveredAt
        ? new Date(data.deliveredAt).toLocaleString()
        : "",
  },
];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-3 py-5">
      <div className="w-full max-w-2xl bg-(--color-background) border border-(--color-tertiary) rounded-3xl p-5 sm:p-7 relative overflow-y-auto no-scrollbar max-h-[90vh]">
        <button
          onClick={setViewTrack}
          className="absolute cursor-pointer top-4 right-4 w-9 h-9 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center"
        >
          <CircleX className="text-red-500 hover:text-red-600" />
        </button>

        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold">Order Tracking</h1>

          <p className="text-zinc-400 mt-2 text-sm">
            Track your order progress in real time.
          </p>
        </div>

        <div className="relative">
          {trackingSteps.map((step, index) => (
            <div key={index} className="flex gap-4 relative pb-10 last:pb-0">
              {index !== trackingSteps.length - 1 && (
                <div
                  className={`absolute left-4.75 top-10 w-1 h-full ${
                    isCancelled
                      ? "bg-red-500"
                      : step.completed
                        ? "bg-green-500"
                        : "bg-gray-700"
                  }`}
                />
              )}

              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 border ${
                  isCancelled
                    ? "bg-red-500 border-red-500 text-white"
                    : step.completed
                      ? "bg-green-500 border-green-500 text-black"
                      : "bg-gray-900 border-gray-700 text-gray-500"
                }`}
              >
                {step.icon}
              </div>

              <div className="flex-1 pt-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h2
                    className={`font-semibold text-lg ${
                      step.completed ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </h2>

                  {step.completed && (
                    <span className="w-fit text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                      Completed
                    </span>
                  )}
                </div>

                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    step.completed ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {step.description}
                </p>

                {step.time && (
                  <p className="text-xs text-gray-500 mt-3">{step.time}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackOrderDetail;
