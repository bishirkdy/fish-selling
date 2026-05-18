import {useMutation} from "@tanstack/react-query"
import { addOrderAnalysis } from "../../api/analysisApi"
export const usePostAnalysis = () => {
    return useMutation({
        mutationFn : addOrderAnalysis
    })
}