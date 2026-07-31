import { api } from "../../api/apiClient";
import { ADDRESS_ENDPOINTS } from "../../api/endpoints/address/addressEndpoints";


export const addShippingAddress = async (data) => {
  const res = await api.post(ADDRESS_ENDPOINTS.BASE, data);
  return res.data.data;
};