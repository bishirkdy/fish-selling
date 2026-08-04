export const setupResponseInterceptor = (api) => {
  const excludedUrls = [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/refresh-token",
  ];

  api.interceptors.response.use(
    (response) => response,

    async (error) => {
      if (!error.response) {
        return Promise.reject({
          message: "Network error",
          status: 0,
          errors: [],
        });
      }

      const originalRequest = error.config;

      if (!originalRequest) {
        return Promise.reject(error);
      }

      const shouldSkip = excludedUrls.some((url) =>
        originalRequest.url.includes(url)
      );

      if (
        error.response.status === 401 &&
        !originalRequest._retry &&
        !shouldSkip
      ) {
        originalRequest._retry = true;

        try {
          await api.post("/auth/refresh-token");
          return api(originalRequest);
        } catch {
          // Clear auth state if needed
          window.location.href = "/login";
        }
      }

      const backend = error.response.data;

      return Promise.reject({
        message: backend?.message || error.message,
        status: error.response.status,
        errors: backend?.errors ?? [],
      });
    }
  );
};