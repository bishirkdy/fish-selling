import { api } from "../../config/apiClient";

export const addUser = async (data) => {
  const res = await api.post("/users", data);
  return res.data;
};

export const getUserById = async (id) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await api.get(`/users?email=${data.email}`);
  const user = res.data[0];
  if (!user) {
    throw new Error("User not found");
  }
  if (user.isBlocked) {
    throw new Error("User has been blocked by admin");
  }
  if (user.password !== data.password) {
    throw new Error("Invalid password");
  }
  return user;
};

export const getAllUser = async () => {
  const res = await api.get(`/users`);
  const filtered = res.data.filter((data) => {
    return data.role !== "admin";
  });
  return filtered;
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
