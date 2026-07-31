import { api } from "../../api/apiClient";
import { CART_ENDPOINTS } from "../../api/endpoints/cart/cartEndpoints";


export const addToCartDB = async (data) => {
  const res = await api.post(CART_ENDPOINTS.BASE, data);
  return res.data;
};

export const getAllCartDataOfUser = async () => {
  const res = await api.get(CART_ENDPOINTS.BASE);
  return res.data.data;
};

export const removeDataFromCart = async (id) => {
  const res = await api.delete(CART_ENDPOINTS.BY_ID(id));
  return res.data.data;
};

export const quantityUpdating = async ({ id, quantity }) => {
  const res = await api.patch(CART_ENDPOINTS.BY_ID(id), {
    quantity,
  });

  return res.data;
};