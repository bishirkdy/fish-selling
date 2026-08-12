export const ORDER_ENDPOINTS = {
  BASE: "/Order",
  MY_ORDERS: "/Order/me",
  BY_ID: (id) => `/Order/${id}`,
  CANCEL: (orderId, productId) =>
    `/order/${orderId}/cancel/${productId}`,
};
