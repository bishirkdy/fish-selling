import { useMutation } from "@tanstack/react-query";
import { deleteOneOrder, orderStatusChange } from "../../../../services/order/adminOrderService";

export const useEditOrderStatus = () => {
  return useMutation({
    mutationFn: orderStatusChange,
  });
};

export const useDeleteOrder = () => {
  return useMutation({
    mutationFn: deleteOneOrder,
  });
};
