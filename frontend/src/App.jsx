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
import { AnimatePresence } from 'framer-motion';

import HomePage from './HomePage';
import DrawerLayout from './DrawerLayout';
import Onboarding from './Onboarding';

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

// Importe o componente de proteção
import ProtectedRoute from './components/auth/ProtectedRoute';

const AppRoutes = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/main');
  const isCallRoute = location.pathname.startsWith('/main/call');
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';
  const isOnboardingRoute = location.pathname === '/onboarding';

  return (
    <div className={`flex flex-col min-h-screen ${isDashboardRoute ? 'bg-slate-100' : isAuthRoute ? 'bg-white' : 'bg-gradient-to-br from-slate-50 to-sky-100'} text-slate-800`}>
      <Toaster />
      {!isDashboardRoute && !isCallRoute && !isAuthRoute && !isOnboardingRoute && <Header />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Landing Page */}
          <Route path="/" element={<HomePage />} />

          {/* Páginas de autenticação */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rota de Onboarding */}
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Rotas do sistema agora protegidas */}
          <Route 
            path="/main/*" 
            element={
              <ProtectedRoute>
                {/* O conteúdo abaixo só é acessível se o usuário estiver logado */}
                <Routes>
                    {/* Layout principal do painel */}
                    <Route path="/" element={<DrawerLayout />}>
                      <Route index element={<Navigate to="talk" replace />} />
                      <Route path="talk" element={<Talk />} />
                      <Route path="agents" element={<Agents />} />
                      <Route path="contacts" element={<Contacts />} />
                      <Route path="certifications" element={<Certifications />} />
                      <Route path="profile" element={<Profile />} />
                      <Route path="config" element={<ConfigurationsPage />} />
                    </Route>
                    {/* Rotas de chamada (também protegidas) */}
                    <Route path="/call-loading" element={<CallLoadingPage />} />
                    <Route path="/call/:callId" element={<CallPage />} />
                </Routes>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AnimatePresence>

      {!isDashboardRoute && !isCallRoute && !isAuthRoute && !isOnboardingRoute && <Footer />}
    </div>
  );
};

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;