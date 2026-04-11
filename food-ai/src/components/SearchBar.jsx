// src/components/SearchBar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { products } from '../data/products';

const SearchBar = ({ onSelect, placeholder = 'Search a product...', value: ext, onChange: extOnChange, className = '' }) => {
  const [query,       setQuery]       = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [open,        setOpen]        = useState(false);
  const ref = useRef(null);

  const active = ext !== undefined ? ext : query;

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const handle = (val) => {
    if (extOnChange) extOnChange(val); else setQuery(val);
    const f = val.trim().length > 0
      ? products.filter((p) => p.name.toLowerCase().includes(val.toLowerCase()) || p.category.toLowerCase().includes(val.toLowerCase()))
      : [];
    setSuggestions(f);
    setOpen(f.length > 0 || val.trim().length > 0);
  };

  const pick = (p) => {
    if (extOnChange) extOnChange(p.name); else setQuery(p.name);
    setSuggestions([]); setOpen(false);
    if (onSelect) onSelect(p);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60 text-sm">🔍</span>
        <input
          type="text"
          value={active}
          onChange={(e) => handle(e.target.value)}
          placeholder={placeholder}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          className="premium-input pl-11 py-4 rounded-xl text-sm"
        />
        {active && (
          <button
            onClick={() => { if (extOnChange) extOnChange(''); else setQuery(''); setSuggestions([]); setOpen(false); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-white transition-colors text-sm"
          >✕</button>
        )}
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-charcoal-900 border border-charcoal-700 rounded-xl overflow-hidden z-50 shadow-elegant">
          {suggestions.length > 0 ? suggestions.slice(0, 6).map((p) => (
            <button
              key={p.id}
              onClick={() => pick(p)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-charcoal-800 transition-colors text-left border-b border-charcoal-800 last:border-0"
            >
              <span className="text-xl w-8 flex-shrink-0">{p.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-gray-200 text-sm font-medium truncate">{p.name}</p>
                <p className="text-charcoal-400 text-xs">{p.brand} · {p.category}</p>
              </div>
              <span className="text-gold/50 text-xs flex-shrink-0">Select →</span>
            </button>
          )) : (
            <div className="px-4 py-5 text-center">
              <p className="text-charcoal-400 text-sm">No results for "{active}"</p>
              <p className="text-charcoal-600 text-xs mt-1">Try: Lays, Maggi, Oreo...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
