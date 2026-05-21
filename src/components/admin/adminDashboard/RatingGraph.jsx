import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetRatingCount } from "../../../tanstack/hooks/queries/analysisQueries";


const RatingChart = () => {
  const {data , isLoading} = useGetRatingCount()

  return (
    <div className="rounded-3xl p-6 shadow-sm border border-gray-200 h-full">
      <div className="">
        <h2 className="text-xl font-bold text-gray-900">Customer Ratings</h2>
        <p className="text-sm text-gray-500 mt-1">
          Product review distribution
        </p>
      </div>
      <div className="h-87.5">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="15%"
            outerRadius="75%"
            data={data}
            startAngle={360}
            endAngle={0}
          >
            <RadialBar minAngle={15} background clockWise dataKey="value" style={{paddingBottom : "8px"}} />
            <Legend onLoad={isLoading}
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
