export const analysisCalculation = (data) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentDate = new Date();
  const last7Months = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1,
    );

    last7Months.push({
      month: months[date.getMonth()],
      year: date.getFullYear(),
      sales: 0,
      profit : 0,
    });
  }
  
  data.forEach((item) => {
    const itemDate = new Date(item.date);    
    const itemMonth = months[itemDate.getMonth()];
    const itemYear = itemDate.getFullYear();

    const existingMonth = last7Months.find(
      (m) => m.month === itemMonth && m.year === itemYear,
    );

    if (existingMonth) {
      existingMonth.sales += Number(item.total || 0);
      existingMonth.profit += Number(item.profit || 0);
    }
  });
  return last7Months.map((item) => ({
    month: item.month,
    sales: item.sales,
    profit : Math.round(item.profit)
  }));
};
