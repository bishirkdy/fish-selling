import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../../../services/user/userService";

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};


