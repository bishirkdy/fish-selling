import {useMutation} from "@tanstack/react-query"
export const usePostAnalysis = () => {
    return useMutation({
        mutationFn : addOrderAnalysis
    })
}