export const ORDER_ENDPOINTS = {
  BASE: "/Order",
  MY_ORDERS: "/Order/me",
  BY_ID: (id) => `/orders/${id}`,
  CANCEL: (orderId, productId) =>
    `/${orderId}/cancel/${productId}`,
};
