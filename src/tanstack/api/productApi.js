import { api } from "../../config/apiClient";
const PRODUCT = "/Products";


export const getProductsByFiltered = async (params = {}) => {
  const product = await api.get(`${PRODUCT}`, { params })
  return product.data.data;
};

export const getSixFeaturedProduct = async () => {
  const product = await api.get(`${PRODUCT}/six-product`)
  return product.data;  
};

export const getProductById = async (id) => {
  const product = await api.get(`${PRODUCT}/${id}`)
  return product.data;
};


export const removeProduct = async (id) => {
    const res = await api.delete(`/${PRODUCT}/${id}`)
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
