import { useMutation } from "@tanstack/react-query"
import { addToFavDB, removeFromFav } from "../../api/favoriteApi"

export const useAddToFav = () => {
    return useMutation({
        mutationFn : addToFavDB
    })
}

export const useRemoveFromFav = () => {
    return useMutation({
        mutationFn : removeFromFav
    })
}
