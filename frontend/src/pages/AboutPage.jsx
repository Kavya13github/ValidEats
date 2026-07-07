import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import StatNumber from '../components/StatNumber';
import {
  SITE_PRODUCTS_APPROX,
  SITE_SCANS_APPROX,
  SITE_MODES_COUNT,
  SITE_SCALE_STARS,
} from '../data/siteStats';
import FloatingOrbs from '../components/FloatingOrbs';
import logo from '../assets/logo.png';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const AboutPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [location.pathname, location.hash]);

  const modules = [
    {
      icon: '⭐', border: 'border-gold/15', glow: 'from-gold/5',
      title: 'General',
      how: 'grab something crunchy, tell us who it\'s for — we answer in stars and plain english.',
    },
    {
      icon: '🧬', border: 'border-purple-400/15', glow: 'from-purple-400/5',
      title: 'My score',
      how: 'spill the habits, the meds, the cravings — the same chip bag bends its score for you.',
    },
    {
      icon: '📸', border: 'border-blue-400/15', glow: 'from-blue-400/5',
      title: 'Scan',
      how: 'send a crooked photo from the trolley — we still chase every ingredient down.',
    },
  ];

  return (
    <div className="relative min-h-screen page-wrap overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0D1020 0%, #080B14 40%, #0F0C1F 100%)' }}>
      <FloatingOrbs variant="about" />
      <div className="grid-bg absolute inset-0 opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8 pt-24 pb-16 space-y-16">

        <motion.div {...fadeUp()} className="text-center">
          <img src={logo} alt="ValidEats" className="h-16 w-auto mx-auto mb-5 opacity-90"
            onError={(e) => { e.target.style.display = 'none'; }} />
          <p className="label-sm mb-3">About</p>
          <h1 className="mb-3 leading-tight">
            <span className="type-elegant text-[clamp(2.75rem,6vw,4.25rem)] text-white block sm:inline">Small print,</span>{' '}
            <span className="type-sans-pair text-[clamp(1.15rem,2.8vw,1.65rem)] text-slate-200 block sm:inline mt-1 sm:mt-0">
              <span className="gold-text-shimmer">honest bite.</span>
            </span>
          </h1>
          <p className="type-hand text-slate-500 max-w-md mx-auto px-2 normal-case">
            we scribble stars on the snacks you actually buy — nothing corporate, just kitchen-table energy.
          </p>
        </motion.div>

        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gold/10 rounded-2xl overflow-hidden border border-gold/10">
            {[
              { target: SITE_PRODUCTS_APPROX, suffix: '+', label: 'Products', to: '/general-rating' },
              { target: SITE_MODES_COUNT,     suffix: '',  label: 'Modes',    to: '/about#three-modes' },
              { target: SITE_SCALE_STARS,     suffix: '★', label: 'Scale',    to: '/about#how-we-score' },
              { target: SITE_SCANS_APPROX,    suffix: '+', label: 'Scans',    to: '/scan' },
            ].map((s, i) => (
              <motion.div key={s.label} {...fadeUp(i * 0.06)} className="min-h-0">
                <motion.div
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                  className="h-full"
                >
                  <Link
                    to={s.to}
                    className="bg-brand-card flex flex-col items-center justify-center py-8 px-4 text-center min-h-[128px] h-full w-full
                      hover:bg-brand-card-2 transition-colors cursor-pointer
                      outline-none focus-visible:ring-2 focus-visible:ring-gold/45 focus-visible:ring-inset"
                  >
                    <StatNumber target={s.target} suffix={s.suffix} delay={i * 140} />
                    <span className="text-slate-300 text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] mt-3 max-w-[12rem] leading-snug">
                      {s.label}
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        <p
          id="how-we-score"
          className="scroll-mt-28 mt-10 text-center type-hand-sm text-slate-400 normal-case max-w-md mx-auto px-2"
        >
          the whole app hangs on one stubborn little rail: <span className="text-gold/90 font-semibold">1–5★</span>, no fog, no decimals in your face.
        </p>

        <section>
          <motion.div {...fadeUp()} className="text-center mb-8">
            <p className="label-sm mb-2">Why</p>
            <h2 className="leading-tight text-center">
              <span className="type-elegant text-[clamp(2.25rem,4.5vw,3.1rem)] text-white block sm:inline">Personal</span>
              <span className="font-sans font-semibold text-[clamp(1.1rem,2.3vw,1.5rem)] text-slate-300 tracking-tight block sm:inline sm:ml-2 mt-1 sm:mt-0">beats generic.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: '🤔', title: 'Problem',  text: 'Nutrition grids love to whisper in tongues.' },
              { icon: '💡', title: 'Fix',      text: 'We hum it back as one stubborn little star.' },
              { icon: '🎯', title: 'Goal',     text: 'You leave the aisle nodding, not dizzy.' },
            ].map((c, i) => (
              <motion.div key={c.title} {...fadeUp(i * 0.06)}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="card p-5">
                <span className="text-2xl block mb-2">{c.icon}</span>
                <h3 className="font-elegant text-3xl text-white mb-1 leading-none">{c.title}</h3>
                <p className="type-hand-sm text-slate-500 leading-snug normal-case">{c.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="three-modes" className="scroll-mt-28">
          <motion.div {...fadeUp()} className="text-center mb-8">
            <p className="label-sm mb-2">Modes</p>
            <h2 className="leading-tight text-center">
              <span className="type-elegant text-[clamp(2.2rem,4.4vw,3rem)] text-white block sm:inline">Three doors.</span>
              <span className="font-sans font-semibold text-[clamp(1.05rem,2.2vw,1.45rem)] text-slate-300 tracking-tight block sm:inline sm:ml-2 mt-1 sm:mt-0">Same idea.</span>
            </h2>
          </motion.div>
          <div className="space-y-4">
            {modules.map((m, i) => (
              <motion.div key={m.title} {...fadeUp(i * 0.06)}
                className={`card-static border ${m.border} p-5 rounded-2xl bg-gradient-to-br ${m.glow} to-transparent`}>
                <span className="text-2xl block mb-2">{m.icon}</span>
                <h3 className="font-elegant text-3xl text-white mb-1.5 leading-none">{m.title}</h3>
                <p className="type-hand-sm text-slate-500 leading-snug normal-case">{m.how}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <motion.div {...fadeUp()}
            className="rounded-2xl overflow-hidden p-6 md:p-8 text-center border border-gold/15"
            style={{ background: 'linear-gradient(135deg, #1a1408, #0D1020, #130E06)' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.1), transparent 60%)' }} />
            <div className="relative">
              <h2 className="type-elegant text-3xl md:text-4xl text-white mb-2 leading-none">Play with it</h2>
              <p className="type-hand-sm text-slate-500 max-w-sm mx-auto mb-5 normal-case">
                built in react — swap <code className="bg-brand-card px-1 py-0.5 rounded text-gold text-[10px] border border-white/5">utils/api.js</code> when you wire the real kitchen.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Link to="/scan"><Button variant="gold" size="md" icon="📸">Scan</Button></Link>
                <Link to="/personalized"><Button variant="outline" size="md" icon="🧬">My score</Button></Link>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
