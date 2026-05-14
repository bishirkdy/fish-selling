import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "1 Star",
    value: 10,
    fill: "#F97316",
  },
  {
    name: "2 Star",
    value: 30,
    fill: "#06B6D4",
  },
  {
    name: "3 Star",
    value: 15,
    fill: "#0B1220",
  },
  {
    name: "4 Star",
    value: 50,
    fill: "#e38e51",
  },
  {
    name: "5 Star",
    value: 42,
    fill: "#a4de6c",
  },
];

const RatingChart = () => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-200 h-full">
      <div className="">
        <h2 className="text-xl font-bold text-zinc-900">Customer Ratings</h2>
        <p className="text-sm text-zinc-500 mt-1">
          Product review distribution
        </p>
      </div>
      <div className="h-87.5">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="15%"
            outerRadius="95%"
            data={data}
            startAngle={360}
            endAngle={0}
          >
            <RadialBar minAngle={15} background clockWise dataKey="value" style={{paddingBottom : "8px"}} />

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
