import {  useQuery } from "@tanstack/react-query";
import { getAllCartDataOfUser } from "../../api/cartApi";

export const useGetAllCartDataOfUser = (userId) => {
  return useQuery({
    queryKey: ["carts", userId],
    queryFn: () => getAllCartDataOfUser(userId),
    enabled: !!userId,
  });
};


