import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { useLastMonthAnalysis } from "../../../tanstack/hooks/queries/analysisQueries";

const SalesChart = () => {
  const {data} = useLastMonthAnalysis()
  
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-200">
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-zinc-900">
          Sales Overview
        </h2>

        <p className="text-sm text-zinc-500 mt-1">
          Monthly sales overview
        </p>
      </div>

      <div className="w-full h-87.5">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>      
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#18181B"
              fill="#F97316"
              fillOpacity={0.15}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;