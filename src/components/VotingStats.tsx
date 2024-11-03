import React from 'react';
import { candidates } from '../data';

interface VotingStatsProps {
  votes: Record<string, any>;
}

const VotingStats: React.FC<VotingStatsProps> = ({ votes }) => {
  const totalVotes = Object.keys(votes).length;
  
  const getCandidateVotes = (candidateId: string) => {
    return Object.values(votes).filter(
      (vote: any) => vote.candidate === candidateId
    ).length;
  };

  return (
    <div className="space-y-4">
      {candidates.map(candidate => {
        const candidateVotes = getCandidateVotes(candidate.id);
        const percentage = totalVotes === 0 ? 0 : (candidateVotes / totalVotes) * 100;

        return (
          <div key={candidate.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">{candidate.name}</span>
              <span className="text-sm text-gray-500">
                {candidateVotes} votes ({percentage.toFixed(1)}%)
              </span>
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

      <div className="pt-4 border-t mt-4">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Total Votes Cast</span>
          <span className="font-medium">{totalVotes}</span>
        </div>
      </div>
    </div>
  );
};

export default VotingStats;