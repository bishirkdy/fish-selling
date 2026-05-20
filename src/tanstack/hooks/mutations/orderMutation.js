import { useMutation } from "@tanstack/react-query";
import {  addOrders, orderStatusChange, removeOrder } from "../../api/orderApi";

export const useAddOrders = () => {
  return useMutation({
    mutationFn: addOrders,
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

