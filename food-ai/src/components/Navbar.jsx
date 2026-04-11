// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const links = [
  { path: '/',               label: 'Home' },
  { path: '/general-rating', label: 'General Rating' },
  { path: '/personalized',   label: 'Personalized' },
  { path: '/scan',           label: 'Scan & Rate' },
  { path: '/about',          label: 'About' },
];

const Navbar = () => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400
      ${scrolled ? 'bg-charcoal-900/95 backdrop-blur-md border-b border-charcoal-800 shadow-elegant' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-18 py-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="ValidEats"
              className="h-10 w-auto object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden items-center gap-2">
              <span className="font-serif text-xl font-bold gold-text">ValidEats</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-xs text-charcoal-500 tracking-widest uppercase font-medium">Verified Star Ratings</p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm rounded-lg transition-all duration-200 font-medium
                    ${active
                      ? 'text-gold'
                      : 'text-charcoal-300 hover:text-white hover:bg-charcoal-800'
                    }`}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-1 left-3 right-3 h-px bg-gold/60"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/scan"
              className="flex items-center gap-2 bg-gold text-charcoal-900 font-medium text-sm px-5 py-2.5 rounded-xl
                hover:bg-gold-light transition-all duration-200 shadow-gold hover:shadow-gold-hover">
              📸 Scan Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 text-charcoal-300 hover:text-white transition-colors"
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 bg-current transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-6 bg-current transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-current transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-charcoal-900 border-t border-charcoal-800"
        >
          <div className="px-4 py-4 space-y-1">
            {links.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link key={link.path} to={link.path}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors
                    ${active ? 'bg-charcoal-800 text-gold' : 'text-charcoal-300 hover:bg-charcoal-800 hover:text-white'}`}>
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link to="/scan" className="block text-center bg-gold text-charcoal-900 font-medium text-sm px-5 py-3 rounded-xl">
                📸 Scan Now
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
