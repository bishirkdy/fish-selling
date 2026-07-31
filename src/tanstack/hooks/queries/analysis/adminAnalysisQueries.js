import {  useQuery } from "@tanstack/react-query";
import { getAnalysisTop, getCategoryDistribution, getDashboardTop, getLastSevenMonthAnalysis, getLastSevenMonthProduct, getTotalOrderStatus , getOverallRating} from "../../../../services/analysis/adminAnalysisService";

export const useDashboardTopData = () => {
  return useQuery({
    queryKey: ["dashboard-top"],
    queryFn: getDashboardTop,
  });
};

export const useAnalysisTopData = () => {
  return useQuery({
    queryKey: ["analysis-top"],
    queryFn: getAnalysisTop,
  });
};

export const useGetTotalOrderStatus = () => {
  return useQuery({
    queryKey: ["order-status"],
    queryFn: getTotalOrderStatus,
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
    queryFn : getLastSevenMonthProduct
   })
}

export const useCategoryDistribution = () => {
   return useQuery({
    queryKey : ["category-chart"],
    queryFn : getCategoryDistribution
   })
}

export const useGetRatingCount = () => {
  return useQuery({
    queryKey : ["rating-count"],
    queryFn : getOverallRating,
  })
}