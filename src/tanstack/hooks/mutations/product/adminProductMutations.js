import { useMutation } from "@tanstack/react-query"
import { addProduct, removeProduct, updateProductById } from "../../../../services/product/adminProductService"

export const useDeleteProduct = () => {
    return useMutation({
        mutationFn : removeProduct
    })
}

export const useAddProduct = () => {
    return useMutation({
        mutationFn : addProduct
    })
}

export const useEditProductById = () => {
    return useMutation({
        mutationFn : updateProductById
    })
}