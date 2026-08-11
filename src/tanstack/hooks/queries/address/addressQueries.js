import { useQuery } from "@tanstack/react-query";
import { getLastUsedAddress } from "../../../../services/address/addressService";

export const useGetLastUsedAddress = () => {
  return useQuery({
    queryKey: ["address"],
    queryFn:  getLastUsedAddress,
  });
};