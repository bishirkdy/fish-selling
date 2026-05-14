import { useMutation } from "@tanstack/react-query";
import { addBulkOrders, addOrders, removeOrder } from "../../api/orderApi";

export const useAddOrders = () => {
  return useMutation({
    mutationFn: addOrders,
  });
};

export const useBulkOrders = () => {
  return useMutation({
    mutationFn: addBulkOrders,
  });
};

export const useRemoveUserById = () => {
  return useMutation({
    mutationFn: removeOrder,
  });
};
