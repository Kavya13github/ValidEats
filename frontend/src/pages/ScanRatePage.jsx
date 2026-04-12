// src/pages/ScanRatePage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScanUploadBox from '../components/ScanUploadBox';
import Button from '../components/Button';
import RatingStars from '../components/RatingStars';
import HealthBadge from '../components/HealthBadge';
import AlertBox from '../components/AlertBox';
import LoaderSpinner from '../components/LoaderSpinner';
import FloatingOrbs from '../components/FloatingOrbs';
import { useToast } from '../components/Toast';
import { scanImage } from '../utils/api';
import { scanStages } from '../data/scanResults';

const ScanRatePage = () => {
  const toast = useToast();
  const [file,         setFile]         = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [state,        setState]        = useState('idle');   // idle | scanning | done | error
  const [stage,        setStage]        = useState(0);
  const [result,       setResult]       = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleImageSelected = (f) => {
    setFile(f);
    setResult(null);
    setState('idle');
    setErrorMessage(null);
    if (f) {
      const url = URL.createObjectURL(f);
      setImagePreview(url);
    }
    toast.show('Image loaded ✓', 'success', 2000);
  };

  const runScan = async () => {
    if (!file) return;
    setState('scanning'); setStage(0); setErrorMessage(null);
    toast.show('Starting AI scan...', 'info', 3000);

    const animPromise = (async () => {
      for (let i = 0; i < scanStages.length; i++) {
        setStage(i);
        await new Promise((r) => setTimeout(r, scanStages[i].duration));
      }
    })();

    try {
      const [r] = await Promise.all([scanImage(file), animPromise]);
      if (!r || !r.detected) throw new Error("Invalid analysis result");
      setResult(r);
      setState('done');
      const s = r.stars >= 4 ? 'success' : r.stars >= 2.5 ? 'warning' : 'error';
      toast.show(`Scan complete: ${r.detected}`, s);
    } catch (err) {
      console.error(err);
      setState('error');
      const msg = err.response?.status === 429 
        ? "AI Quota limit exceeded (Free Tier). Please try again in a few minutes." 
        : "Scan failed. Please ensure the food label is clearly visible and try again.";
      setErrorMessage(msg);
      toast.show('Scan failed', 'error');
    }
  };

  const reset = () => {
    setFile(null);
    setImagePreview(null);
    setResult(null);
    setState('idle');
    setStage(0);
    setErrorMessage(null);
  };

  // Risk color helper for ingredient breakdown
  const riskStyle = (risk) => {
    if (risk === 'high')   return { bg: 'bg-risk/10',    border: 'border-risk/25',    text: 'text-risk',    dot: 'bg-risk' };
    if (risk === 'medium') return { bg: 'bg-caution/10', border: 'border-caution/25', text: 'text-caution', dot: 'bg-caution' };
    return                        { bg: 'bg-safe/10',    border: 'border-safe/25',    text: 'text-safe',    dot: 'bg-safe' };
  };

  return (
    <div className="relative min-h-screen page-wrap overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0B1424 0%, #080B14 50%, #0D0F1F 100%)' }}>
      <FloatingOrbs variant="scan" />
      <div className="line-grid absolute inset-0 opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 pt-24 pb-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <p className="label-sm mb-3">AI Scanner</p>
          <h1 className="serif text-[clamp(2rem,5vw,3.2rem)] font-black text-white mb-3">Scan any food packet.</h1>
          <p className="text-muted text-lg max-w-xl">Upload a photo. Our AI reads the label and generates a comprehensive health report.</p>
        </motion.div>

        {/* ═══════════ Upload + Scanning Grid ═══════════ */}
        <div className={`grid grid-cols-1 ${state === 'done' ? '' : 'lg:grid-cols-2'} gap-8`}>

          {/* ── Left: Upload Panel ── */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="space-y-5">
            <div className="card-static p-7 rounded-3xl">
              <ScanUploadBox
                onImageSelected={handleImageSelected}
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
              <AlertBox type="error" title="Analysis Error"
                message={errorMessage}
                onClose={reset} />
            )}

            {/* How it works - hide when result is showing */}
            {state !== 'done' && (
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
            )}
          </motion.div>

          {/* ── Right: Idle + Scanning states ── */}
          {state !== 'done' && (
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
                    </div>
                  </motion.div>
                )}

                {/* Scanning */}
                {state === 'scanning' && (
                  <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="card-static p-7 rounded-3xl">
                      {/* Scan visual */}
                      <div className="relative h-32 rounded-2xl overflow-hidden bg-brand-card border border-white/5 mb-6 flex items-center justify-center">
                        {imagePreview ? (
                          <img src={imagePreview} alt="Scanning..." className="w-full h-full object-cover opacity-60" />
                        ) : (
                          <span className="text-5xl z-10 relative">📦</span>
                        )}
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

              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* ═══════════════════════════════════════════════════════════
            COMPREHENSIVE SCAN REPORT — Full-width below the grid
           ═══════════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {state === 'done' && result && (
            <motion.div
              key="scan-report"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 space-y-5"
            >

              {/* ── Confidence Banner ── */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                className="flex items-center gap-3 px-4 py-3 bg-safe/10 border border-safe/25 rounded-2xl">
                <span className="w-2 h-2 rounded-full bg-safe flex-shrink-0 animate-pulse" />
                <p className="text-safe text-sm font-semibold">Analysis Complete · AI-Powered Health Report</p>
              </motion.div>

              {/* ══════════ REPORT HEADER: Product + Rating ══════════ */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="card-static rounded-3xl overflow-hidden">
                <div className="p-6 md:p-8 flex flex-col md:flex-row items-start gap-6"
                  style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.05), transparent)' }}>

                  {/* Image preview */}
                  {imagePreview && (
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0">
                      <img src={imagePreview} alt={result.detected} className="w-full h-full object-cover" />
                    </div>
                  )}

                  {/* Product info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-500 text-xs mb-1">Detected Product</p>
                    <h2 className="serif text-2xl md:text-3xl font-black text-white mb-1 truncate">{result.detected}</h2>
                    <p className="text-slate-500 text-sm mb-4">{result.brand}</p>
                    <RatingStars stars={result.stars || 0} size="lg" />
                    {result.ratingExplanation && (
                      <p className="text-slate-400 text-sm mt-3 leading-relaxed">{result.ratingExplanation}</p>
                    )}
                  </div>

                  {/* Rating badge */}
                  <div className="flex flex-row md:flex-col items-center gap-3 flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                      className="w-24 h-24 md:w-28 md:h-28 rounded-2xl border border-gold/30 bg-gold/5 flex flex-col items-center justify-center"
                    >
                      <span className="text-[2.2rem] md:text-[2.8rem] font-black text-gold leading-none">{result.stars}</span>
                      <span className="text-gold/50 text-sm font-bold">/5</span>
                    </motion.div>
                    <HealthBadge status={result.status} size="md" />
                  </div>
                </div>

                {/* Product note */}
                {result.productNote && (
                  <div className="px-6 md:px-8 py-4 border-t border-white/5 bg-brand-card/50">
                    <div className="flex items-start gap-3">
                      <span className="text-gold/60 text-sm mt-0.5 flex-shrink-0">💡</span>
                      <p className="text-slate-400 text-sm leading-relaxed">{result.productNote}</p>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* ══════════ INGREDIENT BREAKDOWN + NUTRITION ══════════ */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

                {/* Ingredient Breakdown — wider column */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                  className="lg:col-span-3 card-static rounded-3xl p-6">
                  <p className="label-sm mb-5">Ingredient Breakdown & Health Impact</p>

                  {result.ingredientBreakdown?.length > 0 ? (
                    <div className="space-y-2">
                      {result.ingredientBreakdown.map((ing, i) => {
                        const rc = riskStyle(ing.risk);
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25 + i * 0.04 }}
                            className={`px-4 py-3 rounded-xl border ${rc.border} ${rc.bg}`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <p className="text-white font-semibold text-sm">{ing.name}</p>
                              <div className="flex items-center gap-2">
                                <span className="text-slate-500 text-xs italic">{ing.purpose}</span>
                                <span className={`w-2.5 h-2.5 rounded-full ${rc.dot} flex-shrink-0`} />
                              </div>
                            </div>
                            <p className={`text-xs leading-relaxed ${rc.text} opacity-90`}>{ing.healthImpact}</p>
                          </motion.div>
                        );
                      })}

                      {/* Legend */}
                      <div className="flex items-center gap-4 pt-3 mt-2 border-t border-white/5">
                        {[
                          { label: 'Low Risk', color: 'bg-safe' },
                          { label: 'Medium Risk', color: 'bg-caution' },
                          { label: 'High Risk', color: 'bg-risk' },
                        ].map((l) => (
                          <div key={l.label} className="flex items-center gap-1.5 text-xs text-slate-600">
                            <span className={`w-2 h-2 rounded-full ${l.color}`} />
                            {l.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-600 text-sm">No ingredient data available from the image.</p>
                  )}
                </motion.div>

                {/* Nutrition Grid — narrower column */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
                  className="lg:col-span-2 space-y-5">

                  {/* Extracted Nutrition */}
                  <div className="card-static rounded-3xl p-6">
                    <p className="label-sm mb-4">Extracted Nutrition · per 100g</p>
                    <div className="space-y-0.5">
                      {[
                        { label: 'Calories',  key: 'calories', value: result.nutrition?.calories?.value,  unit: 'kcal' },
                        { label: 'Total Fat', key: 'fat',      value: result.nutrition?.fat?.value,       unit: 'g' },
                        { label: 'Sugar',     key: 'sugar',    value: result.nutrition?.sugar?.value,     unit: 'g' },
                        { label: 'Sodium',    key: 'sodium',   value: result.nutrition?.sodium?.value,    unit: 'mg' },
                        { label: 'Protein',   key: 'protein',  value: result.nutrition?.protein?.value,   unit: 'g' },
                        { label: 'Carbs',     key: 'carbs',    value: result.nutrition?.carbs?.value,     unit: 'g' },
                        { label: 'Fiber',     key: 'fiber',    value: result.nutrition?.fiber?.value,     unit: 'g' },
                      ].map((n, i) => {
                        const analysis = result.nutritionAnalysis?.[n.key];
                        return (
                          <motion.div
                            key={n.key}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 + i * 0.04 }}
                            className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0"
                          >
                            <span className="text-slate-400 text-sm">{n.label}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-white font-bold text-sm">{n.value || 0} <span className="text-slate-600 font-normal text-xs">{n.unit}</span></span>
                              {analysis?.verdict && (
                                <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-md ${
                                  analysis.verdict === 'High' ? 'bg-risk/15 text-risk' :
                                  analysis.verdict === 'Low'  ? 'bg-safe/15 text-safe' :
                                  'bg-caution/15 text-caution'
                                }`}>{analysis.verdict}</span>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Warning Labels */}
                  {result.labels?.length > 0 && (
                    <div className="card-static rounded-3xl p-6">
                      <p className="text-risk text-xs font-bold uppercase tracking-wider mb-3">⚠ Warning Labels</p>
                      <div className="flex flex-wrap gap-2">
                        {result.labels.map((l) => (
                          <span key={l} className="text-xs bg-risk/10 border border-risk/25 text-risk px-2.5 py-1.5 rounded-xl font-semibold">{l}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* ══════════ WHY THIS RATING + HEALTH TIPS ══════════ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Why This Rating */}
                {result.whyThisRating?.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                    className="card-static rounded-3xl p-6">
                    <p className="label-sm mb-4">Why Only {result.stars}/5 Stars?</p>
                    <div className="space-y-3">
                      {result.whyThisRating.map((reason, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.06 }}
                          className="flex items-start gap-3"
                        >
                          <span className="text-risk mt-0.5 flex-shrink-0 text-sm">❌</span>
                          <p className="text-slate-300 text-sm leading-relaxed">{reason}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Health Tips */}
                {result.healthTips?.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="card-static rounded-3xl p-6">
                    <p className="label-sm mb-4">Health Tips For You</p>
                    <div className="space-y-3">
                      {result.healthTips.map((tip, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.45 + i * 0.06 }}
                          className="flex items-start gap-3"
                        >
                          <span className="text-safe mt-0.5 flex-shrink-0 text-sm">✅</span>
                          <p className="text-slate-300 text-sm leading-relaxed">{tip}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* ══════════ THE BOTTOM LINE ══════════ */}
              {result.bottomLine && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <div className="card-static rounded-3xl p-6 md:p-8"
                    style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.06), transparent 60%)' }}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-2xl flex-shrink-0">
                        📋
                      </div>
                      <div>
                        <p className="text-gold text-xs font-bold uppercase tracking-wider mb-2">The Bottom Line</p>
                        <p className="text-slate-200 text-[15px] leading-relaxed">{result.bottomLine}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ══════════ HEALTHIER ALTERNATIVES ══════════ */}
              {result.alternatives?.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
                  className="card-static rounded-3xl p-6">
                  <p className="text-safe text-xs font-bold uppercase tracking-wider mb-3">✓ Healthier Alternatives</p>
                  <div className="flex flex-wrap gap-2">
                    {result.alternatives.map((a) => (
                      <span key={a} className="text-xs bg-safe/10 border border-safe/25 text-safe px-3 py-1.5 rounded-xl font-semibold">{a}</span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ══════════ RECOMMENDATION ICONS ══════════ */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                className="card-static rounded-3xl p-6">
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { icon: '🥗', label: 'Eat Real Food' },
                    { icon: '🏃', label: 'Stay Active' },
                    { icon: '💧', label: 'Drink Water' },
                    { icon: '🔍', label: 'Read Labels' },
                    { icon: '❤️', label: 'Enjoy In Moderation' },
                  ].map((item) => (
                    <div key={item.label} className="text-center py-3">
                      <span className="text-2xl block mb-2">{item.icon}</span>
                      <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold leading-tight">{item.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Disclaimer */}
              <p className="text-slate-700 text-xs text-center px-4 leading-relaxed">
                *This analysis is for general information. Individual health conditions may vary. Moderation is key to maintaining a balanced diet.
              </p>

              {/* Scan Another CTA */}
              <Button onClick={reset} variant="outline" fullWidth size="lg" icon="🔄">Scan Another Product</Button>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ScanRatePage;
