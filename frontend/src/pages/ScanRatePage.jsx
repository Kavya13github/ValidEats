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

const ScanNutrientBar = ({ label, value, unit, max, color, delay = 0 }) => {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay, duration: 0.4 }} className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">{label}</span>
        <span className="text-[11px] font-bold" style={{ color }}>{value}{unit}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div className="h-full rounded-full" style={{ background: color }}
          initial={{ width: 0 }} animate={{ width: `${pct}%` }}
          transition={{ delay: delay + 0.1, duration: 0.7, ease: 'easeOut' }} />
      </div>
    </motion.div>
  );
};

const ScanScoreRing = ({ stars, status }) => {
  const r = 32; const circ = 2 * Math.PI * r;
  const dash = (stars / 5) * circ;
  const color = status === 'safe' ? '#22c55e' : status === 'risk' ? '#ef4444' : '#f59e0b';
  const label = status === 'safe' ? 'SAFE' : status === 'risk' ? 'RISK' : 'CAUTION';
  return (
    <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: 80, height: 80 }}>
      <svg width="80" height="80" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
        <motion.circle cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"
          strokeDasharray={`${circ}`}
          initial={{ strokeDashoffset: circ }} animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
          style={{ filter: `drop-shadow(0 0 5px ${color}88)` }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-black text-white leading-none">{stars.toFixed(1)}</span>
        <span className="text-[8px] font-bold tracking-widest mt-0.5" style={{ color }}>{label}</span>
      </div>
    </div>
  );
};

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
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="type-hand-sm text-gold/85 mb-1 normal-case">scan lane</p>
          <h1 className="mb-2 leading-tight">
            <span className="type-elegant text-[clamp(2.75rem,6vw,4rem)] text-white block sm:inline">Show us the foil.</span>
            <span className="type-sans-pair text-[clamp(1.05rem,2.5vw,1.45rem)] text-slate-300 block sm:inline sm:ml-2 mt-1 sm:mt-0">we chase the ink.</span>
          </h1>
          <p className="type-hand-sm text-slate-500 max-w-md normal-case">crooked light, crumpled corners — still readable if you mean it.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="space-y-5">
            <div className="card-static p-7 rounded-3xl">
              <ScanUploadBox
                onImageSelected={(f) => { setFile(f); setResult(null); setState('idle'); toast.show('Image loaded ✓', 'success', 2000); }}
                scanning={state === 'scanning'}
              />
              {file && state === 'idle' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5">
                  <Button onClick={runScan} fullWidth size="lg" icon="📸">Analyze</Button>
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

            <div className="card-static p-5 rounded-3xl">
              <p className="label-sm mb-3">How</p>
              <div className="space-y-2">
                {[
                  { n: '1', text: 'Upload a sharp front-of-pack shot.' },
                  { n: '2', text: 'We read nutrition + ingredients.' },
                  { n: '3', text: 'You get stars and quick warnings.' },
                ].map((s) => (
                  <div key={s.n} className="flex items-start gap-2.5 text-xs">
                    <span className="text-gold/60 font-bold w-4 flex-shrink-0">{s.n}</span>
                    <span className="text-slate-400 leading-snug">{s.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="space-y-4">
            <AnimatePresence mode="wait">

              {state === 'idle' && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="card rounded-3xl py-20 text-center border-dashed" style={{ borderColor: 'rgba(20,184,166,0.2)' }}>
                    <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}
                      className="text-6xl block mb-5">📦</motion.span>
                    <p className="text-slate-300 font-bold text-sm mb-1">Drop a photo here</p>
                    <p className="text-slate-600 text-sm">Upload a packet to start the analysis</p>
                    <div className="mt-6 grid grid-cols-3 gap-2 opacity-20 max-w-48 mx-auto">
                      {['Cal', 'Fat', 'Sugar', 'Salt', 'Protein', 'Adds.'].map((l) => (
                        <div key={l} className="bg-brand-card border border-white/5 rounded-xl text-xs text-slate-600 p-2 text-center">{l}</div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {state === 'scanning' && (
                <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="card-static p-7 rounded-3xl">
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

              {state === 'done' && result && (
                <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="flex items-center gap-3 px-4 py-3 mb-4 rounded-2xl"
                    style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.22)' }}>
                    <motion.span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: '#22c55e' }}
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <p className="text-green-400 text-sm font-semibold">Analysis complete</p>
                    <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden ml-1">
                      <motion.div className="h-full rounded-full bg-green-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${result.confidence}%` }}
                        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
                      />
                    </div>
                    <span className="text-green-400 text-xs font-bold">{result.confidence}%</span>
                  </div>

                  <div className="rounded-3xl overflow-hidden"
                    style={{ border: `1px solid ${result.status === 'safe' ? 'rgba(34,197,94,0.2)' : result.status === 'risk' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)'}`, background: '#0D1020' }}>
                    
                    <div className="px-5 py-3 flex items-center justify-between"
                      style={{ background: `${result.status === 'safe' ? 'rgba(34,197,94,0.04)' : result.status === 'risk' ? 'rgba(239,68,68,0.04)' : 'rgba(245,158,11,0.04)'}`, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase"
                        style={{ color: result.status === 'safe' ? '#22c55e' : result.status === 'risk' ? '#ef4444' : '#f59e0b' }}>
                        ● SCAN ANALYSIS REPORT
                      </span>
                      <span className="text-[10px] text-slate-600 font-mono">ValidEats AI v2.0</span>
                    </div>

                    <div className="px-5 pt-5 pb-4 flex items-center justify-between gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <div>
                        <p className="text-slate-500 text-xs mb-1">Detected Product</p>
                        <h3 className="text-white font-sans font-bold text-xl tracking-tight">{result.detected}</h3>
                        <p className="text-slate-600 text-xs mt-0.5">{result.brand}</p>
                      </div>
                      <HealthBadge status={result.status} size="lg" />
                    </div>

                    <div className="p-5 space-y-5">
                      <div className="flex items-center gap-4">
                        <ScanScoreRing stars={result.stars} status={result.status} />
                        <div>
                          <RatingStars stars={result.stars} size="md" />
                          <div className="mt-2 inline-flex px-3 py-1.5 rounded-xl text-xs font-bold"
                            style={{
                              background: `${result.status === 'safe' ? 'rgba(34,197,94,0.12)' : result.status === 'risk' ? 'rgba(239,68,68,0.12)' : 'rgba(245,158,11,0.12)'}`,
                              border: `1px solid ${result.status === 'safe' ? 'rgba(34,197,94,0.3)' : result.status === 'risk' ? 'rgba(239,68,68,0.3)' : 'rgba(245,158,11,0.3)'}`,
                              color: result.status === 'safe' ? '#22c55e' : result.status === 'risk' ? '#ef4444' : '#f59e0b',
                            }}>
                            {result.verdict}
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl space-y-3"
                        style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Nutritional Profile · per 100g</p>
                        <ScanNutrientBar label="Calories" value={result.nutrition.calories.value} unit=" kcal" max={600} color="#f59e0b" delay={0.05} />
                        <ScanNutrientBar label="Fat"      value={result.nutrition.fat.value}      unit="g"    max={40}  color="#ef4444" delay={0.10} />
                        <ScanNutrientBar label="Sugar"    value={result.nutrition.sugar.value}    unit="g"    max={50}  color="#f97316" delay={0.15} />
                        <ScanNutrientBar label="Salt"     value={result.nutrition.salt.value}     unit="g"    max={5}   color="#eab308" delay={0.20} />
                        <ScanNutrientBar label="Protein"  value={result.nutrition.protein.value}  unit="g"    max={30}  color="#22c55e" delay={0.25} />
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {result.labels.map((l) => (
                          <span key={l} className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg"
                            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.28)', color: '#f87171' }}>
                            {l}
                          </span>
                        ))}
                      </div>

                      {(result.warnings?.length > 0 || result.positives?.length > 0) && (
                        <div className="grid grid-cols-1 gap-3">
                          {result.warnings?.length > 0 && (
                            <div className="p-4 rounded-2xl"
                              style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.18)' }}>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-2.5">⚠ Risk Factors</p>
                              <ul className="space-y-1.5">
                                {result.warnings.map((w, i) => (
                                  <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                                    <span className="text-red-500 mt-0.5 text-[10px] flex-shrink-0">●</span>{w}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {result.positives?.length > 0 && (
                            <div className="p-4 rounded-2xl"
                              style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.18)' }}>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-green-400 mb-2.5">✓ Positives</p>
                              <ul className="space-y-1.5">
                                {result.positives.map((p, i) => (
                                  <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                                    <span className="text-green-500 mt-0.5 text-[10px] flex-shrink-0">●</span>{p}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="p-4 rounded-2xl"
                        style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="flex items-center gap-2 mb-2">
                          <span>🧠</span>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">AI Recommendation</p>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">{result.suggestion}</p>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-green-400 mb-2.5">✓ Healthier Alternatives</p>
                        <div className="flex flex-wrap gap-2">
                          {result.alternatives.map((a) => (
                            <span key={a} className="text-xs px-2.5 py-1.5 rounded-xl font-semibold"
                              style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', color: '#4ade80' }}>
                              {a}
                            </span>
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
