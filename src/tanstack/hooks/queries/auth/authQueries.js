import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../../../services/auth/authServices";

export const useGetCurrentUser = (options = {}) => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    ...options,
  });
};