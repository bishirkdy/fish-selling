export const ADMIN_USER_ENDPOINTS = {
  BASE: "/admin/users",
  BLOCK: (id) => `/admin/users/${id}/block`,
  DELETE: (id) => `/admin/users/${id}`,
};