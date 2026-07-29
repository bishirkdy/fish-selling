import { api } from "../../config/apiClient";
const PRODUCT = "/Products";
const ADMINPRODUCT = "/admin/product";

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
  return product.data.data;
};


export const removeProduct = async (id) => {
    const res = await api.delete(`/${PRODUCT}/${id}`)
    return res.data
}

export const addProduct = async (data) => {
  console.log(data);
  
    const res = await api.post(`${ADMINPRODUCT}` , data)
    return res.data.data;
}

export const updateProductById = async ({ data, id }) => {
    const res =await api.patch(`${ADMINPRODUCT}/${id}` ,data)
    return res.data.data
}
