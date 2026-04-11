// src/pages/ScanRatePage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import ScanUploadBox from '../components/ScanUploadBox';
import ScanFrame from '../components/ScanFrame';
import NeonButton from '../components/NeonButton';
import HealthBadge from '../components/HealthBadge';
import RatingStars from '../components/RatingStars';
import NutritionChip from '../components/NutritionChip';
import AlertBox from '../components/AlertBox';
import { scanImage } from '../utils/api';
import { scanStages } from '../data/scanResults';

const ScanRatePage = () => {
  const [file,    setFile]    = useState(null);
  const [state,   setState]   = useState('idle');   // idle | scanning | done | error
  const [stage,   setStage]   = useState(0);
  const [result,  setResult]  = useState(null);

  const runScan = async () => {
    if (!file) return;
    setState('scanning'); setStage(0);

    // Animate through stages
    const animPromise = (async () => {
      for (let i = 0; i < scanStages.length; i++) {
        setStage(i);
        await new Promise(r => setTimeout(r, scanStages[i].duration));
      }
    })();

    try {
      const [r] = await Promise.all([scanImage(file), animPromise]);
      setResult(r);
      setState('done');
    } catch {
      setState('error');
    }
  };

  const reset = () => { setFile(null); setResult(null); setState('idle'); setStage(0); };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 bg-safe rounded-full animate-pulse" />
            <span className="hud-label">Module 03</span>
            <span className="text-gray-700 font-mono text-xs">/ AI Scanner</span>
            <span className="ml-2 text-xs font-mono bg-neon-purple/20 text-neon-purple border border-neon-purple/30 px-2 py-0.5 rounded">BETA</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
            AI <span className="neon-text-green">Scanner</span>
          </h1>
          <p className="text-gray-500 font-mono text-sm mt-3 max-w-xl">
            Upload a food packet image. The AI reads the label, extracts nutrients, and generates a health score.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Panel */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="space-y-4">
            <GlassCard color="green">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-7 h-7 rounded-lg bg-safe/20 border border-safe/40 flex items-center justify-center text-xs font-mono text-safe">01</span>
                <p className="hud-label">Upload Packet Image</p>
              </div>
              <ScanUploadBox onImageSelected={(f) => { setFile(f); setResult(null); setState('idle'); }} scanning={state === 'scanning'} />
            </GlassCard>

            {/* Action button */}
            {file && state === 'idle' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <NeonButton onClick={runScan} fullWidth size="xl" icon="🤖" variant="green">
                  Initiate AI Scan
                </NeonButton>
              </motion.div>
            )}

            {state === 'done' && (
              <NeonButton onClick={reset} variant="ghost" fullWidth size="md" icon="🔄">
                Scan Another Product
              </NeonButton>
            )}

            {state === 'error' && (
              <AlertBox type="error" title="SCAN FAILED" message="Could not process image. Ensure label is clearly visible and retry." onClose={reset} />
            )}

            {/* How it works */}
            <GlassCard color="green">
              <p className="hud-label mb-3">Scanner Protocol</p>
              <div className="space-y-2.5">
                {[
                  { step: '01', text: 'Upload packet front/back image' },
                  { step: '02', text: 'AI locates and reads the nutrition table' },
                  { step: '03', text: 'Ingredients and additives extracted' },
                  { step: '04', text: 'Health score generated with warnings' },
                ].map((s) => (
                  <div key={s.step} className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-safe/60">[{s.step}]</span>
                    <span className="text-gray-600">{s.text}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Output Panel */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-4">
            <AnimatePresence mode="wait">
              {/* Idle */}
              {state === 'idle' && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <GlassCard color="green" className="py-12 text-center border-dashed">
                    <div className="relative w-24 h-24 mx-auto mb-5">
                      <ScanFrame className="w-24 h-24 bg-lab-surface border border-safe/20 flex items-center justify-center text-5xl rounded-xl">
                        <span className="flex items-center justify-center w-full h-full text-4xl">📦</span>
                      </ScanFrame>
                      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-lab-bg border border-neon-purple/40 flex items-center justify-center text-sm">🤖</div>
                    </div>
                    <p className="font-mono font-bold text-sm text-gray-400">AI SCANNER STANDBY</p>
                    <p className="text-gray-700 font-mono text-xs mt-2">Upload an image to activate</p>

                    {/* Mock nutrition grid */}
                    <div className="mt-6 grid grid-cols-3 gap-2 opacity-30">
                      {['📊 Cal', '🧂 Salt', '🍬 Sugar', '🥩 Protein', '🧈 Fat', '🔬 Additives'].map((l) => (
                        <div key={l} className="bg-lab-surface border border-lab-border rounded text-xs font-mono text-gray-700 p-2">{l}</div>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Scanning */}
              {state === 'scanning' && (
                <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <GlassCard color="blue">
                    {/* Scan visual */}
                    <ScanFrame scanning className="h-36 bg-lab-surface rounded-lg flex items-center justify-center mb-5 border border-neon-blue/20">
                      <span className="text-5xl relative z-10">📦</span>
                    </ScanFrame>

                    {/* Stage list */}
                    <div className="space-y-2">
                      {scanStages.map((s, i) => {
                        const done   = i < stage;
                        const active = i === stage;
                        return (
                          <motion.div
                            key={s.id}
                            initial={{ opacity: 0.3 }}
                            animate={{ opacity: done || active ? 1 : 0.3 }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg border font-mono text-xs transition-all duration-500
                              ${done   ? 'bg-safe/5 border-safe/30 text-safe' :
                                active ? 'bg-neon-blue/5 border-neon-blue/30 text-neon-blue' :
                                         'bg-lab-surface border-lab-border text-gray-700'}`}
                          >
                            <span className="text-base">{done ? '◉' : active ? '◈' : s.icon}</span>
                            <span className="flex-1 uppercase tracking-widest">{s.label}</span>
                            {active && (
                              <span className="flex gap-0.5">
                                {[0,1,2].map((n) => (
                                  <span key={n} className="w-1 h-3 bg-neon-blue/60 rounded-full animate-bounce" style={{ animationDelay: `${n * 0.1}s` }} />
                                ))}
                              </span>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Result */}
              {state === 'done' && result && (
                <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  {/* Confidence bar */}
                  <div className="flex items-center gap-3 px-4 py-3 glass border border-safe/30 rounded-lg mb-4">
                    <span className="text-lg">🤖</span>
                    <div className="flex-1">
                      <p className="text-safe text-xs font-mono font-bold uppercase tracking-widest">AI Analysis Complete</p>
                      <p className="text-gray-600 text-xs font-mono">{result.confidence}% confidence · {result.brand}</p>
                    </div>
                    <span className="text-safe text-xs font-mono">◉ DONE</span>
                  </div>

                  <GlassCard color="green" padding={false}>
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-lab-border flex items-start justify-between gap-3">
                      <div>
                        <p className="hud-label mb-1">Detected Product</p>
                        <h3 className="text-white font-bold text-xl">{result.detected}</h3>
                        <p className="text-gray-600 text-xs font-mono">{result.brand}</p>
                      </div>
                      <HealthBadge status={result.status} size="lg" />
                    </div>

                    <div className="p-6 space-y-5">
                      <RatingStars stars={result.stars} size="lg" />

                      {/* Verdict */}
                      <div className="bg-caution/5 border border-caution/30 rounded-lg px-4 py-3">
                        <p className="text-caution text-xs font-mono">◈ {result.verdict}</p>
                      </div>

                      {/* Nutrition */}
                      <div>
                        <p className="hud-label mb-3">Extracted Nutrition Data</p>
                        <div className="flex flex-wrap gap-2">
                          <NutritionChip label="Cal" value={result.nutrition.calories.value} unit="kcal" nutritionKey="calories" />
                          <NutritionChip label="Fat" value={result.nutrition.fat.value} unit="g" nutritionKey="fat" />
                          <NutritionChip label="Sugar" value={result.nutrition.sugar.value} unit="g" nutritionKey="sugar" />
                          <NutritionChip label="Salt" value={result.nutrition.salt.value} unit="g" nutritionKey="salt" />
                          <NutritionChip label="Protein" value={result.nutrition.protein.value} unit="g" nutritionKey="protein" />
                        </div>
                      </div>

                      {/* Labels */}
                      <div className="flex flex-wrap gap-2">
                        {result.labels.map((l) => (
                          <span key={l} className="text-xs font-mono bg-risk/5 border border-risk/30 text-risk px-2.5 py-1 rounded">{l}</span>
                        ))}
                      </div>

                      {/* Warnings */}
                      <div className="bg-risk/5 border border-risk/20 rounded-lg p-4">
                        <p className="text-risk text-xs font-mono uppercase tracking-widest mb-2">⚠ Risk Flags</p>
                        {result.warnings.map((w) => (
                          <p key={w} className="text-xs text-gray-500 font-mono">› {w}</p>
                        ))}
                      </div>

                      {/* Suggestion */}
                      <div className="bg-lab-surface border border-lab-border rounded-lg p-4">
                        <p className="text-gray-400 text-xs font-mono leading-relaxed">{result.suggestion}</p>
                      </div>

                      {/* Alternatives */}
                      <div>
                        <p className="text-safe text-xs font-mono uppercase tracking-widest mb-2">◉ Healthier Alternatives</p>
                        <div className="flex flex-wrap gap-2">
                          {result.alternatives.map((a) => (
                            <span key={a} className="text-xs font-mono bg-safe/5 border border-safe/30 text-safe px-2.5 py-1 rounded">{a}</span>
                          ))}
                        </div>
                      </div>
                    </div>
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

export default ScanRatePage;
