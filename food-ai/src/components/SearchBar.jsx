// src/components/SearchBar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';

const SearchBar = ({ onSelect, value, onChange, placeholder = 'Search product...' }) => {
  const [query, setQuery] = useState(value || '');
  const [open, setOpen]   = useState(false);
  const ref = useRef(null);

  useEffect(() => { if (value !== undefined) setQuery(value); }, [value]);

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const q = query.toLowerCase();
  const filtered = q.length
    ? products.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
    : products.slice(0, 8);

  const pick = (p) => {
    setQuery(p.name); setOpen(false);
    if (onSelect) onSelect(p);
  };

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-base pointer-events-none">🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); if (onChange) onChange(e.target.value); }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="field pl-11 pr-10"
        />
        {query && (
          <button onClick={() => { setQuery(''); setOpen(false); if (onChange) onChange(''); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-slate-600 hover:text-white hover:bg-white/10 transition-all text-xs">
            ✕
          </button>
        )}
      </div>

      <AnimatePresence>
        {open && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 top-full mt-2 left-0 right-0 rounded-2xl border border-gold/15
              bg-brand-card/95 backdrop-blur-xl shadow-popup overflow-hidden"
          >
            <div className="max-h-64 overflow-y-auto p-1.5">
              {filtered.slice(0, 14).map((p) => (
                <motion.button
                  key={p.id}
                  onClick={() => pick(p)}
                  whileHover={{ x: 4 }}
                  className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-left text-sm
                    text-slate-300 hover:bg-gold/8 hover:text-white transition-all duration-150"
                >
                  <span className="text-xl w-7 text-center">{p.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate text-[13px]">{p.name}</p>
                    <p className="text-slate-600 text-xs mt-0.5">{p.brand} · {p.category}</p>
                  </div>
                </motion.button>
              ))}
            </div>
            {q && filtered.length === 0 && (
              <div className="p-4 text-center text-sm text-slate-600">No results matching "{query}"</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
