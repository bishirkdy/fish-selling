import { useQuery } from "@tanstack/react-query"
import { getReviewsByProduct } from "../../api/reviewApi"

export const useGetReviewOfProduct = (productId) => {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => getReviewsByProduct(productId),
    enabled: !!productId,
  });
};