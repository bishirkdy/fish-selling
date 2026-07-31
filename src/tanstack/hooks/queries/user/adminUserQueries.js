import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../../../services/user/adminUserService";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers
  });
};