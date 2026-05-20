import { useQuery } from "@tanstack/react-query";
import { getAllUser, getUserById, loginUser } from "../../api/userApi";

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};
export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUser
  });
};