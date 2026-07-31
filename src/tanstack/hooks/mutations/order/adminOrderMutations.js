import { useMutation } from "@tanstack/react-query";
import { orderStatusChange } from "../../../../services/order/adminOrderService";

export const useEditOrderStatus = () => {
  return useMutation({
    mutationFn: orderStatusChange,
  });
};