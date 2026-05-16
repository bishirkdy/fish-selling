import { api } from "../../config/apiClient";

export const addOrderAnalysis = async (data) => {
    const res = await api.post("/analysis" , data)
};
