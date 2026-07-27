import { api } from "../../config/apiClient";
const FAVORITE = "/Favorite";

export const addToFavDB = async (productId) => {
  console.log(productId);
  
  const res = await api.post(FAVORITE, {
    productId,
  });

  return res.data;
};

export const getFavData = async () => {
  const res = await api.get(`${FAVORITE}`);
  return res.data.data;
};

export const removeFromFav = async (id) => {
  const res = await api.delete(`${FAVORITE}/${id}`);
  return res.data;
};

