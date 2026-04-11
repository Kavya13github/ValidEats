// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center text-center px-4">
    <div>
      <p className="text-6xl mb-4">★</p>
      <h1 className="serif-heading text-3xl font-bold text-white mb-2">Page Not Found</h1>
      <p className="text-charcoal-400 text-sm mb-8">This page doesn't exist. Let's get you back on track.</p>
      <Link to="/" className="inline-flex items-center gap-2 bg-gold text-charcoal-900 font-medium text-sm px-6 py-3 rounded-xl hover:bg-gold-light transition-colors shadow-gold">
        Return Home
      </Link>
    </div>
  </div>
);

const AppContent = () => {
  const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/"               element={<PageWrapper><HomePage /></PageWrapper>}               />
            <Route path="/general-rating" element={<PageWrapper><GeneralRatingPage /></PageWrapper>}      />
            <Route path="/personalized"   element={<PageWrapper><PersonalizedRatingPage /></PageWrapper>} />
            <Route path="/scan"           element={<PageWrapper><ScanRatePage /></PageWrapper>}           />
            <Route path="/result/:id"     element={<PageWrapper><ResultPage /></PageWrapper>}             />
            <Route path="/about"          element={<PageWrapper><AboutPage /></PageWrapper>}              />
            <Route path="*"               element={<PageWrapper><NotFound /></PageWrapper>}               />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <Router>
    <ScrollToTop />
    <AppContent />
  </Router>
);

export default App;
