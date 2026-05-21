import {  useQuery } from "@tanstack/react-query";
import { getCountOfTotalAndProfit, getLastSevenMonthAnalysis, getRatingCount, lastSevenMonthProduct } from "../../api/analysisApi";

export const useGetAllCartDataOfUser = () => {
  return useQuery({
    queryKey: ["analysis-top"],
    queryFn: getCountOfTotalAndProfit,
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

export const useGetRatingCount = () => {
  return useQuery({
    queryKey : ["rating-count"],
    queryFn : getRatingCount,
  })
}