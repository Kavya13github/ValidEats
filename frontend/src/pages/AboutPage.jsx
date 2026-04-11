// src/pages/AboutPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import FloatingOrbs from '../components/FloatingOrbs';
import logo from '../assets/logo.png';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const AboutPage = () => {
  const modules = [
    {
      icon: '⭐', border: 'border-gold/15', glow: 'from-gold/5',
      title: 'General Rating',
      how: 'Select any packaged food and an age group. ValidEats cross-references the nutritional profile against age-specific health guidelines and returns a star rating from 1 to 5.',
      steps: ['Select product from database', 'Choose target age group', 'Receive star rating & health explanation', 'View consume / avoid recommendation'],
    },
    {
      icon: '🧬', border: 'border-purple-400/15', glow: 'from-purple-400/5',
      title: 'Personalized Rating',
      how: 'Enter your age, weight, gender, and health conditions. Our algorithm adjusts sugar, sodium, fat, and calorie thresholds based on your profile to produce a score uniquely yours.',
      steps: ['Complete your health profile', 'Select a food product', 'AI adjusts for your conditions', 'Compare: General vs. Your personal rating'],
    },
    {
      icon: '📸', border: 'border-blue-400/15', glow: 'from-blue-400/5',
      title: 'Scan & Rate',
      how: 'Upload a food packet photo. Our AI reads the nutrition table and ingredients, extracts data, flags harmful additives, and produces an instant health score.',
      steps: ['Upload packet image', 'AI reads the nutrition label', 'Ingredients & additives flagged', 'Health score, warnings & alternatives shown'],
    },
  ];

  return (
    <div className="relative min-h-screen page-wrap overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0D1020 0%, #080B14 40%, #0F0C1F 100%)' }}>
      <FloatingOrbs variant="about" />
      <div className="grid-bg absolute inset-0 opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 pt-24 pb-16 space-y-24">

        {/* Hero */}
        <motion.div {...fadeUp()} className="text-center">
          <img src={logo} alt="ValidEats" className="h-20 w-auto mx-auto mb-6 opacity-90 animate-float-fast"
            onError={(e) => { e.target.style.display = 'none'; }} />
          <p className="label-sm mb-4">About ValidEats</p>
          <h1 className="serif text-[clamp(2rem,5vw,3.5rem)] font-black text-white mb-4">The Michelin Guide for<br /><span className="gold-text-shimmer">Everyday Food.</span></h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            ValidEats helps people understand how packaged food affects their specific body — not just in general, but <em className="text-slate-300 not-italic font-semibold">personally</em>.
          </p>
        </motion.div>

        {/* Stats */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gold/10 rounded-3xl overflow-hidden border border-gold/10">
            {[
              { val: '10+', label: 'Products Rated' },
              { val: '3',   label: 'Analysis Modes' },
              { val: '∞',   label: 'Health Profiles' },
              { val: 'AI',  label: 'Powered Engine' },
            ].map((s, i) => (
              <motion.div key={s.label} {...fadeUp(i * 0.1)}
                className="bg-brand-card flex flex-col items-center justify-center py-8 px-4 text-center hover:bg-brand-card-2 transition-colors">
                <span className="stat-number">{s.val}</span>
                <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-2">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why */}
        <section>
          <motion.div {...fadeUp()} className="text-center mb-12">
            <p className="label-sm mb-3">Why We Built This</p>
            <h2 className="section-title">Food is personal. Ratings should be too.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: '🤔', title: 'The Problem',  text: 'Food labels are complicated. Generic ratings ignore your age, weight, and health conditions.' },
              { icon: '💡', title: 'Our Approach',  text: 'We built an engine that adapts to your health profile. Same snack → different scores per person.' },
              { icon: '🎯', title: 'Our Mission',   text: 'Give every person the clarity to make confident food decisions every single day.' },
            ].map((c, i) => (
              <motion.div key={c.title} {...fadeUp(i * 0.1)}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="card p-7">
                <motion.span whileHover={{ scale: 1.3, rotate: 10 }} className="text-3xl block mb-4">{c.icon}</motion.span>
                <h3 className="serif text-lg font-bold text-white mb-2">{c.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{c.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Modules */}
        <section>
          <motion.div {...fadeUp()} className="text-center mb-12">
            <p className="label-sm mb-3">How It Works</p>
            <h2 className="section-title">Three ways to know your food.</h2>
          </motion.div>
          <div className="space-y-5">
            {modules.map((m, i) => (
              <motion.div key={m.title} {...fadeUp(i * 0.1)}
                className={`card-static border ${m.border} overflow-hidden rounded-3xl`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  <div className={`p-7 bg-gradient-to-br ${m.glow} to-transparent`}>
                    <motion.span whileHover={{ scale: 1.3 }} className="text-3xl block mb-3">{m.icon}</motion.span>
                    <h3 className="serif text-xl font-bold text-white mb-3">{m.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{m.how}</p>
                  </div>
                  <div className="p-7 border-t md:border-t-0 md:border-l border-white/5">
                    <p className="label-sm mb-4">Process</p>
                    <ol className="space-y-2.5">
                      {m.steps.map((step, si) => (
                        <li key={step} className="flex items-start gap-3 text-sm">
                          <span className="step-num text-[10px]">{si + 1}</span>
                          <span className="text-slate-400">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Judges CTA */}
        <section>
          <motion.div {...fadeUp()}
            className="rounded-3xl overflow-hidden p-8 md:p-10 text-center border border-gold/15"
            style={{ background: 'linear-gradient(135deg, #1a1408, #0D1020, #130E06)' }}>
            {/* Glow */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.1), transparent 60%)' }} />
            <div className="relative">
              <span className="inline-block text-gold text-xs font-bold tracking-widest uppercase border border-gold/30 px-4 py-1.5 rounded-full mb-6">
                For Judges & Evaluators
              </span>
              <h2 className="serif text-[clamp(1.5rem,3vw,2.5rem)] font-black text-white mb-3">Hackathon-ready. Production-capable.</h2>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xl mx-auto mb-6">
                Fully modular React + Vite frontend with a clean data layer. All API calls in <code className="bg-brand-card px-1.5 py-0.5 rounded text-gold text-xs border border-white/5">utils/api.js</code> — swap dummy functions with real endpoints.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {['React + Vite', 'Tailwind CSS', 'Framer Motion', 'API-ready', 'Mobile-first', 'Production Quality'].map((tag) => (
                  <span key={tag} className="text-xs border border-gold/20 text-gold/60 px-3 py-1 rounded-full">{tag}</span>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/scan"><Button variant="gold" icon="📸">Try AI Scanner</Button></Link>
                <Link to="/personalized"><Button variant="outline" icon="🧬">Personalized Mode</Button></Link>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
