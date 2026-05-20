import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useLastMonthAnalysis } from "../../../tanstack/hooks/queries/analysisQueries";
import Loader from "../../Loader";

// #region Sample data
// const data = [
//   {
//     name: "Page A",
//     sales: 4000,
//   },
//   {
//     name: "Page B",
//     sales: 3000,
//   },
//   {
//     name: "Page C",
//     sales: 2000,
//   },
//   {
//     name: "Page D",
//     sales: 2780,
//   },
//   {
//     name: "Page E",
//     sales: 1890,
//   },
//   {
//     name: "Page F",
//     sales: 2390,
//   },
//   {
//     name: "Page G",
//     sales: 3490,
//   },
// ];

// #endregion
export const SalesChart = () => {
  const { data: salesData, isLoading } = useLastMonthAnalysis();

  if (isLoading) return <p>Loading...</p>
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <AreaChart
          data={salesData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="bump" dataKey="sales" stroke="#18181B" fill="#F97316" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
