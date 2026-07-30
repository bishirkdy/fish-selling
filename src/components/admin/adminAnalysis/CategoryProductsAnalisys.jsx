import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useCategoryDistribution } from "../../../tanstack/hooks/queries/analysisQueries";

const style = {
  top: "50%",
  right: 0,
  transform: "translate(0, -50%)",
  lineHeight: "24px",
};

export const CategoryChart = () => {
  const { data: categoryData, isLoading } = useCategoryDistribution();
  if (isLoading) return <p>Loading...</p>;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        maxHeight: "80vh",
        aspectRatio: 1.618,
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="30%"
          outerRadius="100%"
          cx="30%"
          cy="50%"
          barSize={14}
          data={categoryData}
        >
          <RadialBar
            // background
            dataKey="value"
            label={{
              position: "center",
              fill: "#fff",
            }}
          />

          <Legend
            iconSize={10}
            layout="vertical"
            verticalAlign="middle"
            wrapperStyle={style}
          />
          <Tooltip />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};
