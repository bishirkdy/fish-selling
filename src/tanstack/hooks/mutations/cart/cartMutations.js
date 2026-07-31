import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCartDB, quantityUpdating, removeDataFromCart } from "../../../../services/cart/cartService";

export const useAddToCart = () => {
  return useMutation({
    mutationFn: addToCartDB,
  });
};

export const useRemoveFromCart = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn : removeDataFromCart,
        onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  })
}
export const useUpdateQuantity = () =>  {
  return useMutation({
    mutationFn : quantityUpdating
  })
}