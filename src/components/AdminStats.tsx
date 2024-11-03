import React from 'react';
import { BarChart3, Users, TrendingUp } from 'lucide-react';
import { regions } from '../data';

interface AdminStatsProps {
  votes: Record<string, any>;
}

const AdminStats: React.FC<AdminStatsProps> = ({ votes }) => {
  const totalVotes = Object.keys(votes).length;
  const totalEligibleVoters = regions.reduce((acc, region) => acc + region.population, 0);
  const turnoutPercentage = ((totalVotes / totalEligibleVoters) * 100).toFixed(1);
  const activeRegions = new Set(Object.values(votes).map(vote => vote.region)).size;

  const stats = [
    {
      label: 'Total Votes',
      value: totalVotes.toLocaleString(),
      icon: BarChart3,
      color: 'bg-blue-500',
    },
    {
      label: 'Turnout',
      value: `${turnoutPercentage}%`,
      icon: Users,
      color: 'bg-green-500',
    },
    {
      label: 'Active Regions',
      value: activeRegions,
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="grid gap-4">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className={`${color} p-3 rounded-lg`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{label}</p>
              <p className="text-2xl font-semibold text-gray-900">{value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;