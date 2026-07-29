import { useQuery } from "@tanstack/react-query"
import { getCategoryApi } from "../../api/categoryApi"

export const useGetCategories = () => {
    return useQuery({
        queryKey : ["categories"],
        queryFn : getCategoryApi
    })
}