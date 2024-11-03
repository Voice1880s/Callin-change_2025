import React, { useMemo } from 'react';
import { regions, candidates } from '../data';
import { Region } from '../types';

interface RegionMapProps {
  votes: Record<string, any>;
  onRegionClick?: (regionId: string) => void;
}

const RegionMap: React.FC<RegionMapProps> = ({ votes = {}, onRegionClick }) => {
  const getRegionColor = (regionId: string) => {
    const regionVotes = Object.values(votes).filter(
      (vote: any) => vote.region === regionId
    );

    if (regionVotes.length === 0) return '#E5E7EB';

    const candidateVotes: Record<string, number> = {};
    regionVotes.forEach((vote: any) => {
      candidateVotes[vote.candidate] = (candidateVotes[vote.candidate] || 0) + 1;
    });

    if (Object.keys(candidateVotes).length === 0) return '#E5E7EB';

    const leadingCandidate = Object.entries(candidateVotes).reduce(
      (a, b) => (b[1] > a[1] ? b : a)
    )[0];

    const candidate = candidates.find(c => c.id === leadingCandidate);
    return candidate?.color || '#E5E7EB';
  };

  const regionElements = useMemo(() => {
    return regions.map(region => {
      const population = typeof region.population === 'number' 
        ? region.population.toLocaleString()
        : 'N/A';

      return (
        <div
          key={region.id}
          className="relative p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
          onClick={() => onRegionClick?.(region.id)}
          style={{
            backgroundColor: getRegionColor(region.id)
          }}
        >
          <h3 className="text-sm font-medium">{region.name}</h3>
          <p className="text-xs text-gray-500">
            Population: {population}
          </p>
        </div>
      );
    });
  }, [votes, onRegionClick]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {regionElements}
    </div>
  );
};

export default RegionMap;