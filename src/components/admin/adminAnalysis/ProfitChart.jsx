import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useLastMonthAnalysis } from '../../../tanstack/hooks/queries/analysisQueries';

// #region Sample data
// const data = [
//   {
//     name: 'Page A',
//     uv: 590,
//     pv: 800,
//     amt: 1400,
//   },
//   {
//     name: 'Page B',
//     uv: 868,
//     pv: 967,
//     amt: 1506,
//   },
//   {
//     name: 'Page C',
//     uv: 1397,
//     pv: 1098,
//     amt: 989,
//   },
//   {
//     name: 'Page D',
//     uv: 1480,
//     pv: 1200,
//     amt: 1228,
//   },
//   {
//     name: 'Page E',
//     uv: 1520,
//     pv: 1108,
//     amt: 1100,
//   },
//   {
//     name: 'Page F',
//     uv: 1400,
//     pv: 680,
//     amt: 1700,
//   },
// ];

// #endregion
export const ProfitChart = () => {
  const {data : profitData , isLoading} = useLastMonthAnalysis()
    if (isLoading) return <p>Loading...</p>

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <ComposedChart
          width={800}
          height={400}
          data={profitData}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="month" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="sales" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="profit" barSize={20} opacity={"80%"} fill="#F97316" />
          {/* <Line type="monotone" dataKey="profit" stroke="#ff7300" /> */}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};