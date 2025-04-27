
import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface LineChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  showLegend?: boolean;
  showAnimation?: boolean;
  className?: string;
  yAxisWidth?: number;
}

export const LineChart = ({
  data,
  index,
  categories,
  colors = ['#8884d8', '#82ca9d', '#ffc658'],
  valueFormatter,
  showLegend = true,
  showAnimation = false,
  className = '',
  yAxisWidth = 40,
}: LineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <RechartsLineChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey={index} 
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          width={yAxisWidth}
          tick={{ fontSize: 12 }}
          tickFormatter={valueFormatter}
        />
        <Tooltip 
          formatter={(value: number) => 
            valueFormatter ? valueFormatter(value) : value
          }
        />
        {showLegend && <Legend />}
        {categories.map((category, i) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[i % colors.length]}
            strokeWidth={2}
            activeDot={{ r: 6 }}
            isAnimationActive={showAnimation}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};
