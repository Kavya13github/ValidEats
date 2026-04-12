import React, { useState, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import RatingStars from '../components/RatingStars';
import FloatingOrbs from '../components/FloatingOrbs';
const HeroScene   = React.lazy(() => import('../components/HeroScene'));
const Page3DAccent = React.lazy(() => import('../components/Page3DAccent'));
import logo from '../assets/logo.png';
import { products } from '../data/products';

/* ── Animation helpers ── */
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 32 },
  whileInView:{ opacity: 1, y: 0 },
  viewport:   { once: true },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});
const stagger = (i) => ({ delay: i * 0.1 });

const HomePage = () => {
  const navigate   = useNavigate();
  const [tipOpen, setTipOpen] = useState(false);

  const features = [
    { icon: '⭐', emoji: '⭐', title: 'Verified Ratings',      desc: 'Evidence-based health scores using real nutritional science.' },
    { icon: '🧬', title: 'Personalized',       desc: 'Scores built for your age, weight, and health conditions.' },
    { icon: '📸', title: 'AI-Powered Scan',    desc: 'Photo → health score in seconds. No typing required.' },
    { icon: '⚡', title: 'Instant Results',     desc: 'No waiting. Know your food before you eat it.' },
  ];

  const stats = [
    { val: '10+', label: 'Foods Rated' },
    { val: '3',   label: 'Analysis Modes' },
    { val: '5★',  label: 'Max Rating' },
    { val: '∞',   label: 'Health Profiles' },
  ];

  const testimonials = [
    { name: 'Priya S.', sub: 'Diabetic care | Chennai', text: 'Finally I know which biscuits are safe for my father. The personalised mode is incredible.', stars: 5 },
    { name: 'Arjun M.', sub: 'Fitness | Mumbai',        text: 'The personalized score showed me exactly why Maggi is bad for my sodium limit.', stars: 5 },
    { name: 'Kavya R.', sub: 'Parent | Bangalore',      text: 'Scanned Kurkure in 3 seconds. The ingredient breakdown was eye-opening.', stars: 4.5 },
  ];

  return (
    <div className="overflow-x-hidden">

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 overflow-hidden"
        style={{ background: 'radial-gradient(circle at 50% 10%, rgba(96,165,250,0.08), transparent 30%), linear-gradient(135deg, #112449 0%, #0b1124 38%, #080c13 100%)' }}>

        {/* Background effects */}
        <FloatingOrbs variant="hero" />
        <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

        {/* 3D Scene — fills entire hero, sits behind content */}
        <div className="absolute inset-0 flex items-center justify-center z-[1] pointer-events-none">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto pt-4">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="flex justify-center mb-8"
          >
            <img
              src={logo}
              alt="ValidEats"
              className="h-28 md:h-36 w-auto object-contain animate-float-fast drop-shadow-[0_0_40px_rgba(212,175,55,0.4)]"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </motion.div>

          {/* Status badge */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2.5 bg-gold/10 border border-gold/25 text-gold text-xs font-semibold
              px-5 py-2 rounded-full tracking-widest uppercase backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Verified Star Rating System · 2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h1 className="serif text-[clamp(2.8rem,8vw,5.5rem)] font-black text-white leading-[1.05] mb-5 tracking-tight">
              Eat Smart.<br />
              <span className="gold-text-shimmer">Live Better.</span>
            </h1>
            <p className="text-[clamp(1rem,2.5vw,1.25rem)] text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
              We don't just rate food — we simulate how it affects <em className="text-slate-200 not-italic font-semibold">your</em> health. Personalised. Instant. Intelligent.
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="w-full max-w-xl mx-auto mb-8">
            <SearchBar
              onSelect={(p) => navigate(`/result/${p.id}`)}
              placeholder="Search any food — Maggi, Lays, Oreo..."
            />
          </motion.div>

          {/* CTA row */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <Link to="/general-rating">
              <Button variant="gold" size="lg" icon="⭐">General Rating</Button>
            </Link>
            <Link to="/personalized">
              <Button variant="outline" size="lg" icon="🧬">My Personalized Score</Button>
            </Link>
            <Link to="/scan">
              <Button variant="dark" size="lg" icon="📸">Scan a Packet</Button>
            </Link>
          </motion.div>

          {/* Trust line */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
            className="flex flex-wrap items-center justify-center gap-5 text-slate-500 text-sm">
            {['10+ products rated', '3 analysis modes', 'AI-powered', '100% free'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="text-gold text-xs">✓</span>{t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Scroll nudge */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-gold" />
          <p className="text-gold text-[10px] tracking-widest uppercase">Scroll</p>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          STATS STRIP
      ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-page-2 py-12">
        <FloatingOrbs variant="section" />
        <div className="container-lg relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gold/10 rounded-2xl overflow-hidden border border-gold/10">
            {stats.map((s, i) => (
              <motion.div key={s.label} {...fadeUp(i * 0.1)}
                className="bg-brand-card flex flex-col items-center justify-center py-8 px-4 text-center hover:bg-brand-card-2 transition-colors">
                <span className="stat-number">{s.val}</span>
                <span className="text-slate-500 text-xs font-medium uppercase tracking-wider mt-2">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURES
      ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden section-pad"
        style={{ background: 'linear-gradient(180deg, #0D1020 0%, #0F0C1F 100%)' }}>
        <FloatingOrbs variant="personalized" />
        <div className="line-grid absolute inset-0 opacity-50 pointer-events-none" />
        <div className="container-lg relative z-10">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <p className="label-sm mb-3">Why ValidEats</p>
            <h2 className="section-title mb-4">More than a food label.</h2>
            <p className="text-muted max-w-xl mx-auto">We translate complex nutritional data into simple, personalised, actionable health intelligence.</p>
          </motion.div>
          {/* 3D accent */}
          <div className="flex justify-center mb-10">
            <Suspense fallback={null}>
              <Page3DAccent variant="ring" size={130} />
            </Suspense>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <motion.div key={f.title} {...fadeUp(i * 0.1)}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="card p-7 text-center group cursor-default">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl mb-5 block">{f.icon}</motion.div>
                <h3 className="text-bright font-bold text-base mb-2.5">{f.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden section-pad bg-warm">
        <FloatingOrbs variant="scan" />
        <div className="container-lg relative z-10">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <p className="label-sm mb-3">Process</p>
            <h2 className="section-title mb-4">Three ways to know your food.</h2>
          </motion.div>
          {/* 3D accent */}
          <div className="flex justify-center mb-10">
            <Suspense fallback={null}>
              <Page3DAccent variant="health" size={130} />
            </Suspense>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                n: '01', icon: '⭐', color: 'text-gold', glow: 'shadow-gold-sm',
                title: 'General Rating',
                desc: 'Select any food & age group. Get a star rating with a clear health explanation.',
                path: '/general-rating', cta: 'Try General Rating', v: 'gold',
              },
              {
                n: '02', icon: '🧬', color: 'text-purple-400', glow: '',
                title: 'Personalized',
                desc: 'Enter your health profile. Get a score that fits your body, not the average person.',
                path: '/personalized', cta: 'Get My Score', v: 'outline',
              },
              {
                n: '03', icon: '📸', color: 'text-blue-400', glow: '',
                title: 'Scan & Rate',
                desc: 'Photo of any packet → AI reads label → instant score in under 5 seconds.',
                path: '/scan', cta: 'Launch Scanner', v: 'dark',
              },
            ].map((step, i) => (
              <motion.div key={step.n} {...fadeUp(i * 0.1)}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 250, damping: 18 }}
                className="card p-8 flex flex-col group">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-slate-600 text-xs font-bold tracking-widest">{step.n}</span>
                  <div className="h-px flex-1 bg-white/5" />
                  <motion.span
                    whileHover={{ scale: 1.3, rotate: 10 }}
                    className={`text-3xl ${step.color}`}>{step.icon}</motion.span>
                </div>
                <h3 className="serif text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed flex-1 mb-6">{step.desc}</p>
                <Link to={step.path}>
                  <Button variant={step.v} fullWidth size="md" iconRight="→">{step.cta}</Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SAMPLE PRODUCTS
      ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden section-pad"
        style={{ background: 'linear-gradient(180deg, #0D1020 0%, #080B14 100%)' }}>
        <FloatingOrbs variant="about" />
        <div className="line-grid absolute inset-0 opacity-40 pointer-events-none" />
        <div className="container-lg relative z-10">
          <motion.div {...fadeUp()} className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
            <div>
              <p className="label-sm mb-2">Database</p>
              <h2 className="section-title">Popular products rated.</h2>
            </div>
            <Link to="/general-rating">
              <Button variant="outline" size="md" iconRight="→">View All</Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.slice(0, 8).map((p, i) => (
              <motion.div key={p.id} {...fadeUp(i * 0.06)}>
                <ProductCard product={p} showRating />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden section-pad bg-page-2">
        <FloatingOrbs variant="section" />
        <div className="container-md relative z-10">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <p className="label-sm mb-3">Testimonials</p>
            <h2 className="section-title">What people say.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} {...fadeUp(i * 0.1)}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="card p-7 flex flex-col gap-4">
                <RatingStars stars={t.stars} size="sm" showNumber={false} />
                <p className="text-slate-300 text-[0.9375rem] leading-relaxed italic flex-1">"{t.text}"</p>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-slate-600 text-xs mt-0.5">{t.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden section-pad">
        <FloatingOrbs variant="hero" />
        <div className="container-md relative z-10">
          <motion.div {...fadeUp()}
            className="rounded-3xl overflow-hidden text-center p-10 md:p-16 border border-gold/15"
            style={{ background: 'linear-gradient(135deg, #1a1408 0%, #0D1020 50%, #130E06 100%)' }}
          >
            {/* Glow overlay */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,175,55,0.12) 0%, transparent 60%)' }} />

            <div className="relative">
              <img src={logo} alt="ValidEats" className="h-16 w-auto mx-auto mb-6 opacity-85"
                onError={(e) => { e.target.style.display = 'none'; }} />
              <h2 className="serif text-[clamp(1.8rem,4vw,3rem)] font-black text-white mb-4">
                Know what you're eating.
              </h2>
              <p className="text-slate-400 text-lg max-w-md mx-auto mb-8 leading-relaxed">
                Start with a scan. Get answers in seconds. Make food decisions you'll feel good about.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/scan">
                  <Button variant="gold" size="xl" icon="📸">Scan a Product</Button>
                </Link>
                <Link to="/personalized">
                  <Button variant="outline" size="xl" icon="🧬">Get My Score</Button>
                </Link>
              </div>

              {/* Tip popup trigger */}
              <button onClick={() => setTipOpen(true)}
                className="mt-8 text-slate-600 hover:text-gold text-xs transition-colors flex items-center gap-1.5 mx-auto">
                <span className="text-base">💡</span> How does the rating work?
              </button>
            </div>
          </motion.div>
        </div>

        {/* Tip popup */}
        {tipOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setTipOpen(false)}
            className="popup-overlay"
          >
            <motion.div
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              className="popup-box"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-7">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">⭐</span>
                  <h3 className="serif text-xl font-bold text-white">How Ratings Work</h3>
                  <button onClick={() => setTipOpen(false)} className="ml-auto text-slate-500 hover:text-white text-lg transition-colors">✕</button>
                </div>
                <div className="space-y-4">
                  {[
                    { star: '5 ★', color: 'text-safe',    label: 'Excellent',  desc: 'Safe for regular consumption. Minimal health concerns.' },
                    { star: '4 ★', color: 'text-safe',    label: 'Good',       desc: 'Healthy choice. Consume with normal portions.' },
                    { star: '3 ★', color: 'text-caution', label: 'Moderate',   desc: 'Occasional consumption is fine. Watch portions.' },
                    { star: '2 ★', color: 'text-caution', label: 'Poor',       desc: 'Limit intake. High in sugar, sodium or additives.' },
                    { star: '1 ★', color: 'text-risk',    label: 'Risky',      desc: 'Avoid or consume very rarely. Significant health risks.' },
                  ].map((r) => (
                    <div key={r.star} className="flex items-start gap-4">
                      <span className={`font-bold text-sm w-8 flex-shrink-0 ${r.color}`}>{r.star}</span>
                      <div>
                        <p className="text-white font-semibold text-sm">{r.label}</p>
                        <p className="text-slate-500 text-xs leading-relaxed">{r.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => setTipOpen(false)}
                  className="mt-6 w-full btn-gold rounded-xl py-3 text-sm font-bold">
                  Got it!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
