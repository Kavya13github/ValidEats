// src/pages/GeneralRatingPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import SearchBar from '../components/SearchBar';
import SelectField from '../components/SelectField';
import NeonButton from '../components/NeonButton';
import ResultCard from '../components/ResultCard';
import ProductCard from '../components/ProductCard';
import AlertBox from '../components/AlertBox';
import LabLoader from '../components/LabLoader';
import { products, ageGroups } from '../data/products';
import { fetchGeneralRating } from '../utils/api';

const GeneralRatingPage = () => {
  const [selected, setSelected] = useState(null);
  const [ageGroup, setAgeGroup] = useState('');
  const [rating,   setRating]   = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const [query,    setQuery]    = useState('');

  const pick = (p) => { setSelected(p); setQuery(p.name); setRating(null); setError(''); };

  const run = async () => {
    if (!selected) { setError('SELECT A PRODUCT FROM DATABASE'); return; }
    if (!ageGroup) { setError('SELECT TARGET AGE GROUP'); return; }
    setError('');
    setLoading(true);
    try {
      const r = await fetchGeneralRating(selected.id, ageGroup);
      setRating(r);
    } catch { setError('ANALYSIS FAILED — RETRY'); }
    finally  { setLoading(false); }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
            <span className="hud-label">Module 01</span>
            <span className="text-gray-700 font-mono text-xs">/ General Lab Analysis</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
            Lab <span className="gradient-text">Analysis</span> Mode
          </h1>
          <p className="text-gray-500 font-mono text-sm mt-3 max-w-xl">
            Select a product and target age group. The system will simulate health impact based on nutrition data.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Control Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Step 1 */}
            <GlassCard color="blue">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-lg bg-neon-blue/20 border border-neon-blue/40 flex items-center justify-center text-xs font-mono text-neon-blue">01</span>
                <p className="hud-label">Select Product</p>
              </div>
              <SearchBar
                onSelect={pick}
                value={query}
                onChange={setQuery}
                placeholder="SEARCH PRODUCT..."
              />
              {/* Quick chips */}
              <div className="mt-3">
                <p className="text-gray-700 text-xs font-mono mb-2 uppercase tracking-wider">Quick Select:</p>
                <div className="flex flex-wrap gap-2">
                  {['Lays', 'Maggi', 'Oreo', 'Coca Cola', 'Kurkure'].map((name) => {
                    const p = products.find((pr) => pr.name.toLowerCase().includes(name.toLowerCase()));
                    return p ? (
                      <button
                        key={name}
                        onClick={() => pick(p)}
                        className={`text-xs font-mono px-2.5 py-1 rounded border transition-all ${
                          selected?.id === p.id
                            ? 'border-neon-blue/60 bg-neon-blue/10 text-neon-blue'
                            : 'border-lab-border bg-lab-surface text-gray-600 hover:border-neon-blue/40 hover:text-gray-300'
                        }`}
                      >
                        {p.emoji} {name}
                      </button>
                    ) : null;
                  })}
                </div>
              </div>
            </GlassCard>

            {/* Step 2 */}
            <GlassCard color="blue">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-lg bg-neon-blue/20 border border-neon-blue/40 flex items-center justify-center text-xs font-mono text-neon-blue">02</span>
                <p className="hud-label">Age Group</p>
              </div>
              <SelectField
                name="ageGroup"
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                options={ageGroups}
                placeholder="SELECT AGE GROUP..."
                helper="Nutritional needs differ by age bracket."
              />
            </GlassCard>

            {/* Selected indicator */}
            {selected && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex items-center gap-3 px-4 py-3 glass border border-neon-blue/20 rounded-lg">
                <span className="text-xl">{selected.emoji}</span>
                <div>
                  <p className="text-gray-500 font-mono text-xs">SELECTED TARGET</p>
                  <p className="text-gray-200 font-mono font-semibold text-sm">{selected.name}</p>
                </div>
              </motion.div>
            )}

            {error && <AlertBox type="error" message={error} onClose={() => setError('')} />}

            {/* Run button */}
            <NeonButton
              onClick={run}
              loading={loading}
              fullWidth
              size="lg"
              icon="📊"
              disabled={!selected || !ageGroup}
              variant="primary"
            >
              Run Analysis
            </NeonButton>
          </motion.div>

          {/* Output Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 space-y-5"
          >
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <GlassCard color="blue" className="py-16 text-center">
                    <LabLoader label="Analyzing Nutrition Data..." size="lg" />
                    <div className="mt-6 space-y-2">
                      {['Scanning nutritional profile...', 'Applying age-based modifiers...', 'Generating health score...'].map((s, i) => (
                        <motion.p
                          key={s}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.5 }}
                          className="text-gray-600 font-mono text-xs"
                        >
                          › {s}
                        </motion.p>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {!loading && rating && selected && (
                <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <ResultCard product={selected} rating={rating} />
                </motion.div>
              )}

              {!loading && !rating && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <GlassCard color="blue" className="py-16 text-center border-dashed">
                    <div className="relative w-20 h-20 mx-auto mb-6">
                      <div className="w-20 h-20 rounded-full border border-neon-blue/20 flex items-center justify-center text-4xl">📊</div>
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-lab-bg border border-neon-blue/30 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-neon-blue/50 animate-pulse" />
                      </div>
                    </div>
                    <p className="font-mono font-bold text-sm text-gray-400">AWAITING ANALYSIS INPUT</p>
                    <p className="text-gray-700 font-mono text-xs mt-2">Configure parameters and run analysis</p>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Product Browser */}
            <div>
              <p className="hud-label mb-4">Product Database</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.slice(0, 6).map((p) => (
                  <ProductCard key={p.id} product={p} onClick={pick} selected={selected?.id === p.id} />
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
