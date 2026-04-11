// src/pages/PersonalizedRatingPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import Button from '../components/Button';
import ResultCard from '../components/ResultCard';
import AlertBox from '../components/AlertBox';
import SearchBar from '../components/SearchBar';
import LoaderSpinner from '../components/LoaderSpinner';
import { healthConditions, frequencies } from '../data/products';
import { fetchGeneralRating, fetchPersonalizedRating } from '../utils/api';

const PersonalizedRatingPage = () => {
  const [form,    setForm]    = useState({ name: '', age: '', height: '', weight: '', gender: '', healthCondition: '', frequency: '' });
  const [product, setProduct] = useState(null);
  const [query,   setQuery]   = useState('');
  const [rating,  setRating]  = useState(null);
  const [genRating, setGenRating] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors,  setErrors]  = useState({});

  const set = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.age) e.age = 'Age is required';
    else if (+form.age < 1 || +form.age > 120) e.age = 'Enter a valid age';
    if (!form.healthCondition) e.healthCondition = 'Please select a condition';
    if (!form.frequency)       e.frequency       = 'Please select frequency';
    if (!product)              e.product         = 'Please select a product';
    setErrors(e); return !Object.keys(e).length;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const [r, gR] = await Promise.all([
        fetchPersonalizedRating(product, { age: +form.age, height: +form.height, weight: +form.weight, gender: form.gender, healthCondition: form.healthCondition, frequency: form.frequency }),
        fetchGeneralRating(product.id, 'adults'),
      ]);
      setRating(r);
      setGenRating(gR);
    } catch { setErrors({ submit: 'Simulation failed. Please retry.' }); }
    finally  { setLoading(false); }
  };

  const genders = [
    { value: 'male',   label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other',  label: 'Other / Prefer not to say' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <SectionHeading
            label="Personalized Rating"
            title="Your health. Your score."
            subtitle="Enter your health profile. We'll generate a rating built exactly for your biology — not for the average person."
            align="left"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form panel */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-3">
            <form onSubmit={submit} className="space-y-5">

              {/* Profile */}
              <div className="premium-card p-6">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-6 h-6 rounded-full bg-gold text-charcoal-900 text-xs font-bold flex items-center justify-center">1</span>
                  <span className="text-sm font-semibold text-gray-300">Your Profile</span>
                </div>
                <div className="space-y-4">
                  <InputField label="Your Name (Optional)" name="name" value={form.name} onChange={set} placeholder="Enter your name..." icon="👤" />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Age" name="age" type="number" value={form.age} onChange={set} placeholder="e.g. 28" required error={errors.age} helper="Years" />
                    <SelectField label="Gender" name="gender" value={form.gender} onChange={set} options={genders} placeholder="Select..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Height (cm)" name="height" type="number" value={form.height} onChange={set} placeholder="e.g. 165" helper="Optional" />
                    <InputField label="Weight (kg)" name="weight" type="number" value={form.weight} onChange={set} placeholder="e.g. 60" helper="Optional" />
                  </div>
                </div>
              </div>

              {/* Health conditions */}
              <div className="premium-card p-6">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-6 h-6 rounded-full bg-gold text-charcoal-900 text-xs font-bold flex items-center justify-center">2</span>
                  <span className="text-sm font-semibold text-gray-300">Health Conditions</span>
                </div>
                <div className="space-y-4">
                  <SelectField label="Primary Condition" name="healthCondition" value={form.healthCondition} onChange={set}
                    options={healthConditions} required error={errors.healthCondition}
                    helper="Select the condition most relevant to your diet goals." />
                  <SelectField label="Consumption Frequency" name="frequency" value={form.frequency} onChange={set}
                    options={frequencies} required error={errors.frequency}
                    helper="How often do you typically eat this product?" />
                </div>
              </div>

              {/* Product */}
              <div className="premium-card p-6">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-6 h-6 rounded-full bg-gold text-charcoal-900 text-xs font-bold flex items-center justify-center">3</span>
                  <span className="text-sm font-semibold text-gray-300">Choose Product</span>
                </div>
                <SearchBar onSelect={(p) => { setProduct(p); setQuery(p.name); setErrors((e) => ({ ...e, product: '' })); }}
                  value={query} onChange={setQuery} placeholder="Search product..." />
                {errors.product && <AlertBox type="error" message={errors.product} className="mt-2" />}
                {product && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex items-center gap-3 mt-3 px-4 py-3 bg-gold/5 border border-gold/20 rounded-xl">
                    <span className="text-xl">{product.emoji}</span>
                    <div className="flex-1">
                      <p className="text-charcoal-400 text-xs">Selected</p>
                      <p className="text-gray-200 font-semibold text-sm">{product.name}</p>
                    </div>
                    <button onClick={() => { setProduct(null); setQuery(''); }} className="text-charcoal-500 hover:text-white text-sm transition-colors">✕</button>
                  </motion.div>
                )}
              </div>

              {errors.submit && <AlertBox type="error" message={errors.submit} />}

              <Button type="submit" loading={loading} fullWidth size="xl" icon="🧬">
                {form.name ? `Get ${form.name}'s Personalised Rating` : 'Get My Personalized Rating'}
              </Button>
            </form>
          </motion.div>

          {/* Output panel */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-4">
            {/* Info */}
            <div className="premium-card p-6">
              <p className="text-gold text-xs font-medium uppercase tracking-wider mb-3">How it works</p>
              <ul className="space-y-3">
                {[
                  ['🎂', 'Age adjusts calories and metabolic tolerance'],
                  ['💊', 'Diabetes means strict sugar limits'],
                  ['🧂', 'BP conditions amplify sodium risk'],
                  ['⏱', 'Daily consumption compounds all risks'],
                  ['⚖️', 'Weight helps calibrate caloric impact'],
                ].map(([icon, text]) => (
                  <li key={text} className="flex items-start gap-2.5 text-xs text-charcoal-400">
                    <span className="text-base mt-0.5">{icon}</span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <AnimatePresence mode="wait">
              {loading && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="premium-card py-12 text-center">
                    <LoaderSpinner label="Running personalized simulation..." />
                  </div>
                </motion.div>
              )}

              {!loading && rating && product && (
                <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                  {form.name && (
                    <div className="mb-3 px-4 py-2.5 bg-gold/5 border border-gold/20 rounded-xl">
                      <p className="text-gold text-xs font-medium">Personalized result for {form.name}, age {form.age}</p>
                    </div>
                  )}
                  <ResultCard product={product} rating={rating} personalized generalRating={genRating} />
                </motion.div>
              )}

              {!loading && !rating && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="premium-card py-12 text-center border-dashed border-charcoal-700">
                    <span className="text-4xl block mb-3">🧬</span>
                    <p className="text-gray-400 text-sm font-medium">Simulation Ready</p>
                    <p className="text-charcoal-500 text-xs mt-1">Complete the form to get your personalized rating</p>
                  </div>
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
