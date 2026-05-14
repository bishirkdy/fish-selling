import { api } from "../../config/apiClient";

export const addToCartDB = async (data) => {
  const isExisted = await api.get(
    `/carts?productId=${data.productId}&user=${data.user}`,
  );
  console.log(isExisted.data);
  
  if (isExisted.data.length > 0) {
    throw new Error("Data already added to cart");
  }
  const res = await api.post("/carts", data);
  return res.data;
};

export const getAllCartDataOfUser = async (user) => {
  const res = await api.get(`/carts?user=${user}`);
  return res.data;
};

export const removeDataFromCart = async (data) => {
  const item = await api.get(`/carts?user=${data.user}&productId=${data.id}`);
  const cartItem = item.data[0];
  if (!cartItem) {
    throw new Error("Cart item not found");
  }
  const res = await api.delete(`/carts/${cartItem.id}`);
  return res.data;
};

export const quantityUpdating = async (data) => {
  const item = await api.get(
    `/carts?user=${data.user}&productId=${data.productId}`,
  );

  const cartItem = item.data[0];
  if (!cartItem) {
    throw new Error("Cart item not found");
  }
  const res = await api.patch(`/carts/${cartItem.id}`, {
    quantity: data.quantity,
  });
  return res.data;
};
