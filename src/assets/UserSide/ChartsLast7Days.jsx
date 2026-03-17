import React from "react"
import {BarChart,Bar,XAxis,YAxis,Tooltip,CartesianGrid} from "recharts"

const ChartsLast7Days = ({data}) => {
const weekDays = [
"Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
]

const formattedData = weekDays.map(day=>{
  const found = data.find(d=>d.day === day)
  return {
    day,
    total_trades: found ? found.total_trades : 0
  }
})
return(

<BarChart width={600} height={350} data={formattedData}>

<CartesianGrid strokeDasharray=" 3 3"/>

<XAxis dataKey="day" interval={0} />

<YAxis allowDecimals={false}/>

<Tooltip/>

<Bar dataKey="total_trades" fill="#3b82f6"/>

</BarChart>

)

}

export default ChartsLast7Days