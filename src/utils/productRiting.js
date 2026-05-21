export const attachProductRatings = (products, reviews) => {
  return products.map((product) => {
    const productReviews = reviews.filter(
      (review) => Number(review.productId) === Number(product.id)
    );

    const totalRating = productReviews.reduce(
      (sum, item) => sum + item.rating,
      0
    );

    const averageRating =
      productReviews.length > 0
        ? totalRating / productReviews.length
        : 0;

    return {
      ...product,
      rating: Number(averageRating.toFixed(1)),
      reviewCount: productReviews.length,
      reviews: productReviews,
    };
  });
};