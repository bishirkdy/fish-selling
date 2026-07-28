import { api } from "../../config/apiClient";
const PAYMENT = "/Payment";

export const createOrderWithPaymentApi = async (data) => {
    const res = await api.post(`${PAYMENT}/create-order` , data);
    return res.data.data
}

export const verifyPaymentApi = async (data) => {
    const res = await api.post(`${PAYMENT}/verify`,data);
    return res.data.data
}   