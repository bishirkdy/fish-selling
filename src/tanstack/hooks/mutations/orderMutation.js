import { useMutation } from "@tanstack/react-query";
import { addBulkOrders, addOrders, orderStatusChange, removeOrder } from "../../api/orderApi";

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

export const useEditOrderStatus = () => {
    return useMutation({
        mutationFn : orderStatusChange
    })
}