// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => (
  <footer className="relative overflow-hidden border-t border-gold/10"
    style={{ background: 'linear-gradient(180deg, #080B14 0%, #0D0A14 100%)' }}>

    {/* Top gold line */}
    <div className="gold-divider" />

    {/* Background glow */}
    <div className="orb orb-gold absolute" style={{ width: 300, height: 300, bottom: '-80px', left: '20%', opacity: 0.15 }} />

    <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-14">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <img src={logo} alt="ValidEats" className="h-14 w-auto object-contain"
              onError={(e) => { e.target.style.display = 'none'; }} />
            <div>
              <p className="serif text-xl font-bold gold-text">ValidEats</p>
              <p className="text-[10px] text-slate-600 tracking-widest uppercase">Verified Star Ratings</p>
            </div>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
            The smart way to understand how packaged food affects <em className="text-slate-400 not-italic">your</em> health — personalised, instant, and evidence-based.
          </p>
          <div className="flex items-center gap-2 mt-5">
            <span className="w-1.5 h-1.5 rounded-full bg-safe animate-pulse" />
            <span className="text-slate-600 text-xs">System Active · Hackathon 2026</span>
          </div>
        </div>

        {/* Links */}
        <div>
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-4">Features</p>
          <ul className="space-y-3">
            {[
              { to: '/general-rating', label: 'General Rating', icon: '⭐' },
              { to: '/personalized',   label: 'Personalized Rating', icon: '🧬' },
              { to: '/scan',           label: 'Scan & Rate', icon: '📸' },
              { to: '/about',          label: 'About ValidEats', icon: '📘' },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-slate-500 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                  <span className="text-xs group-hover:scale-125 transition-transform">{l.icon}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Rating guide */}
        <div>
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-4">Rating Guide</p>
          <ul className="space-y-3">
            {[
              { color: 'bg-safe',    label: '4–5 ★ Safe to consume' },
              { color: 'bg-caution', label: '2.5–3.9 ★ Moderate intake' },
              { color: 'bg-risk',    label: '0–2.4 ★ Limit or avoid' },
            ].map((r) => (
              <li key={r.label} className="flex items-center gap-2.5 text-sm text-slate-500">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${r.color}`} />
                {r.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="gold-divider-subtle mb-6" />
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-700">
        <p>© 2026 ValidEats · Verified Star Ratings · Built for Hackathon 2026</p>
        <p>For informational purposes only. Not a substitute for medical advice.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
