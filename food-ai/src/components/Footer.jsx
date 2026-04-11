// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="border-t border-neon-blue/10 mt-auto bg-lab-bg/80">
    {/* Top line */}
    <div className="h-px bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent" />
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="md:col-span-2">
          <p className="font-mono font-bold text-lg text-white mb-2">
            VALID<span className="neon-text">EATS</span>
            <span className="text-gray-600 text-xs ml-2">v2.0</span>
          </p>
          <p className="text-gray-500 font-mono text-xs leading-relaxed max-w-xs">
            We don't rate food. We simulate its effect on YOU. AI-powered food health analysis for everyone.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <span className="flex items-center gap-1.5 text-xs font-mono text-neon-blue/60 border border-neon-blue/20 px-3 py-1.5 rounded">
              <span className="w-1.5 h-1.5 bg-safe rounded-full animate-pulse" /> SYSTEM ONLINE
            </span>
            <span className="text-xs font-mono text-gray-700 border border-lab-border px-3 py-1.5 rounded">
              🏆 Hackathon 2026
            </span>
          </div>
        </div>

        {/* Modules */}
        <div>
          <p className="hud-label mb-4">Modules</p>
          <ul className="space-y-2.5">
            {[
              { to: '/general-rating', label: '01. Lab Analysis' },
              { to: '/personalized',   label: '02. DNA Mode' },
              { to: '/scan',           label: '03. AI Scanner' },
              { to: '/about',          label: '04. System Info' },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-gray-600 hover:text-neon-blue font-mono text-xs transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Status Legend */}
        <div>
          <p className="hud-label mb-4">Status Legend</p>
          <ul className="space-y-2.5 font-mono text-xs">
            <li className="flex items-center gap-2 text-safe"><span className="w-2 h-2 rounded-full bg-safe shadow-neon-green" /> SAFE — Consume freely</li>
            <li className="flex items-center gap-2 text-caution"><span className="w-2 h-2 rounded-full bg-caution" /> MODERATE — Watch intake</li>
            <li className="flex items-center gap-2 text-risk"><span className="w-2 h-2 rounded-full bg-risk shadow-neon-red" /> RISK — Limit / Avoid</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-lab-border flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-gray-700 font-mono text-xs">© 2026 ValidEats AI Lab · Hack for Health</p>
        <p className="text-gray-800 font-mono text-xs">⚠ For informational use only. Not medical advice.</p>
      </div>
    </div>
    <div className="h-px bg-gradient-to-r from-transparent via-neon-purple/20 to-transparent" />
  </footer>
);

export default Footer;
