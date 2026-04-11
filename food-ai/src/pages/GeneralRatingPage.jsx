// src/pages/GeneralRatingPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import SearchBar from '../components/SearchBar';
import SelectField from '../components/SelectField';
import Button from '../components/Button';
import ResultCard from '../components/ResultCard';
import ProductCard from '../components/ProductCard';
import AlertBox from '../components/AlertBox';
import LoaderSpinner from '../components/LoaderSpinner';
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
    if (!selected) { setError('Please select a product first.'); return; }
    if (!ageGroup) { setError('Please select an age group.'); return; }
    setError(''); setLoading(true);
    try {
      const r = await fetchGeneralRating(selected.id, ageGroup);
      setRating(r);
    } catch { setError('Something went wrong. Please try again.'); }
    finally  { setLoading(false); }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <SectionHeading
            label="General Rating"
            title="How healthy is this food?"
            subtitle="Select a product and an age group. Get a verified star rating with expert health explanation."
            align="left"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Step 1 */}
            <div className="premium-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-gold text-charcoal-900 text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
                <span className="text-sm font-semibold text-gray-300">Select a Product</span>
              </div>
              <SearchBar onSelect={pick} value={query} onChange={setQuery} placeholder="Search product..." />
              {/* Quick picks */}
              <div className="mt-4">
                <p className="text-charcoal-500 text-xs uppercase tracking-wider mb-2 font-medium">Quick Select</p>
                <div className="flex flex-wrap gap-2">
                  {['Lays', 'Maggi', 'Oreo', 'Coca Cola', 'Kurkure'].map((name) => {
                    const p = products.find((pr) => pr.name.toLowerCase().includes(name.toLowerCase()));
                    return p ? (
                      <button key={name} onClick={() => pick(p)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all font-medium
                          ${selected?.id === p.id
                            ? 'border-gold/50 bg-gold/10 text-gold'
                            : 'border-charcoal-700 bg-charcoal-800 text-charcoal-300 hover:border-gold/30 hover:text-gray-200'
                          }`}>
                        {p.emoji} {name}
                      </button>
                    ) : null;
                  })}
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="premium-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-gold text-charcoal-900 text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
                <span className="text-sm font-semibold text-gray-300">Select Age Group</span>
              </div>
              <SelectField
                name="ageGroup"
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                options={ageGroups}
                placeholder="Choose age group..."
                helper="Nutritional needs vary significantly across age groups."
              />
            </div>

            {/* Selected indicator */}
            {selected && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 px-4 py-3 bg-gold/5 border border-gold/20 rounded-xl">
                <span className="text-2xl">{selected.emoji}</span>
                <div>
                  <p className="text-charcoal-400 text-xs">Selected product</p>
                  <p className="text-gray-200 font-semibold text-sm">{selected.name}</p>
                </div>
              </motion.div>
            )}

            {error && <AlertBox type="error" message={error} onClose={() => setError('')} />}

            <Button onClick={run} loading={loading} fullWidth size="lg" icon="★" disabled={!selected || !ageGroup}>
              Get Rating
            </Button>
          </motion.div>

          {/* Right panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="premium-card py-16 text-center">
                    <LoaderSpinner label="Analyzing nutritional data..." size="lg" />
                    <div className="mt-6 space-y-1.5">
                      {['Checking ingredients...', 'Applying age-based factors...', 'Generating health score...'].map((s, i) => (
                        <motion.p key={s} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.5 }}
                          className="text-charcoal-500 text-xs">
                          {s}
                        </motion.p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {!loading && rating && selected && (
                <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                  <ResultCard product={selected} rating={rating} />
                </motion.div>
              )}

              {!loading && !rating && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="premium-card py-16 text-center border-dashed border-charcoal-700">
                    <p className="text-4xl mb-4">★</p>
                    <p className="text-gray-400 font-medium text-sm">Ready to rate</p>
                    <p className="text-charcoal-500 text-xs mt-1">Select a product and age group, then click "Get Rating"</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Product browser */}
            <div>
              <p className="text-charcoal-400 text-xs uppercase tracking-wider font-medium mb-4">Browse Products</p>
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
