import React from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import RegionMap from '../components/RegionMap';
import VotingStats from '../components/VotingStats';
import DemographicsChart from '../components/DemographicsChart';

const Dashboard: React.FC = () => {
  const { votes } = useFirebase();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Cameroon Election Dashboard 2025</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Regional Overview</h2>
            <RegionMap votes={votes} />
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Current Results</h2>
            <VotingStats votes={votes} />
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Demographics</h2>
            <DemographicsChart data={votes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;