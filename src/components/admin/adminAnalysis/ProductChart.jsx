import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useLastMonthsProductCount } from '../../../tanstack/hooks/queries/analysisQueries';

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
const SameDataComposedChart = () => {
  const {data : productChart , isLoading , isError} = useLastMonthsProductCount()
  console.log(productChart);
  
  return (
    <ComposedChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={productChart?.calculated}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="month" scale="band" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Bar dataKey="productCount" legendType='none' tooltipType='none' barSize={20} fill="#F97316" opacity={"80%"} />
      <Line type="monotone" dataKey="productCount" stroke="#ff7300" />
    </ComposedChart>
  );
};

export default SameDataComposedChart;