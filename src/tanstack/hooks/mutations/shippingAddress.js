import { useMutation } from "@tanstack/react-query"
import { addShippingAddress } from "../../api/shippingAddress"

export const useAddShippingAddress = () => {
    return useMutation({
        mutationFn : addShippingAddress
    })
}
