import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthLayoutLogin from '@/components/layout/AuthLayoutLogin';
import AuthLayoutRegister from '@/components/layout/AuthLayoutRegister';
import { AnimatePresence } from 'framer-motion';

import HomePage from './HomePage';
import DrawerLayout from './DrawerLayout';

import Talk from './pages/Talk';
import Agents from './pages/Agents';
import Contacts from './pages/Contacts';
import Certifications from './pages/Certifications';
import Profile from './pages/Profile';
import ConfigurationsPage from './pages/ConfigurationsPage';

import Login from './Login';
import Register from './Register';

import CallLoadingPage from './pages/CallLoadingPage';
import CallPage from './pages/CallPage';

const AppRoutes = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/main');
  const isCallRoute = location.pathname.startsWith('/main/call');
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className={`flex flex-col min-h-screen ${isDashboardRoute ? 'bg-slate-100' : isAuthRoute ? 'bg-white' : 'bg-gradient-to-br from-slate-50 to-sky-100'} text-slate-800`}>
      <Toaster />
      {!isDashboardRoute && !isCallRoute && !isAuthRoute && <Header />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Landing Page */}
          <Route path="/" element={<HomePage />} />

          {/* Páginas de autenticação com AuthLayout */}
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          {/* Rotas do sistema */}
          <Route path="/main" element={<DrawerLayout />}>
            <Route index element={<Navigate to="talk" replace />} />
            <Route path="talk" element={<Talk />} />
            <Route path="agents" element={<Agents />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="certifications" element={<Certifications />} />
            <Route path="profile" element={<Profile />} />
            <Route path="config" element={<ConfigurationsPage />} />
          </Route>

          {/* Chamadas */}
          <Route path="/main/call-loading" element={<CallLoadingPage />} />
          <Route path="/main/call/:callId" element={<CallPage />} />
        </Routes>
      </AnimatePresence>

      {!isDashboardRoute && !isCallRoute && !isAuthRoute && <Footer />}
    </div>
  );
};

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;
