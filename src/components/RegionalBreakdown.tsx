import React from 'react';
import { regions, candidates } from '../data';

interface RegionalBreakdownProps {
  votes: Record<string, any>;
}

const RegionalBreakdown: React.FC<RegionalBreakdownProps> = ({ votes }) => {
  const getRegionStats = (regionId: string) => {
    const regionVotes = Object.values(votes).filter(
      (vote: any) => vote.region === regionId
    );
    
    const total = regionVotes.length;
    const breakdown = candidates.map(candidate => ({
      ...candidate,
      votes: regionVotes.filter((vote: any) => vote.candidate === candidate.id).length,
      percentage: total ? (regionVotes.filter((vote: any) => 
        vote.candidate === candidate.id).length / total * 100).toFixed(1) : '0.0',
    }));

    return { total, breakdown };
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Region
            </th>
            {candidates.map(candidate => (
              <th key={candidate.id} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {candidate.name}
              </th>
            ))}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {regions.map(region => {
            const { total, breakdown } = getRegionStats(region.id);
            return (
              <tr key={region.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {region.name}
                </td>
                {breakdown.map(candidate => (
                  <td key={candidate.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {candidate.votes} ({candidate.percentage}%)
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {total}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RegionalBreakdown;