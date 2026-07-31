export const ADMIN_ORDER_ENDPOINTS = {
  BASE: "/admin/order",
  BY_ID: (id) => `/admin/order/${id}`,
  UPDATE_STATUS : ( orderId , productId ) => `/admin/order/${orderId}/products/${productId}/status`
};