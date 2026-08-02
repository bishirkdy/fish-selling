import { useQuery } from "@tanstack/react-query"
import { getLatestOrderOfUser, getOrderByUser } from "../../../../services/order/orderService"

export const useGetAllOrdersOfUser = () => {
    return useQuery({
        queryKey : ["user-orders" ],
        queryFn :  getOrderByUser
    })
}

export const useGetLatestOrder = (id) => {
    return useQuery({
        queryKey : ["user-orders" , id],
        queryFn : () => getLatestOrderOfUser(id)
    })
}