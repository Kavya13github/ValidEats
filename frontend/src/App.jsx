// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastProvider } from './components/Toast';
import AnimatedBackground from './components/AnimatedBackground';
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
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
};

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center text-center px-4"
    style={{ background: 'linear-gradient(180deg, #0D1020 0%, #080B14 100%)' }}>
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
      <motion.p animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-7xl mb-6">⭐</motion.p>
      <h1 className="serif text-3xl font-black text-white mb-3">Page Not Found</h1>
      <p className="text-slate-500 text-base mb-8">This page doesn't exist. Let's get you back on track.</p>
      <Link to="/" className="btn-gold rounded-2xl px-7 py-3.5 text-sm font-bold inline-flex items-center gap-2">
        ← Return Home
      </Link>
    </motion.div>
  </div>
);

const AppContent = () => {
  const location = useLocation();
  return (
    <div className="page-shell flex flex-col min-h-screen relative overflow-hidden">
      {/* Global moving particle background */}
      <AnimatedBackground />
      <div className="absolute inset-0 notion-grid pointer-events-none" />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/"               element={<PageTransition><HomePage /></PageTransition>}               />
            <Route path="/general-rating" element={<PageTransition><GeneralRatingPage /></PageTransition>}      />
            <Route path="/personalized"   element={<PageTransition><PersonalizedRatingPage /></PageTransition>} />
            <Route path="/scan"           element={<PageTransition><ScanRatePage /></PageTransition>}           />
            <Route path="/result/:id"     element={<PageTransition><ResultPage /></PageTransition>}             />
            <Route path="/about"          element={<PageTransition><AboutPage /></PageTransition>}              />
            <Route path="*"               element={<PageTransition><NotFound /></PageTransition>}               />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <ToastProvider>
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  </ToastProvider>
);

export default App;
