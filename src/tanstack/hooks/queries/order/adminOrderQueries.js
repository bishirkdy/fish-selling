import { useQuery } from "@tanstack/react-query"
import { getAllOrders } from "../../../../services/order/adminOrderService"

export const useGetAllOrders = () => {
    return useQuery({
        queryKey : ["orders"],
        queryFn : getAllOrders
    })
}

// export const useGetOrderedStatus = () => {
//     return useQuery({
//         queryKey : ["orders-status"],
//         queryFn : statesOfOrders
//     })
// }