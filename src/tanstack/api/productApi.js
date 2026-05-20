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

export const getRatingCount = async () => {
  const { data } = await api.get("/products");

  const rating = [
    {
      name: "1 Star",
      value: 0,
      fill: "#F97316",
    },
    {
      name: "2 Star",
      value: 0,
      fill: "#06B6D4",
    },
    {
      name: "3 Star",
      value: 0,
      fill: "#0B1220",
    },
    {
      name: "4 Star",
      value: 0,
      fill: "#e38e51",
    },
    {
      name: "5 Star",
      value: 0,
      fill: "#a4de6c",
    },
  ];

  data.forEach((product) => {
    const value = product.rating;

    if (value > 0 && value <= 1) {
      rating[0].value++;
    } else if (value > 1 && value <= 2) {
      rating[1].value++;
    } else if (value > 2 && value <= 3) {
      rating[2].value++;
    } else if (value > 3 && value <= 4) {
      rating[3].value++;
    } else if (value > 4 && value <= 5) {
      rating[4].value++;
    }
  });

  return rating;
};