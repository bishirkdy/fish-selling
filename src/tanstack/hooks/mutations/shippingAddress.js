import { addShippingAddress } from "../../api/shippingAddress"

export const useAddShippingAddress = () => {
    return useMutation({
        mutationFn : addShippingAddress
    })
}
