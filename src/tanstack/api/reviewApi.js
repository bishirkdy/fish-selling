import { api } from "../../config/apiClient";
import { getUserById } from "./userApi";

export const addReviewDB = async (data) => {
  const isExisted = await api.get(
    `/reviews?productId=${data.productId}&userId=${data.userId}`,
  );
  if (isExisted.data.length > 0) {
    throw new Error("You already reviewed this product");
  }

  const res = await api.post("/reviews", data);
  return res.data;
};


export const getReviewsByProduct = async (productId) => {
    
  const res = await api.get(
    `/reviews?productId=${productId}`
  );
  const reviews = res.data;
  const reviewsWithUsers = await Promise.all(
    reviews.map(async (review) => {
      const user = await getUserById(review.userId);
      return {
        ...review,
        user,
      };
    })
  );

  return reviewsWithUsers;
};