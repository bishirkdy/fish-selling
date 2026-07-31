import { useQuery } from "@tanstack/react-query"
import { getFavData } from "../../../../services/favorite/favoriteService";

export const useFavDataOfUser = ({ enabled = true } = {}) => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: getFavData,
    enabled,
  });
};