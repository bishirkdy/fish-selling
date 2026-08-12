import { useQuery } from "@tanstack/react-query"
import { getAllOrders } from "../../../../services/order/adminOrderService"

export const useGetAllOrders = ({page, pageSize, search, status}) => {
  return useQuery({
    queryKey: ["orders", page, pageSize, search, status],
    queryFn: () =>
      getAllOrders({page,pageSize,search,status,}),
    placeholderData: (previousData) => previousData,
  });
};

// export const useGetOrderedStatus = () => {
//     return useQuery({
//         queryKey : ["orders-status"],
//         queryFn : statesOfOrders
//     })
// }