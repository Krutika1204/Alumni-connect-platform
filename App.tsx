import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Directory from './pages/Directory';
import Events from './pages/Events';
import EventDetailPage from './pages/EventDetailPage';
import Forums from './pages/Forums';
import Mentorship from './pages/Mentorship';
import Fundraising from './pages/Fundraising';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import Header from './components/Header';
import { UserRole } from './types';
import AlumniDashboard from './pages/AlumniDashboard';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <HashRouter>
          <Main />
        </HashRouter>
      </DataProvider>
    </AuthProvider>
  );
};

const Main: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {user && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={user ? <Dashboard /> : <LandingPage />} />
          <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/directory" element={user ? <Directory /> : <Navigate to="/login" />} />
          <Route path="/events" element={user ? <Events /> : <Navigate to="/login" />} />
          <Route path="/events/:eventId" element={user ? <EventDetailPage /> : <Navigate to="/login" />} />
          <Route path="/forums" element={user ? <Forums /> : <Navigate to="/login" />} />
          <Route path="/mentorship" element={user ? <Mentorship /> : <Navigate to="/login" />} />
          <Route path="/fundraising" element={user ? <Fundraising /> : <Navigate to="/login" />} />
          <Route
            path="/admin"
            element={user && user.role === UserRole.Admin ? <AdminDashboard /> : <Navigate to="/" />}
          />
           <Route
            path="/alumni-dashboard"
            element={user && user.role === UserRole.Alumni ? <AlumniDashboard /> : <Navigate to="/" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;