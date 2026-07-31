import { api } from "../../api/apiClient";
import { ORDER_ENDPOINTS } from "../../api/endpoints/order/orderEndpoints";


export const addOrder = async (data) => {
  const res = await api.post(ORDER_ENDPOINTS.BASE, data);
  return res.data;
};

export const getOrderByUser = async () => {
  const res = await api.get(ORDER_ENDPOINTS.MY_ORDERS);
  return res.data.data;
};

export const getLatestOrderOfUser = async (id) => {
  const res = await api.get(ORDER_ENDPOINTS.BY_ID(id));
  return res.data;
};

export const cancelOrder = async ({ orderId, productId }) => {
  const res = await api.get(
    ORDER_ENDPOINTS.CANCEL(orderId, productId)
  );
  return res.data;
};