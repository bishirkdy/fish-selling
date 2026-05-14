import { useMutation } from "@tanstack/react-query";
import { addToCartDB, quantityUpdating, removeDataFromCart } from "../../api/cartApi";

export const useAddToCart = () => {
  return useMutation({
    mutationFn: addToCartDB,
  });
};

export const useRemoveFromCart = () => {
  return useMutation({
    mutationFn : removeDataFromCart
  })
}
export const useUpdateQuantity = () =>  {
  return useMutation({
    mutationFn : quantityUpdating
  })
}