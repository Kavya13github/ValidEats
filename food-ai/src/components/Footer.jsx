// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => (
  <footer className="bg-charcoal-900 border-t border-charcoal-800 mt-auto">
    <div className="gold-divider" />
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="ValidEats" className="h-12 w-auto object-contain"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <p className="text-charcoal-400 text-sm leading-relaxed max-w-xs">
            The Michelin Guide for everyday food, powered by health intelligence. We don't just rate food — we explain how it affects you.
          </p>
          <div className="flex items-center gap-2 mt-5">
            <span className="w-1.5 h-1.5 rounded-full bg-safe animate-pulse" />
            <span className="text-charcoal-500 text-xs">System Active · Hackathon 2026</span>
          </div>
        </div>

        {/* Pages */}
        <div>
          <p className="text-gold text-xs font-medium tracking-widest uppercase mb-4">Features</p>
          <ul className="space-y-2.5">
            {[
              { to: '/general-rating', label: 'General Rating' },
              { to: '/personalized',   label: 'Personalized Rating' },
              { to: '/scan',           label: 'Scan & Rate' },
              { to: '/about',          label: 'About ValidEats' },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-charcoal-400 hover:text-white text-sm transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Health guide */}
        <div>
          <p className="text-gold text-xs font-medium tracking-widest uppercase mb-4">Rating Guide</p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-safe flex-shrink-0" />
              <span className="text-charcoal-400">4–5 ★ — Safe to consume</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-caution flex-shrink-0" />
              <span className="text-charcoal-400">2.5–3.9 ★ — Moderate intake</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-risk flex-shrink-0" />
              <span className="text-charcoal-400">0–2.4 ★ — Limit or avoid</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="gold-divider mt-10 mb-6" />
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-charcoal-600">
        <p>© 2026 ValidEats · Verified Star Ratings · Hackathon Project</p>
        <p>For informational use only. Not a substitute for medical advice.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
