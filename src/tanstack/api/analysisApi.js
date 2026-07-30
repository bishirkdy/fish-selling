import { api } from "../../config/apiClient";
import { lastSevenMonthProductCalculation } from "../../utils/lastSevenMonthProduct";
const ANALYSISURL = "/admin/analysis"


export const getDashboardTopApi = async () => {
  const res = await api.get(`${ANALYSISURL}/top-dashboard`);  
  return res.data.data;
};

export const getAnalysisTopApi = async () => {
  const res = await api.get(`${ANALYSISURL}/analysis-summary`);  
  return res.data.data;
};

export const getLastSevenMonthAnalysis = async () => {
  const res = await api.get(`${ANALYSISURL}/monthly-sales`);    
  return res.data.data;
};


export const lastSevenMonthProduct = async () => {
  const res = await api.get(`${ANALYSISURL}/monthly-products`);
  return res.data.data;

};

export const categoryDistributionApi = async () => {
  const res = await api.get(`${ANALYSISURL}/category-count`);
  return res.data.data;

};

export const totalOrderStatusApi = async () => {
  const res = await api.get(`${ANALYSISURL}/order-status-summary`);
  return res.data.data;

};

export const getRatingCount = async () => {
  const res = await api.get("/reviews");
  const ratings = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  res.data.forEach((review) => {
    ratings[review.rating]++;
  });

  return [
    {
      name: "5 Star",
      value: ratings[5],
      fill: "#22c55e",
    },
    {
      name: "4 Star",
      value: ratings[4],
      fill: "#3b82f6",
    },
    {
      name: "3 Star",
      value: ratings[3],
      fill: "#eab308",
    },
    {
      name: "2 Star",
      value: ratings[2],
      fill: "#f97316",
    },
    {
      name: "1 Star",
      value: ratings[1],
      fill: "#ef4444",
    },
  ];
};