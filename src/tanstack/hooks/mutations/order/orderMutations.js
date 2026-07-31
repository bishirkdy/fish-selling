import { useMutation } from "@tanstack/react-query";
import {  addOrder, cancelOrder } from "../../../../services/order/orderService";

export const useAddOrders = () => {
  return useMutation({
    mutationFn: addOrder,
  });
};

export const useRemoveUserById = () => {
  return useMutation({
    mutationFn: cancelOrder,
  });
};