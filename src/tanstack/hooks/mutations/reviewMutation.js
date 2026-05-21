import { useMutation } from "@tanstack/react-query";
import { addReviewDB } from "../../api/reviewApi";

export const useAddReview = () => {
  return useMutation({
    mutationFn: addReviewDB,
  });
};
