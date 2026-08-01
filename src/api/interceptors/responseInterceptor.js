export const setupResponseInterceptor = (api) => {
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const backend = error.response?.data;

    return Promise.reject({
      message: backend?.message || error.message,
      status: error.response?.status,
      errors: backend?.error ?? [],
    });
  }
);
};
