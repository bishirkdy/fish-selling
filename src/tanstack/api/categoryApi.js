import { api } from "../../config/apiClient";
const CATEGORY = "/Categories";

export const getCategoryApi = async () => {
    const res = await api.get(`${CATEGORY}`);
    return res.data.data;
}