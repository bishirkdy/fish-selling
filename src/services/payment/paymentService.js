import { api } from "../../api/apiClient";
import { PAYMENT_ENDPOINTS } from "../../api/endpoints/payment/paymentEndpoints";


export const createOrderWithPayment = async (data) => {
  const res = await api.post(PAYMENT_ENDPOINTS.CREATE_ORDER, data);
  return res.data.data;
};

export const verifyPayment = async (data) => {
  const res = await api.post(PAYMENT_ENDPOINTS.VERIFY, data);
  return res.data.data;
};