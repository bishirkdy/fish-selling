import { useQuery } from "@tanstack/react-query"
import { getReviewsByProduct } from "../../../../services/review/reviewService";

export const useGetReviewOfProduct = (productId) => {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => getReviewsByProduct(productId),
    enabled: !!productId,
  });
};