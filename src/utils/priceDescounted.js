export const priceDiscounted = (price, percentage) => {
  return Math.round(price - (price * percentage) / 100);
};
