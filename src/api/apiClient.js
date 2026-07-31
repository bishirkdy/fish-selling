import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials : true,
});

// api.interceptors.request.use(
//   async (config) => {
//     await new Promise((resolve) => setTimeout(resolve, 200));
//     return config;
//   },
//   (error) => Promise.reject(error)
// );