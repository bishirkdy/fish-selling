import { useMutation } from "@tanstack/react-query"
import { addShippingAddress } from "../../../../services/address/addressService"

export const useAddShippingAddress = () => {
    return useMutation({
        mutationFn : addShippingAddress
    })
}