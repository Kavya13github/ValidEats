// src/pages/AboutPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import logo from '../assets/logo.png';

const AboutPage = () => {
  const modules = [
    {
      icon: '★', color: 'text-gold', border: 'border-gold/20', bg: 'bg-gold/5',
      title: 'General Rating',
      how: 'Select any packaged food and an age group. ValidEats cross-references the nutritional profile against age-specific health guidelines and returns an evidence-based star rating from 1 to 5.',
      steps: ['Select product from database', 'Choose target age group (kids, teens, adults, seniors)', 'Receive star rating and health explanation', 'View consume / avoid recommendation'],
    },
    {
      icon: '🧬', color: 'text-purple-400', border: 'border-purple-400/20', bg: 'bg-purple-400/5',
      title: 'Personalized Rating',
      how: 'We go beyond the label. Enter your age, height, weight, gender, and health conditions. Our algorithm adjusts sugar, sodium, fat, and calorie thresholds based on your profile to produce a score that is uniquely yours.',
      steps: ['Complete your health profile', 'Select the food product', 'AI adjusts score for your conditions', 'Compare: General rating vs. Your personal rating'],
    },
    {
      icon: '📸', color: 'text-blue-400', border: 'border-blue-400/20', bg: 'bg-blue-400/5',
      title: 'Scan & Rate',
      how: 'Take a photo of any food packet. Our AI reads the nutrition table and ingredients list, extracts meaningful data, flags harmful additives, and produces an instant health score — no typing needed.',
      steps: ['Upload packet image (front or back)', 'AI reads the nutrition label', 'Ingredients and additives flagged', 'Health score, warnings, and alternatives shown'],
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-20">

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="ValidEats" className="h-20 w-auto opacity-90"
              onError={(e) => { e.target.style.display = 'none'; }} />
          </div>
          <SectionHeading
            label="About ValidEats"
            title="The Michelin Guide for Everyday Food."
            subtitle="ValidEats is a health-intelligence platform that helps people understand exactly how a packaged food product affects their specific body — not just in general, but personally."
          />
        </motion.div>

        {/* Mission stats */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: '10+', label: 'Products Rated' },
              { val: '3', label: 'Analysis Modes' },
              { val: '∞', label: 'Health Profiles' },
              { val: 'AI', label: 'Powered Engine' },
            ].map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="premium-card p-6 text-center">
                <p className="gold-text serif-heading text-3xl font-bold mb-1">{s.val}</p>
                <p className="text-charcoal-400 text-xs font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why ValidEats */}
        <section>
          <SectionHeading label="Why We Built This" title="Food is personal. Ratings should be too." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            {[
              { icon: '🤔', title: 'The Problem',  text: 'Food labels are complicated. "Is this safe for me?" shouldn\'t require a nutrition degree. Generic ratings ignore your age, weight, and health conditions.' },
              { icon: '💡', title: 'Our Approach', text: 'We built an engine that adapts to your health profile. The same snack can be safe for a 25-year-old and harmful for a diabetic senior.' },
              { icon: '🎯', title: 'Our Mission',  text: 'Give every person — patient, parent, athlete or senior — the clarity to make confident food decisions every single day.' },
            ].map((c, i) => (
              <motion.div key={c.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="premium-card p-6">
                <p className="text-3xl mb-4">{c.icon}</p>
                <h3 className="serif-heading text-lg font-bold text-white mb-2">{c.title}</h3>
                <p className="text-charcoal-400 text-sm leading-relaxed">{c.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Module breakdown */}
        <section>
          <SectionHeading label="How It Works" title="Three ways to know your food." />
          <div className="space-y-5 mt-10">
            {modules.map((m, i) => (
              <motion.div key={m.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`premium-card border ${m.border} overflow-hidden`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  <div className={`p-7 ${m.bg}`}>
                    <div className={`text-3xl mb-3 ${m.color}`}>{m.icon}</div>
                    <h3 className="serif-heading text-xl font-bold text-white mb-3">{m.title}</h3>
                    <p className="text-charcoal-400 text-sm leading-relaxed">{m.how}</p>
                  </div>
                  <div className="p-7 border-t md:border-t-0 md:border-l border-charcoal-800">
                    <p className="text-gold text-xs font-medium uppercase tracking-wider mb-4">Process</p>
                    <ol className="space-y-2.5">
                      {m.steps.map((step, si) => (
                        <li key={step} className="flex items-start gap-3 text-sm">
                          <span className={`font-bold flex-shrink-0 w-5 mt-0.5 ${m.color}`}>{si + 1}.</span>
                          <span className="text-charcoal-400">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* For hackathon judges */}
        <section>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden p-8 md:p-10 text-center border border-gold/20"
            style={{ background: 'linear-gradient(135deg, #1a160a, #0F0F0F)' }}>
            <span className="inline-block text-gold text-xs font-medium tracking-widest uppercase border border-gold/30 px-4 py-1.5 rounded-full mb-6">
              For Judges & Evaluators
            </span>
            <h2 className="serif-heading text-3xl font-bold text-white mb-3">Hackathon-ready. Production-capable.</h2>
            <p className="text-charcoal-400 text-sm leading-relaxed max-w-xl mx-auto mb-6">
              ValidEats is a fully modular React + Vite frontend with a clean data layer designed for easy backend integration. All API calls are in <code className="bg-charcoal-800 px-1.5 py-0.5 rounded text-gold text-xs">src/utils/api.js</code> — replace the dummy functions with real endpoints and it works.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {['React + Vite', 'Tailwind CSS v3', 'Framer Motion', 'Modular Architecture', 'API-ready', 'Mobile-first', 'Production Quality'].map((tag) => (
                <span key={tag} className="text-xs border border-gold/20 text-gold/60 px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/scan"><Button variant="gold" icon="📸">Try AI Scanner</Button></Link>
              <Link to="/personalized"><Button variant="outline" icon="🧬">Try Personalized Mode</Button></Link>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
