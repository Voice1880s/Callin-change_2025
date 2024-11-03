import React, { useState } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { collection, addDoc } from 'firebase/firestore';
import { regions, candidates } from '../data';
import { useVoteRestriction } from '../hooks/useVoteRestriction';

const VotingPortal: React.FC = () => {
  const { db } = useFirebase();
  const { voteStatus, checking, recordVote } = useVoteRestriction();
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (checking) {
    return (
      <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-sm">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2">Verifying voting eligibility...</span>
        </div>
      </div>
    );
  }

  if (!voteStatus.canVote) {
    return (
      <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-center mb-4">Unable to Vote</h2>
        <p className="text-center text-gray-600">{voteStatus.reason}</p>
      </div>
    );
  }

  const handleVote = async () => {
    if (!selectedRegion || !selectedCandidate) {
      setError('Please select both a region and a candidate');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      await addDoc(collection(db, 'votes'), {
        region: selectedRegion,
        candidate: selectedCandidate,
        timestamp: new Date().toISOString(),
      });
      await recordVote();
    } catch (err) {
      console.error('Error casting vote:', err);
      setError('Failed to cast vote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Cast Your Vote</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Your Region
          </label>
          <select
            className="w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="">Choose a region...</option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Your Candidate
          </label>
          <div className="space-y-2">
            {candidates.map((candidate) => (
              <label
                key={candidate.id}
                className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="radio"
                  name="candidate"
                  value={candidate.id}
                  checked={selectedCandidate === candidate.id}
                  onChange={(e) => setSelectedCandidate(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">{candidate.name}</div>
                  <div className="text-sm text-gray-500">{candidate.party}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <button
          onClick={handleVote}
          disabled={loading || !selectedRegion || !selectedCandidate}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Cast Vote'}
        </button>
      </div>
    </div>
  );
};

export default VotingPortal;