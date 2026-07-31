import { useMutation } from "@tanstack/react-query";
import { addOrders, cancelOrder } from "../../../../services/order/orderService";

export const useAddOrders = () => {
  return useMutation({
    mutationFn: addOrders,
  });
};

export const useRemoveUserById = () => {
  return useMutation({
    mutationFn: cancelOrder,
  });
};