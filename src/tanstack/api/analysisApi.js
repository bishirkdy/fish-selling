import { api } from "../../config/apiClient";
import { analysisCalculation } from "../../utils/lastMonthSales";
import { lastSevenMonthProductCalculation } from "../../utils/lastSevenMonthProduct";

export const addOrderAnalysis = async (data) => {
  const res = await api.post("/analysis", data);
};

export const getCountOfTotalAndProfit = async () => {
  const [analysisRes, userRes, orderRes , productRes] = await Promise.all([
    api.get("/analysis"),
    api.get("/users"),
    api.get("/orders"),
    api.get("/products"),
  ]);

  const calculated = analysisRes.data.reduce(
    (acc, val) => {
      acc.total += Number(val.total || 0);
      acc.profit += Number(val.profit || 0);
      return acc;
    },
    {
      total: 0,
      profit: 0,
    },
  );

  return {
    total: calculated.total,
    profit: Math.floor(calculated.profit),
    userCount: userRes.data.filter(u => u.role !== "admin").length,
    orderCount: orderRes.data.length,
    productCount: productRes.data.length,
  };
};

export const getLastSevenMonthAnalysis = async () => {
  const res = await api.get("/analysis");
  const calculated = analysisCalculation(res.data);
  return calculated;
};

export const lastSevenMonthProduct = async () => {
  const res = await api.get("/products");

  const rawCategoryCount = res.data.reduce((acc, item) => {
    if (!item.category) return acc;
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const colors = ["#F97316", "#06B6D4", "#0B1220", "#e38e51", "#a4de6c"];

  const categoryCount = Object.entries(rawCategoryCount).map(
    ([name, value], index) => ({
      name,
      value,
      fill: colors[index],
    }),
  );

  const calculated = lastSevenMonthProductCalculation(res.data);
  return {
    categoryCount,
    calculated,
  };
};
