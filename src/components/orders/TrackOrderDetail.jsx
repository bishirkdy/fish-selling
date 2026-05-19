import React from "react";
import {
  CheckCircle,
  Clock,
  Package,
  Truck,
  MapPin,
} from "lucide-react";

const trackingSteps = [
  {
    title: "Order Placed",
    description: "Your order has been placed successfully.",
    icon: <Clock size={18} />,
    completed: true,
    time: "18 May 2026 • 10:30 AM",
  },

  {
    title: "Confirmed",
    description: "Seller confirmed your order.",
    icon: <CheckCircle size={18} />,
    completed: true,
    time: "18 May 2026 • 11:00 AM",
  },

  {
    title: "Packed",
    description: "Your package has been packed.",
    icon: <Package size={18} />,
    completed: true,
    time: "19 May 2026 • 09:10 AM",
  },

  {
    title: "Shipping",
    description: "Courier picked up your package.",
    icon: <Truck size={18} />,
    completed: true,
    time: "19 May 2026 • 02:45 PM",
  },

  {
    title: "Out For Delivery",
    description: "Delivery partner is on the way.",
    icon: <MapPin size={18} />,
    completed: false,
    time: "",
  },

  {
    title: "Delivered",
    description: "Package delivered successfully.",
    icon: <CheckCircle size={18} />,
    completed: false,
    time: "",
  },
];

const TrackOrderDetail = ({
  setViewTrack,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-3 py-5">
      
      <div className="w-full max-w-2xl bg-(--color-background) border border-(--color-tertiary) rounded-3xl p-5 sm:p-7 relative overflow-y-auto max-h-[90vh]">
        
        {/* Close */}
        <button
          onClick={() => setViewTrack(false)}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white transition"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Order Tracking
          </h1>

          <p className="text-zinc-400 mt-2 text-sm">
            Track your order progress in real time.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {trackingSteps.map((step, index) => (
            <div
              key={index}
              className="flex gap-4 relative pb-10 last:pb-0"
            >
              
              {/* Vertical Line */}
              {index !== trackingSteps.length - 1 && (
                <div
                  className={`absolute left-[19px] top-10 w-[2px] h-full ${
                    step.completed
                      ? "bg-green-500"
                      : "bg-zinc-700"
                  }`}
                />
              )}

              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 border ${
                  step.completed
                    ? "bg-green-500 border-green-500 text-black"
                    : "bg-zinc-900 border-zinc-700 text-zinc-500"
                }`}
              >
                {step.icon}
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h2
                    className={`font-semibold text-lg ${
                      step.completed
                        ? "text-white"
                        : "text-zinc-500"
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
                    step.completed
                      ? "text-zinc-400"
                      : "text-zinc-600"
                  }`}
                >
                  {step.description}
                </p>

                {step.time && (
                  <p className="text-xs text-zinc-500 mt-3">
                    {step.time}
                  </p>
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