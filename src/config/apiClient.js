import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

// api.interceptors.request.use(
//   async (config) => {
//     await new Promise((resolve) => setTimeout(resolve, 2000));
//     return config;
//   },
//   (error) => Promise.reject(error)
// );