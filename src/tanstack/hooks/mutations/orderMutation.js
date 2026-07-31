import { useMutation } from "@tanstack/react-query";
import {  addOrders, orderStatusChange, removeOrder } from "../../api/orderApi";



export const useEditOrderStatus = () => {
    return useMutation({
        mutationFn : orderStatusChange
    })
}

