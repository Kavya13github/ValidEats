// src/components/SearchBar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { products } from '../data/products';

const SearchBar = ({ onSelect, placeholder = 'Search product...', value: ext, onChange: extOnChange, className = '' }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const active = ext !== undefined ? ext : query;

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const handle = (val) => {
    if (extOnChange) extOnChange(val); else setQuery(val);
    const f = val.trim().length > 0 ? products.filter((p) =>
      p.name.toLowerCase().includes(val.toLowerCase()) || p.category.toLowerCase().includes(val.toLowerCase())
    ) : [];
    setSuggestions(f); setOpen(f.length > 0 || val.trim().length > 0);
  };

  const pick = (p) => {
    if (extOnChange) extOnChange(p.name); else setQuery(p.name);
    setSuggestions([]); setOpen(false);
    if (onSelect) onSelect(p);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neon-blue/50 font-mono text-sm">[⌕]</span>
        <input
          type="text" value={active} onChange={(e) => handle(e.target.value)}
          placeholder={placeholder}
          onFocus={() => { if (suggestions.length > 0) setOpen(true); }}
          className="lab-input pl-12 py-3.5 text-sm font-mono"
        />
        {active && (
          <button
            onClick={() => { if (extOnChange) extOnChange(''); else setQuery(''); setSuggestions([]); setOpen(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 font-mono text-xs"
          >
            [X]
          </button>
        )}
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 glass-strong border border-neon-blue/20 rounded-lg overflow-hidden z-50 shadow-neon">
          {suggestions.length > 0 ? suggestions.map((p) => (
            <button
              key={p.id}
              onClick={() => pick(p)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-neon-blue/5 transition-colors text-left border-b border-lab-border/50 last:border-0"
            >
              <span className="text-xl">{p.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-gray-200 text-xs font-mono font-medium">{p.name}</p>
                <p className="text-gray-600 text-xs font-mono">{p.category} · {p.brand}</p>
              </div>
              <span className="text-neon-blue/50 text-xs font-mono">[SELECT]</span>
            </button>
          )) : (
            <div className="px-4 py-4 text-center">
              <p className="text-gray-600 text-xs font-mono">No match for "{active}"</p>
              <p className="text-gray-700 text-xs font-mono mt-1">Try: Lays, Maggi, Oreo...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
