import { useQuery } from "@tanstack/react-query"
import { getFavData } from "../../api/favoriteApi"

export const useFavDataOfUser = (userId) => {
    return useQuery({
        queryKey : ["favorites" , userId],
        queryFn : () => getFavData(userId),
        enabled : !!userId
    })
}