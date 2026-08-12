import {
  CheckCircle,
  Clock,
  MapPin,
  ShoppingBag,
  Truck,
  XCircle,
} from "lucide-react";

export const ORDER_STATUS = {
  OrderPlaced: {
    label: "Ordered",
    icon: <Clock size={14} />,
    bg: "bg-yellow-500/10",
    text: "text-yellow-400",
  },

  Confirmed: {
    label: "Confirmed",
    icon: <CheckCircle size={14} />,
    bg: "bg-blue-500/10",
    text: "text-blue-400",
  },

  Packed: {
    label: "Packed",
    icon: <ShoppingBag size={14} />,
    bg: "bg-purple-500/10",
    text: "text-purple-400",
  },

  Shipping: {
    label: "Shipping",
    icon: <Truck size={14} />,
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
  },

  Shipped: {
    label: "Out For Delivery",
    icon: <MapPin size={14} />,
    bg: "bg-orange-500/10",
    text: "text-orange-400",
  },

  Delivered: {
    label: "Delivered",
    icon: <CheckCircle size={14} />,
    bg: "bg-green-500/10",
    text: "text-green-400",
  },

  Cancelled: {
    label: "Cancelled",
    icon: <XCircle size={14} />,
    bg: "bg-red-500/10",
    text: "text-red-400",
  },
};