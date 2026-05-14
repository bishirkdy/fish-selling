import { api } from "../../config/apiClient";

export const addToFavDB = async (data) => {
  const res = await api.post("/favorites", data);
  return res.data;
};
export const getFavData = async (userId) => {
  const productIds = await api.get(`/favorites?userId=${userId}`);
  const userFavProductData = await Promise.all(
    productIds.data.map(async (dta) => {
      const productId = dta.productId;
      const res = await api.get(`/products/${productId}`);
      return res.data;
    }),
  );
  return userFavProductData;
};

export const removeFromFav = async (data) => {
  const existing = await api.get(
    `/favorites?userId=${data.userId}&productId=${data.productId}`,
  );
  if (existing.data.length === 0) {
    throw new Error("Favorite not found");
  }
  const favId = existing.data[0].id;
  const res = await api.delete(`/favorites/${favId}`);
  return res.data;
};
