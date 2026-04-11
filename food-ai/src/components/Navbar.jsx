// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const links = [
  { path: '/',                label: 'Home',          code: '01' },
  { path: '/general-rating',  label: 'Lab Analysis',  code: '02' },
  { path: '/personalized',    label: 'DNA Mode',      code: '03' },
  { path: '/scan',            label: 'AI Scanner',    code: '04', badge: 'AI' },
  { path: '/about',           label: 'System',        code: '05' },
];

const Navbar = () => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [clock,     setClock]     = useState('');
  const location = useLocation();

  useEffect(() => {
    window.addEventListener('scroll', () => setScrolled(window.scrollY > 20));
    const tick = () => setClock(new Date().toLocaleTimeString('en-US', { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-strong border-b border-neon-blue/10' : 'bg-transparent'}`}>
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-neon-blue/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9">
              <div className="w-9 h-9 rounded-lg bg-neon-blue/10 border border-neon-blue/40 flex items-center justify-center font-mono font-bold text-sm text-neon-blue group-hover:shadow-neon transition-all">
                VE
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-safe rounded-full border border-lab-bg animate-pulse" />
            </div>
            <div>
              <p className="font-mono font-bold text-base text-white tracking-wider">VALID<span className="neon-text">EATS</span></p>
              <p className="text-gray-600 text-xs font-mono">AI Health Lab</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200 font-mono text-xs uppercase tracking-wider
                    ${active ? 'text-neon-blue bg-neon-blue/10 border border-neon-blue/30' : 'text-gray-500 hover:text-gray-200 hover:bg-lab-card'}`}
                >
                  <span className="text-gray-700">{link.code}.</span>
                  {link.label}
                  {link.badge && (
                    <span className="text-xs bg-neon-purple/20 text-neon-purple px-1.5 py-0.5 rounded font-mono border border-neon-purple/30">{link.badge}</span>
                  )}
                  {active && (
                    <motion.div layoutId="nav-indicator"
                      className="absolute -bottom-0.5 left-2 right-2 h-px bg-neon-blue shadow-neon-sm" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Clock + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-gray-700 font-mono text-xs">{clock}</span>
            <Link to="/scan"
              className="flex items-center gap-2 border border-neon-blue/50 text-neon-blue text-xs font-mono uppercase tracking-wider
                px-4 py-2 rounded-lg hover:bg-neon-blue/10 hover:shadow-neon transition-all">
              <span className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-pulse" />
              Scan Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 text-gray-500 hover:text-neon-blue transition-colors font-mono text-sm"
          >
            {menuOpen ? '[X]' : '[≡]'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-strong border-t border-neon-blue/10"
        >
          <div className="px-4 py-4 space-y-1">
            {links.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link key={link.path} to={link.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg font-mono text-xs uppercase tracking-wider transition-all
                    ${active ? 'bg-neon-blue/10 border border-neon-blue/30 text-neon-blue' : 'text-gray-500 hover:bg-lab-card hover:text-gray-200'}`}>
                  <span><span className="text-gray-700 mr-2">{link.code}.</span>{link.label}</span>
                  {link.badge && <span className="text-xs bg-neon-purple/20 text-neon-purple px-1.5 py-0.5 rounded">{link.badge}</span>}
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
