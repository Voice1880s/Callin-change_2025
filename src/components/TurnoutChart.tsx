import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { regions } from '../data';

interface TurnoutChartProps {
  votes: Record<string, any>;
}

const TurnoutChart: React.FC<TurnoutChartProps> = ({ votes }) => {
  const data = regions.map(region => {
    const regionVotes = Object.values(votes).filter(
      (vote: any) => vote.region === region.id
    ).length;
    
    const turnoutPercentage = (regionVotes / region.population) * 100;
    
    return {
      name: region.name,
      turnout: parseFloat(turnoutPercentage.toFixed(1)),
    };
  });

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end" 
            height={70} 
            interval={0}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            label={{ 
              value: 'Turnout %', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle' }
            }}
          />
          <Tooltip />
          <Bar 
            dataKey="turnout" 
            fill="#3B82F6"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TurnoutChart;