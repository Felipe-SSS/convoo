import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import HomePage from './HomePage';
import DrawerLayout from './DrawerLayout';

import Talk from './pages/Talk';
import Agents from './pages/Agents';
import Contacts from './pages/Contacts';
import Certifications from './pages/Certifications';
import Profile from './pages/Profile';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-sky-100 text-slate-800 font-sans">
        <Toaster />
        <Routes>
          {/* ROTAS COM LAYOUT COMPLETO */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <main className="flex-grow">
                  <HomePage />
                </main>
                <Footer />
              </>
            }
          />

          {/* ROTAS DO SISTEMA COM DRAWER */}
          <Route path="/main" element={<DrawerLayout />}>
            <Route index element={<Talk />} />
            <Route path="talk" element={<Talk />} />
            <Route path="agents" element={<Agents />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="certifications" element={<Certifications />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
