// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCamera } from 'react-icons/hi2';
import logo from '../assets/logo.png';

const links = [
  { path: '/',               label: 'Home' },
  { path: '/general-rating', label: 'General' },
  { path: '/personalized',   label: 'My score' },
  { path: '/scan',           label: 'Scan' },
  { path: '/about',          label: 'About' },
];

const Navbar = () => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled
          ? 'bg-brand-bg/90 backdrop-blur-xl border-b border-gold/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="ValidEats Home">
            <motion.img
              src={logo}
              alt="ValidEats"
              className="h-10 md:h-12 w-auto object-contain"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="hidden sm:block leading-none">
              <span className="font-elegant gold-text text-2xl leading-none">ValidEats</span>
              <p className="text-[10px] text-slate-500 tracking-wide mt-0.5 font-medium">Food scores</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const active = pathname === link.path;
              return (
                <Link key={link.path} to={link.path}
                  className={`relative px-3 py-2 text-[13px] font-semibold tracking-wide rounded-xl transition-all duration-200
                    ${active ? 'text-gold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                  {link.label}
                  {active && (
                    <motion.div layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl bg-gold/10 border border-gold/25"
                      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/scan">
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="btn-gold rounded-xl px-5 py-2.5 text-sm flex items-center gap-2"
              >
                <HiCamera size={18} className="shrink-0 relative z-[2] text-brand-bg" aria-hidden />
                <span className="relative z-[2]">Scan</span>
              </motion.button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            aria-label="Menu"
          >
            <div className="w-5 space-y-1.5">
              <motion.span animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="block h-0.5 bg-current rounded-full" />
              <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-0.5 bg-current rounded-full" />
              <motion.span animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="block h-0.5 bg-current rounded-full" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-brand-bg/98 backdrop-blur-xl border-t border-gold/10"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link to={link.path}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors
                      ${pathname === link.path ? 'bg-gold/10 text-gold border border-gold/20' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="pt-2">
                <Link to="/scan" className="btn-gold rounded-xl px-5 py-3 text-sm w-full flex items-center justify-center gap-2">
                  <HiCamera size={18} className="shrink-0 relative z-[2] text-brand-bg" aria-hidden />
                  <span className="relative z-[2]">Scan</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
