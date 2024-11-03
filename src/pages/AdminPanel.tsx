import React, { useEffect } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import AdminStats from '../components/AdminStats';
import RegionalBreakdown from '../components/RegionalBreakdown';
import TurnoutChart from '../components/TurnoutChart';

const AdminPanel: React.FC = () => {
  const { votes, loading, error } = useFirebase();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error loading data: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <AdminStats votes={votes} />
        
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Regional Breakdown</h2>
            <RegionalBreakdown votes={votes} />
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Voter Turnout</h2>
            <TurnoutChart votes={votes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;