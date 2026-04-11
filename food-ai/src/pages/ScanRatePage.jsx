// src/pages/ScanRatePage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import ScanUploadBox from '../components/ScanUploadBox';
import Button from '../components/Button';
import RatingStars from '../components/RatingStars';
import HealthBadge from '../components/HealthBadge';
import NutritionChip from '../components/NutritionChip';
import AlertBox from '../components/AlertBox';
import LoaderSpinner from '../components/LoaderSpinner';
import { scanImage } from '../utils/api';
import { scanStages } from '../data/scanResults';

const ScanRatePage = () => {
  const [file,   setFile]  = useState(null);
  const [state,  setState] = useState('idle');   // idle | scanning | done | error
  const [stage,  setStage] = useState(0);
  const [result, setResult] = useState(null);

  const runScan = async () => {
    if (!file) return;
    setState('scanning'); setStage(0);

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
    } catch { setState('error'); }
  };

  const reset = () => { setFile(null); setResult(null); setState('idle'); setStage(0); };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <SectionHeading
            label="AI Scanner"
            title="Scan any food packet."
            subtitle="Upload a photo of the packaging. Our AI reads the label and generates an instant health report."
            align="left"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload panel */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="space-y-5">
            <div className="premium-card p-6">
              <ScanUploadBox
                onImageSelected={(f) => { setFile(f); setResult(null); setState('idle'); }}
                scanning={state === 'scanning'}
              />
              {file && state === 'idle' && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5">
                  <Button onClick={runScan} fullWidth size="lg" icon="📸">Analyze Package</Button>
                </motion.div>
              )}
              {state === 'done' && (
                <div className="mt-5">
                  <Button onClick={reset} variant="dark" fullWidth size="md" icon="🔄">Scan Another</Button>
                </div>
              )}
            </div>

            {state === 'error' && (
              <AlertBox type="error" title="Scan Failed"
                message="Could not process the image. Ensure the label is clearly visible and retry."
                onClose={reset} />
            )}

            {/* How it works */}
            <div className="premium-card p-6">
              <p className="text-gold text-xs font-medium uppercase tracking-wider mb-4">How It Works</p>
              <div className="space-y-3">
                {[
                  { n: '01', text: 'Upload a clear image of the packet front or back.' },
                  { n: '02', text: 'AI identifies the product and reads the nutrition table.' },
                  { n: '03', text: 'Ingredients and additives are extracted and analysed.' },
                  { n: '04', text: 'A health score, warnings and alternatives are generated.' },
                ].map((s) => (
                  <div key={s.n} className="flex items-start gap-3 text-xs">
                    <span className="text-gold/50 font-medium w-5 flex-shrink-0 mt-0.5">{s.n}</span>
                    <span className="text-charcoal-400 leading-relaxed">{s.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Output panel */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-4">
            <AnimatePresence mode="wait">
              {/* Idle */}
              {state === 'idle' && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="premium-card py-16 text-center border-dashed border-charcoal-700">
                    <p className="text-5xl mb-4">📦</p>
                    <p className="text-gray-400 font-medium text-sm">Awaiting image upload</p>
                    <p className="text-charcoal-500 text-xs mt-1">Upload a packet image to begin analysis</p>
                    <div className="mt-6 grid grid-cols-3 gap-2 opacity-25 max-w-48 mx-auto">
                      {['Cal', 'Fat', 'Sugar', 'Salt', 'Protein', 'Adds.'].map((l) => (
                        <div key={l} className="bg-charcoal-800 border border-charcoal-700 rounded-lg text-xs text-charcoal-600 p-2 text-center">{l}</div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Scanning */}
              {state === 'scanning' && (
                <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="premium-card p-6">
                    {/* Mini scan visual */}
                    <div className="relative h-28 rounded-xl overflow-hidden bg-charcoal-800 border border-charcoal-700 mb-6 flex items-center justify-center">
                      <span className="text-4xl z-10 relative">📦</span>
                      {/* Gold scan line */}
                      <motion.div
                        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"
                        style={{ boxShadow: '0 0 12px rgba(212,175,55,0.6)' }}
                        initial={{ top: '-2px' }}
                        animate={{ top: '100%' }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                      {/* Corner brackets */}
                      {['top-2 left-2 border-t border-l', 'top-2 right-2 border-t border-r',
                        'bottom-2 left-2 border-b border-l', 'bottom-2 right-2 border-b border-r'
                      ].map((cls, i) => (
                        <div key={i} className={`absolute w-4 h-4 ${cls} border-gold/60`} />
                      ))}
                    </div>

                    {/* Stage list */}
                    <div className="space-y-2.5">
                      {scanStages.map((s, i) => {
                        const done   = i < stage;
                        const active = i === stage;
                        return (
                          <motion.div
                            key={s.id}
                            animate={{ opacity: done || active ? 1 : 0.35 }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-all duration-500
                              ${done   ? 'bg-safe-light border-safe/20 text-safe' :
                                active ? 'bg-gold/5 border-gold/30 text-gold' :
                                         'bg-charcoal-800 border-charcoal-700 text-charcoal-500'}`}
                          >
                            <span className="text-base">{done ? '✓' : active ? s.icon : '○'}</span>
                            <span className="flex-1 font-medium">{s.label}</span>
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
                <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                  {/* Confidence indicator */}
                  <div className="flex items-center gap-3 px-4 py-3 bg-safe-light border border-safe/20 rounded-xl mb-4">
                    <span className="w-2 h-2 rounded-full bg-safe flex-shrink-0" />
                    <p className="text-safe text-xs font-medium">Analysis complete · {result.confidence}% confidence</p>
                  </div>

                  <div className="premium-card overflow-hidden">
                    <div className="px-6 py-5 border-b border-charcoal-800 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-charcoal-400 text-xs mb-1">Detected Product</p>
                        <h3 className="text-white font-semibold text-lg serif-heading">{result.detected}</h3>
                        <p className="text-charcoal-500 text-xs">{result.brand}</p>
                      </div>
                      <HealthBadge status={result.status} size="lg" />
                    </div>

                    <div className="p-6 space-y-5">
                      <RatingStars stars={result.stars} size="lg" />

                      <div className={`px-4 py-3 rounded-xl border text-sm font-medium
                        ${result.status === 'safe' ? 'bg-safe-light border-safe/30 text-safe' :
                          result.status === 'risk' ? 'bg-risk-light border-risk/30 text-risk' :
                          'bg-caution-light border-caution/30 text-caution'}`}>
                        {result.verdict}
                      </div>

                      <div>
                        <p className="text-charcoal-400 text-xs uppercase tracking-wider font-medium mb-3">Extracted Nutrition</p>
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
                          <span key={l} className="text-xs bg-risk-light border border-risk/20 text-risk px-2.5 py-1 rounded-lg font-medium">{l}</span>
                        ))}
                      </div>

                      <div className="bg-charcoal-800 rounded-xl p-4 border border-charcoal-700">
                        <p className="text-charcoal-400 text-xs font-medium mb-1.5">Recommendation</p>
                        <p className="text-gray-400 text-sm leading-relaxed">{result.suggestion}</p>
                      </div>

                      <div>
                        <p className="text-safe text-xs font-medium uppercase tracking-wider mb-2">✓ Healthier Alternatives</p>
                        <div className="flex flex-wrap gap-2">
                          {result.alternatives.map((a) => (
                            <span key={a} className="text-xs bg-safe-light border border-safe/20 text-safe px-2.5 py-1.5 rounded-lg font-medium">{a}</span>
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
