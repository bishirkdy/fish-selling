import { api } from "../../api/apiClient";
import { ADMIN_ORDER_ENDPOINTS } from "../../api/endpoints/order/adminOrderEndpoints";


export const getAllOrders = async () => {
  const res = await api.get(ADMIN_ORDER_ENDPOINTS.BASE);
  return res.data.data;
};

// export const orderStatusChange = async ({
//   orderId,
//   productId,
//   final,
// }) => {
//   // your implementation
// };