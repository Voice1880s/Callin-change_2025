import React from 'react';
import { Candidate } from '../types';

interface CandidateListProps {
  candidates: Candidate[];
  onSelectCandidate: (candidateId: string) => void;
}

const CandidateList: React.FC<CandidateListProps> = ({
  candidates,
  onSelectCandidate,
}) => {
  return (
    <div className="space-y-3">
      {candidates.map((candidate) => (
        <button
          key={candidate.id}
          className="w-full flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
          onClick={() => onSelectCandidate(candidate.id)}
        >
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: candidate.color }}
          />
          <div className="flex-1 text-left">
            <div className="font-medium">{candidate.name}</div>
            <div className="text-sm text-gray-500">{candidate.party}</div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default CandidateList;