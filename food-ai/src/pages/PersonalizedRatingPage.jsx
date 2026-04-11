// src/pages/PersonalizedRatingPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import NeonButton from '../components/NeonButton';
import ResultCard from '../components/ResultCard';
import AlertBox from '../components/AlertBox';
import SearchBar from '../components/SearchBar';
import LabLoader from '../components/LabLoader';
import HealthBar from '../components/HealthBar';
import { healthConditions, frequencies } from '../data/products';
import { fetchPersonalizedRating } from '../utils/api';

const PersonalizedRatingPage = () => {
  const [form, setForm] = useState({ name: '', age: '', height: '', weight: '', gender: '', healthCondition: '', frequency: '' });
  const [product, setProduct] = useState(null);
  const [query,   setQuery]   = useState('');
  const [rating,  setRating]  = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors,  setErrors]  = useState({});

  const set = (e) => { setForm((f) => ({ ...f, [e.target.name]: e.target.value })); setErrors((er) => ({ ...er, [e.target.name]: '' })); };

  const validate = () => {
    const e = {};
    if (!form.age) e.age = 'Age required';
    else if (+form.age < 1 || +form.age > 120) e.age = 'Enter valid age';
    if (!form.healthCondition) e.healthCondition = 'Condition required';
    if (!form.frequency)       e.frequency       = 'Frequency required';
    if (!product)              e.product         = 'Select a product';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const r = await fetchPersonalizedRating(product, {
        age: +form.age, height: +form.height, weight: +form.weight,
        gender: form.gender, healthCondition: form.healthCondition, frequency: form.frequency,
      });
      setRating(r);
    } catch { setErrors({ submit: 'Simulation failed. Retry.' }); }
    finally  { setLoading(false); }
  };

  const genders = [
    { value: 'male',   label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other',  label: 'Other' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 bg-neon-purple rounded-full animate-pulse" />
            <span className="hud-label">Module 02</span>
            <span className="text-gray-700 font-mono text-xs">/ DNA Simulation Mode</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
            DNA <span className="neon-text-purple">Simulation</span> Mode
          </h1>
          <p className="text-gray-500 font-mono text-sm mt-3 max-w-xl">
            Enter your complete health profile. The AI simulates how this food affects YOUR specific biology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form onSubmit={submit} className="space-y-4">
              {/* Profile Block */}
              <GlassCard color="purple">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-7 h-7 rounded-lg bg-neon-purple/20 border border-neon-purple/40 flex items-center justify-center text-xs font-mono text-neon-purple">01</span>
                  <p className="hud-label">Subject Profile</p>
                </div>
                <div className="space-y-4">
                  <InputField label="Subject Name (Optional)" name="name" value={form.name} onChange={set} placeholder="Enter name..." icon="◈" />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Age" name="age" type="number" value={form.age} onChange={set} placeholder="e.g. 25" required error={errors.age} helper="Years" />
                    <SelectField label="Gender" name="gender" value={form.gender} onChange={set} options={genders} placeholder="Select..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Height (cm)" name="height" type="number" value={form.height} onChange={set} placeholder="165" helper="Optional" />
                    <InputField label="Weight (kg)" name="weight" type="number" value={form.weight} onChange={set} placeholder="60" helper="Optional" />
                  </div>
                </div>
              </GlassCard>

              {/* Health Block */}
              <GlassCard color="purple">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-7 h-7 rounded-lg bg-neon-purple/20 border border-neon-purple/40 flex items-center justify-center text-xs font-mono text-neon-purple">02</span>
                  <p className="hud-label">Health Conditions</p>
                </div>
                <div className="space-y-4">
                  <SelectField
                    label="Primary Condition" name="healthCondition"
                    value={form.healthCondition} onChange={set}
                    options={healthConditions} required
                    error={errors.healthCondition}
                    helper="Select the condition most relevant to your diet goals"
                  />
                  <SelectField
                    label="Consumption Frequency" name="frequency"
                    value={form.frequency} onChange={set}
                    options={frequencies} required
                    error={errors.frequency}
                    helper="How often do you eat this product?"
                  />
                </div>
              </GlassCard>

              {/* Product Block */}
              <GlassCard color="purple">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-7 h-7 rounded-lg bg-neon-purple/20 border border-neon-purple/40 flex items-center justify-center text-xs font-mono text-neon-purple">03</span>
                  <p className="hud-label">Target Product</p>
                </div>
                <SearchBar
                  onSelect={(p) => { setProduct(p); setQuery(p.name); setErrors((e) => ({ ...e, product: '' })); }}
                  value={query}
                  onChange={setQuery}
                  placeholder="SEARCH PRODUCT..."
                />
                {errors.product && <p className="text-risk font-mono text-xs mt-1">⚠ {errors.product}</p>}
                {product && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex items-center gap-3 mt-3 px-4 py-3 bg-neon-purple/5 border border-neon-purple/20 rounded-lg">
                    <span className="text-xl">{product.emoji}</span>
                    <div className="flex-1">
                      <p className="text-gray-500 font-mono text-xs">SELECTED</p>
                      <p className="text-gray-200 font-mono font-semibold text-sm">{product.name}</p>
                    </div>
                    <button onClick={() => { setProduct(null); setQuery(''); }} className="text-gray-600 hover:text-risk font-mono text-xs">[X]</button>
                  </motion.div>
                )}
              </GlassCard>

              {errors.submit && <AlertBox type="error" message={errors.submit} />}

              <NeonButton type="submit" loading={loading} fullWidth size="xl" icon="🧬" variant="purple">
                {form.name ? `Run ${form.name}'s Simulation` : 'Run DNA Simulation'}
              </NeonButton>
            </form>
          </motion.div>

          {/* Output Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Tips */}
            <GlassCard color="purple">
              <p className="hud-label mb-3">Simulation Logic</p>
              <ul className="space-y-2.5">
                {[
                  ['🎂', 'Age shifts metabolic thresholds'],
                  ['💊', 'Conditions like diabetes lower tolerance to sugar'],
                  ['🧂', 'BP patients are penalized for high sodium'],
                  ['⏱', 'Daily intake multiplies health risks'],
                  ['⚖️', 'Weight adjusts caloric impact'],
                ].map(([icon, text]) => (
                  <li key={text} className="flex items-start gap-2 text-xs font-mono text-gray-600">
                    <span>{icon}</span><span>{text}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>

            <AnimatePresence mode="wait">
              {loading && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <GlassCard color="purple" className="py-12 text-center">
                    <LabLoader label="Running Simulation..." size="md" />
                    <p className="text-gray-700 text-xs font-mono mt-4">
                      Processing your health profile against nutritional data...
                    </p>
                  </GlassCard>
                </motion.div>
              )}

              {!loading && rating && product && (
                <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  {form.name && (
                    <div className="bg-neon-purple/5 border border-neon-purple/20 rounded-lg px-4 py-3 mb-3">
                      <p className="text-neon-purple text-xs font-mono">◈ Simulation for {form.name} · Age {form.age}</p>
                    </div>
                  )}
                  <ResultCard product={product} rating={rating} personalized />
                </motion.div>
              )}

              {!loading && !rating && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <GlassCard color="purple" className="py-12 text-center border-dashed">
                    <span className="text-4xl block mb-4">🧬</span>
                    <p className="font-mono text-sm text-gray-500">SIMULATION READY</p>
                    <p className="font-mono text-xs text-gray-700 mt-1">Fill profile and run simulation</p>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedRatingPage;
