import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 2780 },
  { name: "May", sales: 1890 },
  { name: "Jun", sales: 2390 },
  { name: "Jul", sales: 3490 },
];

const SalesChart = () => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-200">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-zinc-900">
          Sales Overview
        </h2>

        <p className="text-sm text-zinc-500 mt-1">
          Monthly sales overview
        </p>
      </div>

      {/* Chart */}
      <div className="w-full h-87.5">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

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