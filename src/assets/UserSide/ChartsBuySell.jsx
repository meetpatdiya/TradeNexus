import React from "react"
import {PieChart,Pie,Cell,Tooltip,Legend,ResponsiveContainer} from "recharts"

const ChartsBuySell = ({data}) => {

const COLORS = ["#22c55e","#ef4444"]

return(
    <div style={{ width: "100%", height: 350 }}>
<ResponsiveContainer>
<PieChart >

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
</ResponsiveContainer>
</div>
)

}

export default ChartsBuySell