// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import GeneralRatingPage from './pages/GeneralRatingPage';
import PersonalizedRatingPage from './pages/PersonalizedRatingPage';
import ScanRatePage from './pages/ScanRatePage';
import ResultPage from './pages/ResultPage';
import AboutPage from './pages/AboutPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App = () => (
  <Router>
    <ScrollToTop />
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/"                element={<HomePage />}             />
          <Route path="/general-rating"  element={<GeneralRatingPage />}    />
          <Route path="/personalized"    element={<PersonalizedRatingPage />} />
          <Route path="/scan"            element={<ScanRatePage />}          />
          <Route path="/result/:id"      element={<ResultPage />}            />
          <Route path="/about"           element={<AboutPage />}             />
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center text-center px-4">
              <div>
                <p className="text-6xl mb-4">◈</p>
                <p className="font-mono font-bold text-xl text-gray-300 mb-2">404 — NODE NOT FOUND</p>
                <p className="text-gray-600 font-mono text-sm mb-6">This route does not exist in the system.</p>
                <a href="/" className="text-neon-blue font-mono text-sm border border-neon-blue/40 px-4 py-2 rounded hover:bg-neon-blue/10 transition-colors">
                  [RETURN TO HOME]
                </a>
              </div>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
);

export default App;
