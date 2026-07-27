import { api } from "../../config/apiClient";
const CART = "/Cart"
export const addToCartDB = async (data) => {
  const res = await api.post(`${CART}`, data);
  return res.data;
};

export const getAllCartDataOfUser = async () => {
  const res = await api.get(`${CART}`); 
  return res.data.data;
};

export const removeDataFromCart = async (id) => {
  const res = await api.delete(`${CART}/${id}`);
  return res.data.data;
};

export const quantityUpdating = async ({id, quantity}) => {
  const res = await api.patch(`${CART}/${id}`, {
    quantity: quantity,
  });

  return res.data;
};