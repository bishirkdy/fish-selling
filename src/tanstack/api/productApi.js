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

export const removeProduct = async (id) => {
    const res = await api.delete(`/products/${id}`)
    return res.data
}

export const addProduct = async (data) => {
    const res = await api.post("/products" , data)
    return res.data
}

export const updateProductById = ({ data, id }) => {
    const res = api.patch(`/products/${id}` ,data)
    return res.data
}
