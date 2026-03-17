import React from "react"
import {PieChart,Pie,Cell,Tooltip,Legend} from "recharts"

const ChartsBuySell = ({data}) => {

const COLORS = ["#22c55e","#ef4444"]

return(

<PieChart width={300} height={350}>

<Pie
data={data}
dataKey="total"
nameKey="trade_type"
cx="40%"
cy="50%"
outerRadius={120}
label
>

{data.map((entry,index)=>(
<Cell key={index} fill={COLORS[index % COLORS.length]}/>
))}

</Pie>

<Tooltip/>
<Legend/>

</PieChart>

)

}

export default ChartsBuySell