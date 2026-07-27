import { useQuery } from "@tanstack/react-query"
import { getFavData } from "../../api/favoriteApi"

export const useFavDataOfUser = ({ enabled = true } = {}) => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: getFavData,
    enabled,
  });
};