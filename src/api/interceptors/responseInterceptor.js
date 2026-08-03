export const setupResponseInterceptor = (api) => {
  api.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url.includes("/auth/refresh-token")
      ) {
        originalRequest._retry = true;

        try {
          await api.post("/auth/refresh-token");

          return api(originalRequest);
        } catch {
          return Promise.reject(error);
        }
      }

      const backend = error.response?.data;

      return Promise.reject({
        message: backend?.message || error.message,
        status: error.response?.status,
        errors: backend?.errors ?? [],
      });
    }
  );
};