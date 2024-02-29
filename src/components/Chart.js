"use client";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from "recharts";

export default function Chart({data}) {

  return (
    
    <ResponsiveContainer width="100%" height={250}>
      <LineChart 
        width={730} 
        height={250} 
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 
      }}>

        <CartesianGrid 
          horizontal={false} 
          strokeWidth={5}
          stroke="#f5f5f5"
        />

        <XAxis 
          dataKey="date"  
          tickMargin={10} 
          tick={{fill:'#aaa'}}
          axisLine={{strokeWidth: 0.4}}
        />

        <YAxis  
          tickLine={false} 
          tick={{fill:'#aaa'}}
          axisLine={{strokeWidth: 0.4}}
        />

        <Tooltip />

        <Line 
          type="monotone" 
          dataKey="views" 
          stroke="#09f" 
          strokeWidth={2}
        />

      </LineChart>
    </ResponsiveContainer>
  );
}
