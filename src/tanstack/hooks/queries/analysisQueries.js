import {  useQuery } from "@tanstack/react-query";
import { categoryDistributionApi, getAnalysisTopApi , getDashboardTopApi, getLastSevenMonthAnalysis, getRatingCount, lastSevenMonthProduct, totalOrderStatusApi } from "../../api/analysisApi";

export const useDashboardTopData = () => {
  return useQuery({
    queryKey: ["dashboard-top"],
    queryFn: getDashboardTopApi,
  });
};

export const useAnalysisTopData = () => {
  return useQuery({
    queryKey: ["analysis-top"],
    queryFn: getAnalysisTopApi,
  });
};

export const useGetTotalOrderStatus = () => {
  return useQuery({
    queryKey: ["order-status"],
    queryFn: totalOrderStatusApi,
  });
};

export const useLastMonthAnalysis = () => {
     return useQuery({
        queryKey : ["sales-chart"],
        queryFn : getLastSevenMonthAnalysis
     })
}

export const useLastMonthsProductCount = () => {
   return useQuery({
    queryKey : ["profit-chart"],
    queryFn : lastSevenMonthProduct
   })
}

export const useCategoryDistribution = () => {
   return useQuery({
    queryKey : ["category-chart"],
    queryFn : categoryDistributionApi
   })
}

export const useGetRatingCount = () => {
  return useQuery({
    queryKey : ["rating-count"],
    queryFn : getRatingCount,
  })
}