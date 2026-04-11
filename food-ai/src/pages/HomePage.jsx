// src/pages/HomePage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AIOrb from '../components/AIOrb';
import GlassCard from '../components/GlassCard';
import NeonButton from '../components/NeonButton';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { products } from '../data/products';

const stagger = ({ delay = 0 }) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    { icon: '⚡', title: 'INSTANT ANALYSIS', desc: 'Health ratings in under 2 seconds. Real data, zero guesswork.', color: 'blue' },
    { icon: '🎯', title: 'PERSONALIZED', desc: 'Your age, conditions, and goals shape every score.', color: 'purple' },
    { icon: '🤖', title: 'AI SCANNER', desc: 'Point. Scan. Know. Our AI reads labels instantly.', color: 'green' },
    { icon: '💊', title: 'CONDITION AWARE', desc: 'Diabetes? BP? Heart? We factor your health in.', color: 'yellow' },
  ];

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-20">
        {/* Background radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)' }} />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)' }} />
        </div>

        {/* Top HUD bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4 mb-10"
        >
          <span className="flex items-center gap-2 text-xs font-mono text-neon-blue/70 border border-neon-blue/20 px-3 py-1.5 rounded-full glass">
            <span className="w-1.5 h-1.5 bg-safe rounded-full animate-pulse" />
            SYSTEM ONLINE · LAB MODE ACTIVE
          </span>
          <span className="text-xs font-mono text-gray-700 border border-lab-border px-3 py-1.5 rounded-full glass">
            🏆 HACKATHON 2026
          </span>
        </motion.div>

        {/* AI Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="mb-10"
        >
          <AIOrb size="xl" label="VALIDEATS AI" sublabel="Health Simulation Engine v2.0" />
        </motion.div>

        {/* Headline */}
        <motion.div {...stagger({ delay: 0.3 })} className="text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-white">
            We don't rate food.<br />
            <span className="gradient-text">We simulate its effect</span><br />
            on <span className="neon-text-green">YOU.</span>
          </h1>
          <p className="mt-6 text-gray-400 font-mono text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            ValidEats AI Lab analyzes packaged food based on your personal health profile.
            Enter the lab. Understand your food. Protect your body.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div {...stagger({ delay: 0.4 })} className="w-full max-w-xl mt-8">
          <SearchBar
            onSelect={(p) => navigate(`/result/${p.id}`)}
            placeholder="SCAN PRODUCT DATABASE..."
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div {...stagger({ delay: 0.5 })} className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <Link to="/general-rating">
            <NeonButton variant="primary" size="lg" icon="📊">Lab Analysis</NeonButton>
          </Link>
          <Link to="/personalized">
            <NeonButton variant="purple" size="lg" icon="🎯">DNA Mode</NeonButton>
          </Link>
          <Link to="/scan">
            <NeonButton variant="solid" size="lg" icon="🤖">AI Scanner</NeonButton>
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div {...stagger({ delay: 0.6 })} className="flex flex-wrap items-center justify-center gap-8 mt-12">
          {[
            { val: '10+', label: 'Products in DB' },
            { val: '03', label: 'Analysis Modes' },
            { val: '∞', label: 'Health Combos' },
            { val: 'AI', label: 'Powered Core' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-mono font-black text-2xl gradient-text">{s.val}</p>
              <p className="font-mono text-xs text-gray-600 uppercase tracking-widest mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 flex flex-col items-center gap-2 text-gray-700"
        >
          <p className="font-mono text-xs uppercase tracking-widest">Scroll to explore</p>
          <div className="w-px h-8 bg-gradient-to-b from-neon-blue/50 to-transparent" />
        </motion.div>
      </section>

      {/* ── Feature Cards ── */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-neon-blue/20" />
            <p className="hud-label">System Capabilities</p>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-neon-blue/20" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard color={f.color} className="h-full">
                  <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-2xl
                    ${f.color === 'blue' ? 'bg-neon-blue/10 border border-neon-blue/30' :
                      f.color === 'purple' ? 'bg-neon-purple/10 border border-neon-purple/30' :
                      f.color === 'green' ? 'bg-safe/10 border border-safe/30' :
                      'bg-caution/10 border border-caution/30'}`}>
                    {f.icon}
                  </div>
                  <p className="font-mono font-bold text-xs uppercase tracking-widest text-gray-200 mb-2">{f.title}</p>
                  <p className="font-mono text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-neon-blue/20" />
            <p className="hud-label">Protocol Steps</p>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-neon-blue/20" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: '01', icon: '🔍', title: 'Select Product', desc: 'Choose from our curated food database or scan a packet image.' },
              { n: '02', icon: '📊', title: 'Input Your Profile', desc: 'Age, health conditions, and how often you eat it — we need it all.' },
              { n: '03', icon: '🧠', title: 'AI Generates Score', desc: 'Get a personalized health simulation result with warnings and guidance.' },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative glass border border-lab-border rounded-xl p-6 text-center"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neon-blue text-lab-bg text-xs font-mono font-bold px-3 py-0.5 rounded-full">
                  STEP {s.n}
                </div>
                <div className="w-16 h-16 bg-lab-surface border border-lab-border rounded-xl flex items-center justify-center text-3xl mx-auto mt-3 mb-4">
                  {s.icon}
                </div>
                <h3 className="font-mono font-bold text-sm text-gray-200 mb-2 uppercase tracking-wider">{s.title}</h3>
                <p className="font-mono text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 Feature Sections ── */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-neon-blue/20" />
            <p className="hud-label">Lab Modules</p>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-neon-blue/20" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                path: '/general-rating', icon: '📊', color: 'blue',
                code: 'MODULE 01',
                title: 'Lab Analysis Mode',
                desc: 'Standard food rating by age group. Understand how a snack affects kids vs adults vs seniors.',
                cta: 'Enter Lab',
              },
              {
                path: '/personalized', icon: '🎯', color: 'purple',
                code: 'MODULE 02',
                title: 'DNA Simulation Mode',
                desc: 'Input your complete health profile — diabetes, BP, obesity, fitness — and get a rating built for you.',
                cta: 'Start Simulation',
              },
              {
                path: '/scan', icon: '🤖', color: 'green',
                code: 'MODULE 03',
                title: 'AI Scanner',
                desc: 'Upload or take a photo of any food packet. Our AI decodes the label and generates an instant health score.',
                cta: 'Launch Scanner',
              },
            ].map((m) => (
              <GlassCard key={m.path} color={m.color} className="flex flex-col" hover>
                <p className="hud-label mb-2">{m.code}</p>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4
                  ${m.color === 'blue' ? 'bg-neon-blue/10 border border-neon-blue/30' :
                    m.color === 'purple' ? 'bg-neon-purple/10 border border-neon-purple/30' :
                    'bg-safe/10 border border-safe/30'}`}>
                  {m.icon}
                </div>
                <h3 className="font-mono font-bold text-sm text-gray-100 uppercase tracking-wider mb-3">{m.title}</h3>
                <p className="font-mono text-xs text-gray-500 leading-relaxed flex-1 mb-5">{m.desc}</p>
                <Link to={m.path}>
                  <NeonButton variant={m.color === 'blue' ? 'primary' : m.color === 'purple' ? 'purple' : 'green'} fullWidth size="md" iconRight="→">
                    {m.cta}
                  </NeonButton>
                </Link>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sample Products ── */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-neon-blue/20" />
            <p className="hud-label">Product Database</p>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-neon-blue/20" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.slice(0, 8).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <ProductCard product={p} onClick={() => navigate(`/result/${p.id}`)} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/general-rating">
              <NeonButton variant="primary" size="lg" iconRight="→">View All Products</NeonButton>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-pad">
        <div className="max-w-3xl mx-auto">
          <div className="relative glass border border-neon-blue/20 rounded-2xl p-10 text-center overflow-hidden">
            <div className="absolute inset-0 pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0,212,255,0.05) 0%, transparent 70%)' }} />
            <div className="relative">
              <AIOrb size="sm" label="" sublabel="" />
              <h2 className="text-3xl md:text-4xl font-black text-white mt-6 mb-3">
                Enter the <span className="gradient-text">Lab.</span>
              </h2>
              <p className="text-gray-500 font-mono text-sm mb-8">
                Your food. Your health. Your data. One scan at a time.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/scan">
                  <NeonButton variant="solid" size="xl" icon="🤖">Launch AI Scanner</NeonButton>
                </Link>
                <Link to="/personalized">
                  <NeonButton variant="primary" size="xl" icon="🎯">Start DNA Mode</NeonButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
