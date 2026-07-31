import { useMutation } from "@tanstack/react-query"
import { addToFavDB, removeFromFav } from "../../../../services/favorite/favoriteService"

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
