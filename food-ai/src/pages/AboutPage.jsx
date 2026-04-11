// src/pages/AboutPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import NeonButton from '../components/NeonButton';
import AIOrb from '../components/AIOrb';

const AboutPage = () => {
  const modules = [
    {
      n: '01', color: 'blue', icon: '📊',
      title: 'Lab Analysis Mode',
      desc: 'Select any packaged food. Choose an age group. Our system scores it based on nutritional data and returns a health verdict with warnings and safe frequencies.',
      steps: ['Select product from database', 'Choose target age group', 'View star rating + explanation', 'See consume/avoid suggestion'],
    },
    {
      n: '02', color: 'purple', icon: '🧬',
      title: 'DNA Simulation Mode',
      desc: 'The most powerful feature. Input your age, weight, health conditions (diabetes, BP, obesity, heart, fitness) and how often you eat a product. AI generates a score built only for you.',
      steps: ['Enter full health profile', 'Select target product', 'AI adjusts score for your conditions', 'Get personalized warnings & guidance'],
    },
    {
      n: '03', color: 'green', icon: '🤖',
      title: 'AI Scanner',
      desc: 'Upload a food packet photo. The AI reads the nutrition label, extracts ingredients and nutritional data, and generates a health score. Ready for ML model integration.',
      steps: ['Upload packet image', 'AI reads nutrition label', 'Extracts and validates data', 'Health score generated with alternatives'],
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-16">

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="flex justify-center mb-8">
            <AIOrb size="md" label="SYSTEM INFO" sublabel="Module Documentation" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-2 h-2 bg-safe rounded-full animate-pulse" />
            <span className="hud-label">About</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-5">
            About <span className="gradient-text">ValidEats</span>
          </h1>
          <p className="text-gray-500 font-mono text-sm max-w-2xl mx-auto leading-relaxed">
            ValidEats is a health-tech AI lab designed to help people understand how packaged food
            affects their specific biology. Not generic info — a simulation built for YOU.
          </p>
        </motion.div>

        {/* Problem / Solution / Goal */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-neon-blue/20" />
            <p className="hud-label">System Rationale</p>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-neon-blue/20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { n: '01', color: 'red',    icon: '🤔', title: 'The Problem',   text: 'Food labels are confusing. Health impact varies by person. No tool personalizes nutrition science for everyday people.' },
              { n: '02', color: 'blue',   icon: '💡', title: 'Our Solution',  text: 'ValidEats translates complex nutrition into a simple, personalized health score — in seconds, for anyone.' },
              { n: '03', color: 'green',  icon: '🎯', title: 'The Impact',    text: 'Empowering patients, parents, seniors, and fitness users with food intelligence that actually applies to them.' },
            ].map((c, i) => (
              <motion.div key={c.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <GlassCard color={c.color} className="h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-mono text-gray-600">[{c.n}]</span>
                    <span className="text-2xl">{c.icon}</span>
                  </div>
                  <p className="font-mono font-bold text-xs uppercase tracking-widest text-gray-200 mb-2">{c.title}</p>
                  <p className="font-mono text-xs text-gray-500 leading-relaxed">{c.text}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How Each Module Works */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-neon-blue/20" />
            <p className="hud-label">Module Documentation</p>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-neon-blue/20" />
          </div>

          <div className="space-y-5">
            {modules.map((m, i) => (
              <motion.div key={m.n} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <GlassCard color={m.color} padding={false}>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-mono text-gray-600">MODULE {m.n}</span>
                        <span className="text-2xl">{m.icon}</span>
                      </div>
                      <h3 className="font-mono font-bold text-lg text-gray-200 uppercase tracking-wider mb-3">{m.title}</h3>
                      <p className="font-mono text-xs text-gray-500 leading-relaxed">{m.desc}</p>
                    </div>
                    <div>
                      <p className="hud-label mb-3">Protocol Steps</p>
                      <ol className="space-y-2">
                        {m.steps.map((step, si) => (
                          <li key={step} className="flex items-start gap-3 text-xs font-mono text-gray-600">
                            <span className={`font-bold ${m.color === 'blue' ? 'text-neon-blue' : m.color === 'purple' ? 'text-neon-purple' : 'text-safe'}`}>
                              0{si + 1}.
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-neon-blue/20" />
            <p className="hud-label">Tech Stack</p>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-neon-blue/20" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '⚛️', label: 'React + Vite', sub: 'Frontend Framework' },
              { icon: '🎨', label: 'Tailwind CSS', sub: 'Styling System' },
              { icon: '🎬', label: 'Framer Motion', sub: 'Animations' },
              { icon: '🤖', label: 'AI-Ready', sub: 'API Integration Ready' },
            ].map((t) => (
              <GlassCard key={t.label} className="text-center py-6">
                <p className="text-3xl mb-2">{t.icon}</p>
                <p className="font-mono font-bold text-xs text-gray-200 uppercase tracking-wider">{t.label}</p>
                <p className="font-mono text-xs text-gray-600 mt-1">{t.sub}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* For Judges */}
        <section>
          <div className="relative glass border border-neon-blue/20 rounded-2xl p-8 text-center overflow-hidden">
            <div className="absolute inset-0 pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(0,212,255,0.05) 0%, transparent 60%)' }} />
            <div className="relative">
              <span className="text-xs font-mono text-neon-blue/60 border border-neon-blue/20 px-3 py-1 rounded-full mb-4 inline-block">
                ◈ For Judges & Evaluators
              </span>
              <h2 className="text-2xl font-black text-white mb-3">Hackathon Ready. Production Capable.</h2>
              <p className="text-gray-500 font-mono text-sm max-w-2xl mx-auto leading-relaxed mb-6">
                ValidEats is a full-stack-ready frontend. All components are modular and reusable. Data layer is separated with API stubs (utils/api.js) ready for backend integration. The scan feature is architecturally prepared for a real ML vision model.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {['React + Vite', 'Tailwind CSS v3', 'Framer Motion', 'AI-Ready Arch', 'Fully Responsive', 'Clean Code'].map((tag) => (
                  <span key={tag} className="text-xs font-mono border border-neon-blue/20 text-neon-blue/60 px-3 py-1 rounded">{tag}</span>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/scan"><NeonButton variant="solid" icon="🤖">Try AI Scanner</NeonButton></Link>
                <Link to="/personalized"><NeonButton variant="purple" icon="🧬">Try DNA Mode</NeonButton></Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;
