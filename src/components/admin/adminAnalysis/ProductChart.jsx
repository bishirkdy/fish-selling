import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useLastMonthsProductCount } from '../../../tanstack/hooks/queries/analysis/adminAnalysisQueries';


// endregion
const SameDataComposedChart = () => {
  const {data : productChart , isLoading , isError} = useLastMonthsProductCount()
    if (isLoading) return <p>Loading...</p>

  return (
    <ComposedChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={productChart}
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