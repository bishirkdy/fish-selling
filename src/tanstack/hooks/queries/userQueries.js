import { useQuery } from "@tanstack/react-query";
import { getUserById, loginUser } from "../../api/userApi";

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};