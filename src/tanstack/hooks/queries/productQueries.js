import { useQuery } from "@tanstack/react-query";
import {
  getProductById,
  getProductsByFiltered,
  getSixFeaturedProduct,
} from "../../api/productApi";

export const useGetProducts = (params) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProductsByFiltered(params),
    keepPreviousData: true,
  });
};

export const useGetSixProduct = () => {
  return useQuery({
    queryKey: ["featured-products"],
    queryFn: getSixFeaturedProduct,
  });
};

export const useGetProductById = (id) => {
  return useQuery({
    queryKey: ["products" , id],
    queryFn: () => getProductById(id),
    enabled : !!id
  });
};

// export const useGetCartProducts = (products) => {
//   return useQuery({
//     queryKey : ["products", products],
//     queryFn : () => getUserProductForCart(products),
//     enabled : !!products
//   })
// }
