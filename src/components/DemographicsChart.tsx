import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface DemographicsChartProps {
  data: Record<string, any>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DemographicsChart: React.FC<DemographicsChartProps> = ({ data }) => {
  // Example demographics data
  const chartData = [
    { name: '18-25', value: 30 },
    { name: '26-40', value: 40 },
    { name: '41-60', value: 20 },
    { name: '60+', value: 10 },
  ];

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DemographicsChart;