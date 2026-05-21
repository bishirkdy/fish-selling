import { api } from "../../config/apiClient";
import { attachProductRatings } from "../../utils/productRiting";

export const getProductsByFiltered = async (params = {}) => {
  const [productRes, reviewRes] = await Promise.all([
    api.get("/products", { params }),
    api.get("/reviews"),
  ]);

  return attachProductRatings(
    productRes.data,
    reviewRes.data
  );
};

export const getSixFeaturedProduct = async () => {
  const [productRes, reviewRes] = await Promise.all([
    api.get("/products"),
    api.get("/reviews"),
  ]);

  return attachProductRatings(
    productRes.data,
    reviewRes.data
  )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);
};

export const getProductById = async (id) => {
  const [productRes, reviewRes] = await Promise.all([
    api.get(`/products/${id}`),
    api.get("/reviews", {
      params: {
        productId: id,
      },
    }),
  ]);

  return attachProductRatings(
    [productRes.data],
    reviewRes.data
  )[0];
};

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
