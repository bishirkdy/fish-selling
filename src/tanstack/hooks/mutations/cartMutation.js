import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCartDB, quantityUpdating, removeDataFromCart } from "../../api/cartApi";

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