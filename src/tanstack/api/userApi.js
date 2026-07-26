import { api } from "../../config/apiClient";
const USER = "/User";

export const addUser = async (data) => {
  const res = await api.post(`${USER}/register`, data);
  return res.data;
};

export const getUserById = async (id) => {
  const res = await api.get(`/${USER}/${id}`);
  return res.data.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/user/profile");
  return response.data.data;
};


export const loginUser = async (data) => {
  const res = await api.post(`${USER}/login`, data);
  return res.data.data;
};

export const getAllUser = async () => {
  const res = await api.get(`${USER}`);
  return res.data;
};

export const blockUser = async (id) => {
  const res = await api.patch(`/users/${id}`, {
    isBlocked: true,
  });

  return res.data;
};

export const unblockUser = async (id) => {
  const res = await api.patch(`/users/${id}`, {
    isBlocked: false,
  });

  return res.data;
};
