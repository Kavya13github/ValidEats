// src/pages/PersonalizedRatingPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import Button from '../components/Button';
import ResultCard from '../components/ResultCard';
import AlertBox from '../components/AlertBox';
import SearchBar from '../components/SearchBar';
import LoaderSpinner from '../components/LoaderSpinner';
import FloatingOrbs from '../components/FloatingOrbs';
import { useToast } from '../components/Toast';
import { healthConditions, frequencies } from '../data/products';
import { fetchGeneralRating, fetchPersonalizedRating } from '../utils/api';

const PersonalizedRatingPage = () => {
  const toast = useToast();
  const [form,      setForm]      = useState({ name: '', age: '', height: '', weight: '', gender: '', healthCondition: '', frequency: '' });
  const [product,   setProduct]   = useState(null);
  const [query,     setQuery]     = useState('');
  const [rating,    setRating]    = useState(null);
  const [genRating, setGenRating] = useState(null);
  const [loading,   setLoading]   = useState(false);
  const [errors,    setErrors]    = useState({});
  const [step,      setStep]      = useState(1); // 1,2,3 for guided form

  const set = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.age) e.age = 'Age is required';
    else if (+form.age < 1 || +form.age > 120) e.age = 'Enter a valid age (1–120)';
    if (!form.healthCondition) e.healthCondition = 'Select a health condition';
    if (!form.frequency)       e.frequency       = 'Select consumption frequency';
    if (!product)              e.product         = 'Select a product to analyse';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) { toast.show('Please fill all required fields', 'warning'); return; }
    setLoading(true);
    toast.show('Running personalised simulation...', 'info', 4000);
    try {
      const [r, gR] = await Promise.all([
        fetchPersonalizedRating(product, { age: +form.age, height: +form.height, weight: +form.weight, gender: form.gender, healthCondition: form.healthCondition, frequency: form.frequency }),
        fetchGeneralRating(product.id, 'adults'),
      ]);
      setRating(r); setGenRating(gR);
      const status = r.stars >= 4 ? 'success' : r.stars >= 2.5 ? 'warning' : 'error';
      toast.show(`${form.name ? form.name + "'s" : 'Your'} score: ${r.stars}/5 ★`, status);
    } catch { setErrors({ submit: 'Simulation failed — please retry.' }); toast.show('Simulation failed', 'error'); }
    finally  { setLoading(false); }
  };

  const genders = [
    { value: 'male',   label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other',  label: 'Prefer not to say' },
  ];

  const steps = [
    { n: 1, label: 'Your Profile',       icon: '👤' },
    { n: 2, label: 'Health Info',        icon: '❤️' },
    { n: 3, label: 'Select Product',     icon: '📦' },
  ];

  return (
    <div className="relative min-h-screen page-wrap overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0F0C1F 0%, #080B14 60%, #13101F 100%)' }}>
      <FloatingOrbs variant="personalized" />
      <div className="grid-bg absolute inset-0 opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 pt-24 pb-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <p className="label-sm mb-3">Personalized Rating</p>
          <h1 className="serif text-[clamp(2rem,5vw,3.2rem)] font-black text-white mb-3">Your health. Your score.</h1>
          <p className="text-muted text-lg max-w-xl">A rating built exactly for your body — not the average person.</p>
        </motion.div>

        {/* Step indicator */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {steps.map((s, i) => (
            <React.Fragment key={s.n}>
              <button onClick={() => setStep(s.n)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-300 flex-shrink-0
                  ${step === s.n ? 'border-gold/50 bg-gold/10 text-gold shadow-gold-sm' : 'border-white/10 bg-white/5 text-slate-500 hover:text-slate-300'}`}>
                <span>{s.icon}</span> {s.label}
              </button>
              {i < steps.length - 1 && <div className="h-px w-6 flex-shrink-0 bg-white/10" />}
            </React.Fragment>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ── Form ── */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
            className="lg:col-span-3">
            <form onSubmit={submit} className="space-y-4">

              {/* Step 1 — Profile */}
              <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="card-static p-7 rounded-3xl space-y-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="step-num">1</span>
                    <span className="text-slate-200 font-bold text-base">Your Profile</span>
                  </div>
                  <InputField label="Your Name (Optional)" name="name" value={form.name} onChange={set}
                    placeholder="Helps personalise the result..." icon="👤" />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Age" name="age" type="number" value={form.age} onChange={set}
                      placeholder="e.g. 28" required error={errors.age} helper="Years" />
                    <SelectField label="Gender" name="gender" value={form.gender} onChange={set}
                      options={genders} placeholder="Select..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Height (cm)" name="height" type="number" value={form.height} onChange={set}
                      placeholder="e.g. 165" helper="Optional" />
                    <InputField label="Weight (kg)" name="weight" type="number" value={form.weight} onChange={set}
                      placeholder="e.g. 60" helper="Optional" />
                  </div>
                  <Button onClick={() => setStep(2)} fullWidth variant="outline" size="lg" iconRight="→">Continue to Health Info</Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="card-static p-7 rounded-3xl space-y-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="step-num">2</span>
                    <span className="text-slate-200 font-bold text-base">Health Conditions</span>
                  </div>
                  <SelectField label="Primary Health Condition" name="healthCondition" value={form.healthCondition}
                    onChange={set} options={healthConditions} required error={errors.healthCondition}
                    helper="This is the most important factor in your personalised score." />
                  <SelectField label="How often do you eat this food?" name="frequency" value={form.frequency}
                    onChange={set} options={frequencies} required error={errors.frequency}
                    helper="Daily consumption compounds all health risks significantly." />

                  {/* Condition badges explanation */}
                  <div className="bg-brand-card/60 rounded-2xl p-4 border border-white/5 text-xs text-slate-500 leading-relaxed">
                    💡 <strong className="text-slate-400">Tip:</strong> If you're healthy, select "None" — you'll still get a score based on general health guidelines.
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={() => setStep(1)} variant="ghost" size="md" icon="←" className="flex-1">Back</Button>
                    <Button onClick={() => setStep(3)} variant="outline" size="md" iconRight="→" className="flex-1">Select Product</Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="card-static p-7 rounded-3xl space-y-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="step-num">3</span>
                    <span className="text-slate-200 font-bold text-base">Choose Product</span>
                  </div>
                  <SearchBar onSelect={(p) => { setProduct(p); setQuery(p.name); setErrors((e) => ({ ...e, product: '' })); toast.show(`${p.emoji} ${p.name} selected`, 'info', 1800); }}
                    value={query} onChange={setQuery} placeholder="Search product..." />
                  {errors.product && <AlertBox type="error" message={errors.product} />}
                  <AnimatePresence>
                    {product && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 px-4 py-3.5 bg-gold/8 border border-gold/25 rounded-2xl">
                        <span className="text-2xl">{product.emoji}</span>
                        <div className="flex-1">
                          <p className="text-slate-500 text-xs">Selected product</p>
                          <p className="text-white font-bold text-sm">{product.name}</p>
                        </div>
                        <button onClick={() => { setProduct(null); setQuery(''); }}
                          className="text-slate-600 hover:text-white transition-colors text-sm">✕</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {errors.submit && <AlertBox type="error" message={errors.submit} />}
                  <div className="flex gap-3">
                    <Button onClick={() => setStep(2)} variant="ghost" size="md" icon="←" className="flex-1">Back</Button>
                    <Button type="submit" onClick={submit} loading={loading} variant="gold" size="md" icon="🧬" className="flex-1">
                      {form.name ? `Get ${form.name}'s Score` : 'Get My Score'}
                    </Button>
                  </div>
                </motion.div>
              )}
              </AnimatePresence>

              {/* All-steps submit shortcut when fully filled */}
              {step < 3 && form.age && form.healthCondition && form.frequency && product && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Button type="submit" onClick={submit} loading={loading} fullWidth size="lg" icon="🧬">
                    {form.name ? `Get ${form.name}'s Score!` : 'Get My Personalised Score!'}
                  </Button>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* ── Output panel ── */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-4">

            {/* How it works */}
            <div className="card-static p-6 rounded-3xl">
              <p className="label-sm mb-4">Why this works</p>
              <div className="space-y-3.5">
                {[
                  ['🎂', 'Age', 'alters calorie needs & metabolic thresholds'],
                  ['💊', 'Diabetes', 'means strict limits on sugar & carbs'],
                  ['🧂', 'BP / Hypertension', 'amplifies sodium risk dramatically'],
                  ['⏱', 'Daily consumption', 'compounds all risks over time'],
                  ['⚖️', 'Weight',  'calibrates how much each nutrient matters'],
                ].map(([icon, label, desc]) => (
                  <div key={label} className="flex items-start gap-3 text-sm">
                    <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
                    <div>
                      <span className="text-slate-300 font-semibold">{label}</span>
                      <span className="text-slate-600"> {desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {loading && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="card rounded-3xl py-14 text-center">
                    <LoaderSpinner label="Running personalised simulation..." />
                  </div>
                </motion.div>
              )}

              {!loading && rating && product && (
                <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  {form.name && (
                    <div className="mb-3 px-4 py-2.5 bg-gold/8 border border-gold/20 rounded-xl">
                      <p className="text-gold text-xs font-semibold">✓ Personalised for {form.name}{form.age ? `, age ${form.age}` : ''}</p>
                    </div>
                  )}
                  <ResultCard product={product} rating={rating} personalized generalRating={genRating} />
                </motion.div>
              )}

              {!loading && !rating && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="card rounded-3xl py-14 text-center border-dashed" style={{ borderColor: 'rgba(139,92,246,0.2)' }}>
                    <motion.span animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}
                      className="text-5xl block mb-4">🧬</motion.span>
                    <p className="text-slate-300 font-bold text-base mb-1">Simulation Ready</p>
                    <p className="text-slate-600 text-sm">Complete the form to get your personalised rating</p>
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
