// src/pages/ScanRatePage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScanUploadBox from '../components/ScanUploadBox';
import Button from '../components/Button';
import RatingStars from '../components/RatingStars';
import HealthBadge from '../components/HealthBadge';
import NutritionChip from '../components/NutritionChip';
import AlertBox from '../components/AlertBox';
import LoaderSpinner from '../components/LoaderSpinner';
import FloatingOrbs from '../components/FloatingOrbs';
import { useToast } from '../components/Toast';
import { scanImage } from '../utils/api';
import { scanStages } from '../data/scanResults';

const ScanRatePage = () => {
  const toast = useToast();
  const [file,   setFile]   = useState(null);
  const [state,  setState]  = useState('idle');   // idle | scanning | done | error
  const [stage,  setStage]  = useState(0);
  const [result, setResult] = useState(null);

  const runScan = async () => {
    if (!file) return;
    setState('scanning'); setStage(0);
    toast.show('Starting AI scan...', 'info', 3000);

    const animPromise = (async () => {
      for (let i = 0; i < scanStages.length; i++) {
        setStage(i);
        await new Promise((r) => setTimeout(r, scanStages[i].duration));
      }
    })();

    try {
      const [r] = await Promise.all([scanImage(file), animPromise]);
      setResult(r);
      setState('done');
      const s = r.stars >= 4 ? 'success' : r.stars >= 2.5 ? 'warning' : 'error';
      toast.show(`Scan complete: ${r.detected} — ${r.stars}/5 ★`, s);
    } catch {
      setState('error');
      toast.show('Scan failed — please try again', 'error');
    }
  };

  const reset = () => { setFile(null); setResult(null); setState('idle'); setStage(0); };

  return (
    <div className="relative min-h-screen page-wrap overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0B1424 0%, #080B14 50%, #0D0F1F 100%)' }}>
      <FloatingOrbs variant="scan" />
      <div className="line-grid absolute inset-0 opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 pt-24 pb-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <p className="label-sm mb-3">AI Scanner</p>
          <h1 className="serif text-[clamp(2rem,5vw,3.2rem)] font-black text-white mb-3">Scan any food packet.</h1>
          <p className="text-muted text-lg max-w-xl">Upload a photo. Our AI reads the label and generates an instant health report.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload panel */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="space-y-5">
            <div className="card-static p-7 rounded-3xl">
              <ScanUploadBox
                onImageSelected={(f) => { setFile(f); setResult(null); setState('idle'); toast.show('Image loaded ✓', 'success', 2000); }}
                scanning={state === 'scanning'}
              />
              {file && state === 'idle' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5">
                  <Button onClick={runScan} fullWidth size="lg" icon="📸">Analyze Package</Button>
                </motion.div>
              )}
              {state === 'done' && (
                <div className="mt-5">
                  <Button onClick={reset} variant="outline" fullWidth size="md" icon="🔄">Scan Another</Button>
                </div>
              )}
            </div>

            {state === 'error' && (
              <AlertBox type="error" title="Scan Failed"
                message="Could not process the image. Ensure the label is clearly visible."
                onClose={reset} />
            )}

            {/* How it works */}
            <div className="card-static p-6 rounded-3xl">
              <p className="label-sm mb-4">How It Works</p>
              <div className="space-y-3">
                {[
                  { n: '01', text: 'Upload a clear photo of the packet.' },
                  { n: '02', text: 'AI identifies the product & reads nutrition data.' },
                  { n: '03', text: 'Ingredients and additives are flagged.' },
                  { n: '04', text: 'Health score, warnings & alternatives generated.' },
                ].map((s) => (
                  <div key={s.n} className="flex items-start gap-3 text-sm">
                    <span className="text-gold/50 font-bold w-5 flex-shrink-0">{s.n}</span>
                    <span className="text-slate-400 leading-relaxed">{s.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Output panel */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="space-y-4">
            <AnimatePresence mode="wait">

              {/* Idle */}
              {state === 'idle' && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="card rounded-3xl py-20 text-center border-dashed" style={{ borderColor: 'rgba(20,184,166,0.2)' }}>
                    <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}
                      className="text-6xl block mb-5">📦</motion.span>
                    <p className="text-slate-300 font-bold text-lg mb-2">Awaiting image upload</p>
                    <p className="text-slate-600 text-sm">Upload a packet to start the analysis</p>
                    <div className="mt-6 grid grid-cols-3 gap-2 opacity-20 max-w-48 mx-auto">
                      {['Cal', 'Fat', 'Sugar', 'Salt', 'Protein', 'Adds.'].map((l) => (
                        <div key={l} className="bg-brand-card border border-white/5 rounded-xl text-xs text-slate-600 p-2 text-center">{l}</div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Scanning */}
              {state === 'scanning' && (
                <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="card-static p-7 rounded-3xl">
                    {/* Scan visual */}
                    <div className="relative h-32 rounded-2xl overflow-hidden bg-brand-card border border-white/5 mb-6 flex items-center justify-center">
                      <span className="text-5xl z-10 relative">📦</span>
                      <motion.div
                        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"
                        style={{ boxShadow: '0 0 14px rgba(212,175,55,0.8)' }}
                        initial={{ top: '-2px' }}
                        animate={{ top: '100%' }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                      {['top-2 left-2 border-t border-l', 'top-2 right-2 border-t border-r',
                        'bottom-2 left-2 border-b border-l', 'bottom-2 right-2 border-b border-r'
                      ].map((cls, i) => (
                        <div key={i} className={`absolute w-4 h-4 ${cls} border-gold/60`} />
                      ))}
                    </div>

                    {/* Stages */}
                    <div className="space-y-2.5">
                      {scanStages.map((s, i) => {
                        const done   = i < stage;
                        const active = i === stage;
                        return (
                          <motion.div
                            key={s.id}
                            animate={{ opacity: done || active ? 1 : 0.3 }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-500
                              ${done   ? 'bg-safe/10 border-safe/30 text-safe' :
                                active ? 'bg-gold/8 border-gold/30 text-gold' :
                                         'bg-brand-card border-white/5 text-slate-600'}`}
                          >
                            <span className="text-base">{done ? '✓' : active ? s.icon : '○'}</span>
                            <span className="flex-1">{s.label}</span>
                            {active && <LoaderSpinner size="sm" label="" />}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Result */}
              {state === 'done' && result && (
                <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  {/* Confidence */}
                  <div className="flex items-center gap-3 px-4 py-3 bg-safe/10 border border-safe/25 rounded-2xl mb-4">
                    <span className="w-2 h-2 rounded-full bg-safe flex-shrink-0" />
                    <p className="text-safe text-sm font-semibold">Analysis complete · {result.confidence}% confidence</p>
                  </div>

                  <div className="card-static rounded-3xl overflow-hidden">
                    <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between gap-3"
                      style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.05), transparent)' }}>
                      <div>
                        <p className="text-slate-500 text-xs mb-1">Detected Product</p>
                        <h3 className="text-white font-bold text-xl serif">{result.detected}</h3>
                        <p className="text-slate-600 text-xs">{result.brand}</p>
                      </div>
                      <HealthBadge status={result.status} size="lg" />
                    </div>

                    <div className="p-6 space-y-5">
                      <RatingStars stars={result.stars} size="lg" />

                      <div className={`px-4 py-3 rounded-xl border text-sm font-semibold
                        ${result.status === 'safe' ? 'bg-safe/10 border-safe/30 text-safe' :
                          result.status === 'risk' ? 'bg-risk/10 border-risk/30 text-risk' :
                          'bg-caution/10 border-caution/30 text-caution'}`}>
                        {result.verdict}
                      </div>

                      <div>
                        <p className="text-slate-500 text-xs uppercase tracking-wider font-semibold mb-3">Extracted Nutrition</p>
                        <div className="flex flex-wrap gap-2">
                          <NutritionChip label="Calories" value={result.nutrition.calories.value} unit="kcal" nutritionKey="calories" />
                          <NutritionChip label="Fat"      value={result.nutrition.fat.value}      unit="g"    nutritionKey="fat" />
                          <NutritionChip label="Sugar"    value={result.nutrition.sugar.value}    unit="g"    nutritionKey="sugar" />
                          <NutritionChip label="Salt"     value={result.nutrition.salt.value}     unit="g"    nutritionKey="salt" />
                          <NutritionChip label="Protein"  value={result.nutrition.protein.value}  unit="g"    nutritionKey="protein" />
                        </div>
                      </div>

                      {/* Warning labels */}
                      <div className="flex flex-wrap gap-2">
                        {result.labels.map((l) => (
                          <span key={l} className="text-xs bg-risk/10 border border-risk/25 text-risk px-2.5 py-1 rounded-xl font-semibold">{l}</span>
                        ))}
                      </div>

                      <div className="bg-brand-card rounded-2xl p-4 border border-white/5">
                        <p className="text-slate-500 text-xs font-semibold mb-1.5">Recommendation</p>
                        <p className="text-slate-300 text-sm leading-relaxed">{result.suggestion}</p>
                      </div>

                      <div>
                        <p className="text-safe text-xs font-semibold uppercase tracking-wider mb-2">✓ Healthier Alternatives</p>
                        <div className="flex flex-wrap gap-2">
                          {result.alternatives.map((a) => (
                            <span key={a} className="text-xs bg-safe/10 border border-safe/25 text-safe px-2.5 py-1.5 rounded-xl font-semibold">{a}</span>
                          ))}
                        </div>
                      </div>
                    </div>
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

export default ScanRatePage;
