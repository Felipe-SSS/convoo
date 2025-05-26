import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import HomePage from './HomePage';
import MainPage from './MainPage'; // nova página de exemplo

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-sky-100 text-slate-800">
        <Toaster />
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/main" element={<MainPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;