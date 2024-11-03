import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FirebaseProvider } from './contexts/FirebaseContext';
import Dashboard from './pages/Dashboard';
import VotingPortal from './pages/VotingPortal';
import AdminPanel from './pages/AdminPanel';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <FirebaseProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/vote" element={<VotingPortal />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute password="Cameroon237">
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </FirebaseProvider>
  );
}

export default App;