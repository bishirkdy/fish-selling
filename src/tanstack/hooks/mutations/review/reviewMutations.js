import { useMutation } from "@tanstack/react-query";
import { addReview } from "../../../../services/review/reviewService";

export const useAddReview = () => {
  return useMutation({
    mutationFn: addReview,
  });
};