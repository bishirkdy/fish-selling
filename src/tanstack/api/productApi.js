import { api } from "../../config/apiClient";

export const getProductsByFiltered = async (params = {}) => {
  const res = await api.get(`/products`, { params });
  return res.data;
};

export const getSixFeaturedProduct = async () => {
    const res = await api.get("/products" , {
        params : {
            _sort : "rating",
            _order : "desc",
            _limit : 6
        }
    })
    return res.data
}

export const getProductById = async (id) => {
    const res = await api.get(`/products/${id}`);
    return res.data
}

// export const getUserProductForCart = async (productId) => {
//     const res = await api.get(`/products/${productId}`)
//     return res.data
// }