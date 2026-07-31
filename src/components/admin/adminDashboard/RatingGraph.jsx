import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useGetRatingCount } from "../../../tanstack/hooks/queries/analysis/adminAnalysisQueries";

const RatingChart = () => {
  const { data, isLoading } = useGetRatingCount();

  if (isLoading) {
    return (
      <div className="rounded-3xl p-6 shadow-sm border border-gray-200 h-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const chartData = [
    {
      name: "5 Star",
      value: data?.fiveStar ?? 0,
      fill: "#22c55e",
    },
    {
      name: "4 Star",
      value: data?.fourStar ?? 0,
      fill: "#3b82f6",
    },
    {
      name: "3 Star",
      value: data?.threeStar ?? 0,
      fill: "#eab308",
    },
    {
      name: "2 Star",
      value: data?.twoStar ?? 0,
      fill: "#f97316",
    },
    {
      name: "1 Star",
      value: data?.oneStar ?? 0,
      fill: "#ef4444",
    },
  ];

  return (
    <div className="rounded-3xl p-6 shadow-sm border border-gray-200 h-full">
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          Customer Ratings
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Product review distribution
        </p>
      </div>

      <div className="h-87.5">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="15%"
            outerRadius="75%"
            data={chartData}
            startAngle={360}
            endAngle={0}
          >
            <RadialBar
              dataKey="value"
              minAngle={15}
              background
              clockWise
            />

            <Legend
              iconSize={14}
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
            />

            <Tooltip />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RatingChart;