import React from 'react';
import { Candidate } from '../types';

interface ElectoralCountProps {
  candidates: Candidate[];
  calculateVotes: (candidateId: string) => number;
}

const ElectoralCount: React.FC<ElectoralCountProps> = ({
  candidates,
  calculateVotes,
}) => {
  const totalVotes = candidates.reduce((acc, candidate) => acc + calculateVotes(candidate.id), 0);
  const votesToWin = Math.floor(totalVotes / 2) + 1;

  return (
    <div className="space-y-4">
      {candidates.map((candidate) => {
        const votes = calculateVotes(candidate.id);
        const percentage = totalVotes === 0 ? 0 : (votes / totalVotes) * 100;

        return (
          <div key={candidate.id} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{candidate.name}</span>
              <span>{votes} votes ({percentage.toFixed(1)}%)</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: candidate.color,
                }}
              />
            </div>
          </div>
        );
      })}

      <div className="pt-4 border-t">
        <div className="text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Votes to win:</span>
            <span className="font-medium">{votesToWin}</span>
          </div>
          <div className="flex justify-between">
            <span>Total votes:</span>
            <span className="font-medium">{totalVotes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectoralCount;