import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => (
  <footer className="relative z-10 overflow-hidden border-t border-gold/10 backdrop-blur-md"
    style={{ background: 'linear-gradient(180deg, rgba(8,11,20,0.82) 0%, rgba(8,10,20,0.94) 55%, rgba(6,8,16,0.97) 100%)' }}>

    <div className="gold-divider" />

    <div className="orb orb-gold absolute" style={{ width: 300, height: 300, bottom: '-80px', left: '20%', opacity: 0.15 }} />

    <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-14">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <img src={logo} alt="ValidEats" className="h-14 w-auto object-contain"
              onError={(e) => { e.target.style.display = 'none'; }} />
            <div>
              <p className="font-elegant text-3xl gold-text leading-none">ValidEats</p>
              <p className="text-[10px] text-slate-600 tracking-wide font-medium">Food scores</p>
            </div>
          </div>
          <p className="text-slate-500 text-sm leading-snug max-w-xs">
            Simple stars for packaged food — general, personal, or from a photo.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <span className="w-1.5 h-1.5 rounded-full bg-safe animate-pulse" />
            <span className="text-slate-600 text-xs">Live · 2026</span>
          </div>
        </div>

        <div>
          <p className="text-gold text-xs font-bold tracking-wide uppercase mb-4">App</p>
          <ul className="space-y-2.5">
            {[
              { to: '/general-rating', label: 'General', icon: '⭐' },
              { to: '/personalized',   label: 'My score', icon: '🧬' },
              { to: '/scan',           label: 'Scan', icon: '📸' },
              { to: '/about',          label: 'About', icon: '📘' },
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

        <div>
          <p className="text-gold text-xs font-bold tracking-wide uppercase mb-3">Stars</p>
          <ul className="space-y-2">
            {[
              { color: 'bg-safe',    label: '4–5 ★ Good' },
              { color: 'bg-caution', label: '2.5–3.9 ★ Sometimes' },
              { color: 'bg-risk',    label: 'Under 2.5 ★ Rare' },
            ].map((r) => (
              <li key={r.label} className="flex items-center gap-2.5 text-xs text-slate-500">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${r.color}`} />
                {r.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="gold-divider-subtle mb-6" />
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-700">
        <p>© 2026 ValidEats</p>
        <p className="text-center md:text-right">Info only — not medical advice.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
