import {  useQuery } from "@tanstack/react-query";
import { getAllCartDataOfUser } from "../../../../services/cart/cartService";

export const useGetAllCartDataOfUser = ({ enabled = true } = {}) => {
  return useQuery({
    queryKey: ["cart"],
    queryFn:  getAllCartDataOfUser,
    enabled
  });
};


