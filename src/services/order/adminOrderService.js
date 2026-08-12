import { api } from "../../api/apiClient";
import { ADMIN_ORDER_ENDPOINTS } from "../../api/endpoints/order/adminOrderEndpoints";


export const getAllOrders = async ({page = 1,pageSize = 5,search = "",status = ""}) => {
  const res = await api.get(ADMIN_ORDER_ENDPOINTS.BASE , {params: {page,pageSize,search,status}});  
  return res.data.data;
};

export const orderStatusChange = async ({orderId, productId, status}) => {
  const res = await api.patch(ADMIN_ORDER_ENDPOINTS.UPDATE_STATUS( orderId , productId) , {status});
  return res.data;
};

export const deleteOneOrder = async(orderId) => {
  await api.delete(ADMIN_ORDER_ENDPOINTS.BY_ID(orderId));
}