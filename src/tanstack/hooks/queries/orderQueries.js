import { useQuery } from "@tanstack/react-query"
import { getAllOrders, getLatestOrderOfUser, getOrderByUser , statesOfOrders } from "../../api/orderApi"

export const useGetAllOrdersOfUser = () => {
    return useQuery({
        queryKey : ["user-orders" ],
        queryFn :  getOrderByUser
    })
}

export const useGetLatestOrder = (id) => {
    return useQuery({
        queryKey : ["orders" , id],
        queryFn : () => getLatestOrderOfUser(id)
    })
}

export const useGetAllOrders = () => {
    return useQuery({
        queryKey : ["orders"],
        queryFn : getAllOrders
    })
}

export const useGetOrderedStatus = () => {
    return useQuery({
        queryKey : ["orders-status"],
        queryFn : statesOfOrders
    })
}