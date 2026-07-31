import { api } from "../../api/apiClient";
import { ADMIN_ANALYSIS_ENDPOINTS } from "../../api/endpoints/analysis/AdminAnalysisEndpoints";

export const getDashboardTop = async () => {
  const res = await api.get(ADMIN_ANALYSIS_ENDPOINTS.TOP_DASHBOARD);
  return res.data.data;
};

export const getAnalysisTop = async () => {
  const res = await api.get(ADMIN_ANALYSIS_ENDPOINTS.ANALYSIS_SUMMARY);
  return res.data.data;
};

export const getLastSevenMonthAnalysis = async () => {
  const res = await api.get(ADMIN_ANALYSIS_ENDPOINTS.MONTHLY_SALES);
  return res.data.data;
};

export const getLastSevenMonthProduct = async () => {
  const res = await api.get(ADMIN_ANALYSIS_ENDPOINTS.MONTHLY_PRODUCTS);
  return res.data.data;
};

export const getCategoryDistribution = async () => {
  const res = await api.get(ADMIN_ANALYSIS_ENDPOINTS.CATEGORY_COUNT);
  return res.data.data;
};

export const getTotalOrderStatus = async () => {
  const res = await api.get(ADMIN_ANALYSIS_ENDPOINTS.ORDER_STATUS);
  return res.data.data;
};

export const getOverallRating = async () => {
  const res = await api.get(ADMIN_ANALYSIS_ENDPOINTS.OVERALL_RATING);
  return res.data.data;}