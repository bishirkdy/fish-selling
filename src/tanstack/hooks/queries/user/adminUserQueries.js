import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../../services/user/adminUserService";

export const useGetUsers = ({ page, pageSize, search, status }) => {
  return useQuery({
    queryKey: ["users", page, pageSize, search, status],
    queryFn: () => getUsers({ page, pageSize, search, status }),
    placeholderData: (previousData) => previousData,
  });
};
