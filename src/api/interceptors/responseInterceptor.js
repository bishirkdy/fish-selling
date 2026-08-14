let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });

  failedQueue = [];
};

export const setupResponseInterceptor = (api) => {
  const excludedUrls = [
    "/Auth/login",
    "/Auth/register",
    "/Auth/forgot-password",
    "/Auth/refresh-token",
    "/Auth/profile"
  ];

  api.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest = error.config;
      
      // Network error
      if (!error.response) {
        return Promise.reject({
          message: "Network error",
          status: 0,
          errors: [],
        });
      }

      // No request configuration
      if (!originalRequest) {
        return Promise.reject(error);
      }

      // Don't refresh for authentication endpoints
      const shouldSkip = excludedUrls.some((url) =>
        originalRequest.url?.includes(url)
      );

      // Not a 401 or already retried
      if (
        error.response.status !== 401 ||
        originalRequest._retry ||
        shouldSkip
      ) {
        return Promise.reject({
          message: error.response.data?.message || error.message,
          status: error.response.status,
          errors: error.response.data?.errors ?? [],
        });
      }

      originalRequest._retry = true;

      // Another request is already refreshing
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          return api(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        // Refresh token is expected in HttpOnly cookie
        await api.post("/auth/refresh-token");
        processQueue(null);

        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);

        // Refresh token is expired/invalid
        window.location.href = "/login";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  );
};