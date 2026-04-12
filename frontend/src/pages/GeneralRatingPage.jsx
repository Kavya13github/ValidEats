// src/pages/GeneralRatingPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import SelectField from '../components/SelectField';
import Button from '../components/Button';
import ResultCard from '../components/ResultCard';
import ProductCard from '../components/ProductCard';
import AlertBox from '../components/AlertBox';
import LoaderSpinner from '../components/LoaderSpinner';
import FloatingOrbs from '../components/FloatingOrbs';
import { useToast } from '../components/Toast';
import { products, ageGroups } from '../data/products';
import { fetchGeneralRating } from '../utils/api';

const GeneralRatingPage = () => {
  const toast = useToast();
  const [selected, setSelected] = useState(null);
  const [ageGroup, setAgeGroup] = useState('');
  const [rating,   setRating]   = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const [query,    setQuery]    = useState('');

  const pick = (p) => {
    setSelected(p); setQuery(p.name);
    setRating(null); setError('');
    toast.show(`${p.emoji} ${p.name} selected`, 'info', 2000);
  };

  const run = async () => {
    if (!selected) { setError('Please select a product first.'); return; }
    if (!ageGroup) { setError('Please choose an age group.'); return; }
    setError(''); setLoading(true);
    try {
      const r = await fetchGeneralRating(selected.id, ageGroup);
      setRating(r);
      const status = r.stars >= 4 ? 'success' : r.stars >= 2.5 ? 'warning' : 'error';
      toast.show(`Rating ready: ${r.stars}/5 ★ for ${selected.name}`, status);
    } catch { setError('Something went wrong. Please retry.'); toast.show('Analysis failed — please try again', 'error'); }
    finally  { setLoading(false); }
  };

  const quickNames = ['Lays', 'Maggi', 'Oreo', 'Coca Cola', 'Kurkure'];

  return (
    <div className="relative min-h-screen page-wrap overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0D1020 0%, #080B14 60%, #0F0C1F 100%)' }}>
      <FloatingOrbs variant="scan" />
      <div className="line-grid absolute inset-0 opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 pt-24 pb-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <p className="type-hand-sm text-gold/85 mb-1 normal-case">general lane</p>
          <h1 className="mb-2 leading-tight">
            <span className="type-elegant text-[clamp(2.75rem,6vw,4rem)] text-white block">Point at a snack.</span>
            <span className="type-sans-pair block text-[clamp(1.1rem,2.6vw,1.5rem)] text-slate-300 mt-1">we star it for that age.</span>
          </h1>
          <p className="type-hand-sm text-slate-500 max-w-md normal-case">tell us who is eating — we translate the label into plain air.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ── Left panel ── */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="lg:col-span-2 space-y-4">

            {/* Step 1 */}
            <div className="card-static p-6 rounded-3xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="step-num">1</span>
                <span className="text-slate-200 font-semibold text-sm">Product</span>
              </div>
              <SearchBar onSelect={pick} value={query} onChange={setQuery} placeholder="Search…" />
              <div className="mt-3">
                <p className="text-slate-600 text-[10px] uppercase tracking-wider font-semibold mb-2">Quick</p>
                <div className="flex flex-wrap gap-2">
                  {quickNames.map((name) => {
                    const p = products.find((pr) => pr.name.toLowerCase().includes(name.toLowerCase()));
                    return p ? (
                      <motion.button
                        key={name} onClick={() => pick(p)}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                        className={`text-xs px-3.5 py-1.5 rounded-xl border font-medium transition-all duration-200
                          ${selected?.id === p.id
                            ? 'border-gold/50 bg-gold/15 text-gold shadow-gold-sm'
                            : 'border-white/10 bg-white/5 text-slate-400 hover:border-gold/30 hover:text-slate-200'}`}>
                        {p.emoji} {name}
                      </motion.button>
                    ) : null;
                  })}
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="card-static p-6 rounded-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="step-num">2</span>
                <span className="text-slate-200 font-semibold text-sm">Age group</span>
              </div>
              <SelectField name="ageGroup" value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}
                options={ageGroups} placeholder="Who is it for?"
                helper="Needs differ by age." />
            </div>

            {/* Selected indicator */}
            <AnimatePresence>
              {selected && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-3 px-4 py-3.5 bg-gold/8 border border-gold/20 rounded-2xl">
                  <span className="text-2xl">{selected.emoji}</span>
                  <div className="flex-1">
                    <p className="text-slate-500 text-xs">Selected</p>
                    <p className="text-white font-bold text-sm">{selected.name}</p>
                  </div>
                  <span className="text-gold text-xl">★</span>
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
                <AlertBox type="error" message={error} onClose={() => setError('')} />
              </motion.div>
            )}

            <Button onClick={run} loading={loading} fullWidth size="lg" icon="⭐" disabled={!selected || !ageGroup}>
              {loading ? 'Analysing...' : 'Get Rating'}
            </Button>
          </motion.div>

          {/* ── Right panel ── */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-3 space-y-6">
            <AnimatePresence mode="wait">

              {loading && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="card rounded-3xl py-16 text-center">
                  <LoaderSpinner label="Scoring…" size="lg" />
                  <p className="mt-6 text-slate-600 text-sm">Matching nutrition to your age group.</p>
                </motion.div>
              )}

              {!loading && rating && selected && (
                <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <ResultCard product={selected} rating={rating} />
                </motion.div>
              )}

              {!loading && !rating && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="card rounded-3xl py-20 text-center border-dashed"
                  style={{ borderColor: 'rgba(212,175,55,0.15)' }}>
                  <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}
                    className="text-6xl block mb-5">⭐</motion.span>
                  <p className="text-slate-300 font-bold text-base mb-1">Your score appears here</p>
                  <p className="text-slate-600 text-xs">Select food + age, then Get rating</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Product browser */}
            <div>
              <p className="text-slate-600 text-[10px] uppercase tracking-wider font-semibold mb-3">More foods</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.slice(0, 6).map((p, i) => (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                    <ProductCard product={p} onClick={pick} selected={selected?.id === p.id} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GeneralRatingPage;
