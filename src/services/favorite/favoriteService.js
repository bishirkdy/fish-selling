import { api } from "../../api/apiClient";
import { FAVORITE_ENDPOINTS } from "../../api/endpoints/favorite/favoriteEndpoints";


export const addToFavDB = async (productId) => {
  const res = await api.post(FAVORITE_ENDPOINTS.BASE, {
    productId,
  });

  return res.data;
};

export const getFavData = async () => {
  const res = await api.get(FAVORITE_ENDPOINTS.BASE);
  return res.data.data;
};

export const removeFromFav = async (id) => {
  const res = await api.delete(FAVORITE_ENDPOINTS.BY_ID(id));
  return res.data;
};