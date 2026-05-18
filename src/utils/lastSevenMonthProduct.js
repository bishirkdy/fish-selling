export const lastSevenMonthProductCalculation = (data) => {
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
  const currentDate = new Date()
  const lastSevenMonth = []
  for(let i = 6 ; i >= 0 ; i--){
    const date = new Date(currentDate.getFullYear() , currentDate.getMonth() - i , 1)
    lastSevenMonth.push({
        month : months[date.getMonth()],
        year : date.getFullYear(),
        product : 0
    }) 
  }
  
  data.forEach((item) => {
    const date = new Date(item.createdAt);
    const itemMonth = months[date.getMonth()]
    const itemYear = date.getFullYear();

    
    const existingMonth = lastSevenMonth.find((m) => {        
        return m.month === itemMonth && m.year === itemYear
    })       
    if(existingMonth) {
        existingMonth.product += 1
    }
  })
  return lastSevenMonth.map(item => ({
    month : item.month,
    year : item.year,
    productCount : item.product,
  }))
};
