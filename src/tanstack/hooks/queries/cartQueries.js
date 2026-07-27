import {  useQuery } from "@tanstack/react-query";
import { getAllCartDataOfUser } from "../../api/cartApi";

export const useGetAllCartDataOfUser = ({ enabled = true } = {}) => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => getAllCartDataOfUser(),
    enabled
  });
};


