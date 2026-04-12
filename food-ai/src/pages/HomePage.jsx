import React, { useState, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import RatingStars from '../components/RatingStars';
import FloatingOrbs from '../components/FloatingOrbs';
import FoodAmbientLayer from '../components/FoodAmbientLayer';
import StatNumber from '../components/StatNumber';
const HeroScene = React.lazy(() => import('../components/HeroScene'));
import { products } from '../data/products';
import {
  SITE_PRODUCTS_APPROX,
  SITE_SCANS_APPROX,
  SITE_MODES_COUNT,
  SITE_SCALE_STARS,
} from '../data/siteStats';

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 28 },
  whileInView:{ opacity: 1, y: 0 },
  viewport:   { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const HomePage = () => {
  const navigate   = useNavigate();
  const [tipOpen, setTipOpen] = useState(false);

  const features = [
    { icon: '⭐', title: 'Plain stars',     desc: 'One glance. You see where it lands.' },
    { icon: '🧬', title: 'Your story',      desc: 'Age, habits, health — we listen, then score.' },
    { icon: '📸', title: 'Snap the pack',   desc: 'Blurry counter, bright label — still counts.' },
  ];

  const stats = [
    { target: SITE_PRODUCTS_APPROX, suffix: '+', label: 'Products', to: '/general-rating' },
    { target: SITE_MODES_COUNT,     suffix: '',  label: 'Modes',    to: '/about#three-modes' },
    { target: SITE_SCALE_STARS,     suffix: '★', label: 'Scale',    to: '/about#how-we-score' },
    { target: SITE_SCANS_APPROX,    suffix: '+', label: 'Scans',    to: '/scan' },
  ];

  const testimonials = [
    { name: 'Priya S.', sub: 'Chennai', text: 'Dad’s biscuits stopped being a guessing game.', stars: 5 },
    { name: 'Arjun M.', sub: 'Mumbai',  text: 'Salt sneaks in everywhere — the score said it bluntly.', stars: 5 },
    { name: 'Kavya R.', sub: 'Bangalore', text: 'Held the packet to the light, got a number. Felt fair.', stars: 4.5 },
  ];

  return (
    <div className="overflow-x-hidden">

      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 overflow-hidden"
        style={{ background: 'radial-gradient(circle at 50% 10%, rgba(96,165,250,0.08), transparent 30%), linear-gradient(135deg, #112449 0%, #0b1124 38%, #080c13 100%)' }}>

        <FoodAmbientLayer variant="hero" density="dense" />
        <FloatingOrbs variant="hero" />
        <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

        <div className="absolute inset-0 flex items-center justify-center z-[1] pointer-events-none">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto pt-2">

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
            className="flex justify-center mb-5">
            <span className="inline-flex items-center gap-2.5 bg-gold/10 border border-gold/25 px-4 py-2 rounded-full backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse shrink-0" />
              <span className="type-hand-sm text-gold leading-none normal-case">always free · walk right in</span>
            </span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <h1 className="mb-4">
              <span className="type-elegant-hero block">Eat Smart</span>
              <span className="type-sans-pair block mt-3 text-[clamp(1.2rem,3.6vw,1.95rem)] gold-text-shimmer leading-tight">
                know what's on your plate.
              </span>
            </h1>
            <p className="type-hand text-slate-400 max-w-md mx-auto mb-8 px-2">
              we squint at the fine print so you can trust the bite in your hand.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
            className="w-full max-w-lg mx-auto mb-7">
            <SearchBar
              onSelect={(p) => navigate(`/result/${p.id}`)}
              placeholder="type a craving — maggi, oreo, lays…"
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
            className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
            <Link to="/general-rating">
              <Button variant="gold" size="lg" icon="⭐">Browse</Button>
            </Link>
            <Link to="/personalized">
              <Button variant="outline" size="lg" icon="🧬">For me</Button>
            </Link>
            <Link to="/scan">
              <Button variant="dark" size="lg" icon="📸">Scan</Button>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.48 }}
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-slate-500 text-xs font-medium">
            <span>{SITE_PRODUCTS_APPROX}+ products</span>
            <span className="text-slate-700">·</span>
            <span>3 ways to score</span>
            <span className="text-slate-700">·</span>
            <span>100% free</span>
          </motion.div>
        </div>

        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-35">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-gold" />
          <p className="type-hand-sm text-gold/80">scroll down, there’s more</p>
        </motion.div>
      </section>

      <section className="relative overflow-hidden bg-page-2 py-10">
        <FoodAmbientLayer density="sparse" />
        <FloatingOrbs variant="section" />
        <div className="container-lg relative z-10">
          <div className="grid w-full grid-cols-2 md:grid-cols-4 gap-px bg-gold/10 rounded-2xl overflow-hidden border border-gold/10">
            {stats.map((s, i) => (
              <motion.div key={s.label} {...fadeUp(i * 0.08)} className="min-h-0">
                <motion.div
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                  className="h-full"
                >
                  <Link
                    to={s.to}
                    className="bg-brand-card flex flex-col items-center justify-center py-8 px-4 text-center min-h-[132px] h-full w-full
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
        </div>
      </section>

      <section className="relative overflow-hidden section-pad"
        style={{ background: 'linear-gradient(180deg, #0D1020 0%, #0F0C1F 100%)' }}>
        <FoodAmbientLayer />
        <FloatingOrbs variant="personalized" />
        <div className="line-grid absolute inset-0 opacity-50 pointer-events-none" />
        <div className="container-lg relative z-10">
          <motion.div {...fadeUp()} className="text-center mb-10">
            <p className="type-hand-sm text-gold/85 mb-1 text-center normal-case">why we even built this</p>
            <h2 className="mb-2 text-center leading-tight">
              <span className="type-elegant text-[clamp(2.25rem,5.5vw,3.75rem)] text-white block sm:inline">Cut the noise.</span>
              <span className="font-sans font-semibold text-[clamp(1.35rem,2.8vw,1.85rem)] text-slate-200 tracking-tight block sm:inline sm:ml-2 mt-1.5 sm:mt-0">
                keep the good bites.
              </span>
            </h2>
            <p className="type-hand-sm text-slate-500 max-w-md mx-auto text-center normal-case">three doors in — same honest star in the middle.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {features.map((f, i) => (
              <motion.div key={f.title} {...fadeUp(i * 0.08)}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                className="card p-6 text-center group cursor-default">
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.45 }}
                  className="text-3xl mb-3 block">{f.icon}</motion.div>
                <h3 className="font-elegant text-2xl text-white mb-1 leading-none">{f.title}</h3>
                <p className="type-hand-sm text-slate-500 normal-case leading-snug">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden section-pad bg-warm">
        <FoodAmbientLayer density="normal" />
        <FloatingOrbs variant="scan" />
        <div className="container-lg relative z-10">
          <motion.div {...fadeUp()} className="text-center mb-10">
            <p className="type-hand-sm text-gold/85 mb-1 text-center normal-case">choose your doorway</p>
            <h2 className="text-center">
              <span className="type-elegant text-[clamp(2.5rem,5.5vw,3.85rem)] text-white block sm:inline">Three ways</span>
              <span className="font-sans font-semibold text-[clamp(1.2rem,2.5vw,1.55rem)] text-slate-300 tracking-tight block sm:inline sm:ml-2 mt-1 sm:mt-0">to peek inside.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                n: '01', icon: '⭐', color: 'text-gold',
                title: 'Browse',
                desc: 'pick an age, we hum the nutrition under our breath.',
                path: '/general-rating', cta: 'Open', v: 'gold',
              },
              {
                n: '02', icon: '🧬', color: 'text-purple-400',
                title: 'Yours',
                desc: 'tell us your body’s quirks — score bends with you.',
                path: '/personalized', cta: 'Open', v: 'outline',
              },
              {
                n: '03', icon: '📸', color: 'text-blue-400',
                title: 'Snap',
                desc: 'camera meets crinkles — we still read the ink.',
                path: '/scan', cta: 'Open', v: 'dark',
              },
            ].map((step, i) => (
              <motion.div key={step.n} {...fadeUp(i * 0.08)}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="card p-6 flex flex-col group">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-slate-600 text-[10px] font-bold tracking-wide">{step.n}</span>
                  <div className="h-px flex-1 bg-white/5" />
                  <span className={`text-2xl ${step.color}`}>{step.icon}</span>
                </div>
                <h3 className="font-elegant text-3xl text-white mb-2 leading-none">{step.title}</h3>
                <p className="type-hand-sm text-slate-500 flex-1 mb-5 normal-case leading-snug">{step.desc}</p>
                <Link to={step.path}>
                  <Button variant={step.v} fullWidth size="md" iconRight="→">{step.cta}</Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden section-pad"
        style={{ background: 'linear-gradient(180deg, #0D1020 0%, #080B14 100%)' }}>
        <FoodAmbientLayer density="dense" />
        <FloatingOrbs variant="about" />
        <div className="line-grid absolute inset-0 opacity-40 pointer-events-none" />
        <div className="container-lg relative z-10">
          <motion.div {...fadeUp()} className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <div>
              <p className="type-hand-sm text-gold/80 mb-0.5 normal-case">crowd favourites</p>
              <h2 className="leading-tight">
                <span className="type-elegant text-[clamp(2.25rem,4.8vw,3.35rem)] text-white">Snack shelf</span>
                <span className="font-sans font-semibold text-[clamp(1.2rem,2.4vw,1.65rem)] text-slate-200 tracking-tight"> heroes.</span>
              </h2>
            </div>
            <Link to="/general-rating">
              <Button variant="outline" size="md" iconRight="→">All</Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.slice(0, 8).map((p, i) => (
              <motion.div key={p.id} {...fadeUp(i * 0.05)}>
                <ProductCard product={p} showRating />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden section-pad bg-page-2">
        <FoodAmbientLayer />
        <FloatingOrbs variant="section" />
        <div className="container-md relative z-10">
          <motion.div {...fadeUp()} className="text-center mb-10">
            <p className="type-hand-sm text-gold/85 mb-1 normal-case text-center">whispers from the aisle</p>
            <h2 className="leading-tight text-center">
              <span className="type-elegant text-[clamp(2.25rem,4.8vw,3.35rem)] text-white">Real humans</span>
              <span className="font-sans font-semibold text-[clamp(1.2rem,2.4vw,1.65rem)] text-slate-200 tracking-tight">, real crunch.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} {...fadeUp(i * 0.08)}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="card p-6 flex flex-col gap-3">
                <RatingStars stars={t.stars} size="sm" showNumber={false} />
                <p className="type-hand text-slate-400 flex-1 leading-snug normal-case px-0.5">“{t.text}”</p>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-slate-600 text-xs mt-0.5">{t.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden section-pad">
        <FoodAmbientLayer />
        <FloatingOrbs variant="hero" />
        <div className="container-md relative z-10">
          <motion.div {...fadeUp()}
            className="rounded-3xl overflow-hidden text-center p-8 md:p-12 border border-gold/15"
            style={{ background: 'linear-gradient(135deg, #1a1408 0%, #0D1020 50%, #130E06 100%)' }}
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,175,55,0.12) 0%, transparent 60%)' }} />

            <div className="relative">
              <h2 className="mb-3">
                <span className="type-elegant text-[clamp(2.5rem,5vw,3.75rem)] text-white block">Whenever you're ready</span>
                <span className="type-sans-pair block text-[clamp(1.15rem,2.8vw,1.65rem)] text-slate-200 mt-1">we’ll be at the pantry door.</span>
              </h2>
              <p className="type-hand-sm text-slate-500 max-w-sm mx-auto mb-7 normal-case">
                flash a barcode, whisper a brand — either works.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/scan">
                  <Button variant="gold" size="lg" icon="📸">Scan</Button>
                </Link>
                <Link to="/personalized">
                  <Button variant="outline" size="lg" icon="🧬">For me</Button>
                </Link>
              </div>

              <button type="button" onClick={() => setTipOpen(true)}
                className="mt-7 type-hand-sm text-slate-500 hover:text-gold transition-colors normal-case">
                curious how the stars line up? →
              </button>
            </div>
          </motion.div>
        </div>

        {tipOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setTipOpen(false)}
            className="popup-overlay"
          >
            <motion.div
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              className="popup-box"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">⭐</span>
                  <h3 className="font-elegant text-4xl text-white leading-none">Stars</h3>
                  <button type="button" onClick={() => setTipOpen(false)} className="ml-auto text-slate-500 hover:text-white text-lg leading-none">✕</button>
                </div>
                <div className="space-y-3">
                  {[
                    { star: '5 ★', color: 'text-safe',    label: 'Great',     desc: 'Fine for most people, often.' },
                    { star: '4 ★', color: 'text-safe',    label: 'Good',      desc: 'Solid choice; watch portions.' },
                    { star: '3 ★', color: 'text-caution', label: 'OK sometimes', desc: 'Treats, not staples.' },
                    { star: '2 ★', color: 'text-caution', label: 'Rarely',    desc: 'Sugar, salt, or additives high.' },
                    { star: '1 ★', color: 'text-risk',    label: 'Skip',      desc: 'Hard on health if frequent.' },
                  ].map((r) => (
                    <div key={r.star} className="flex items-start gap-3">
                      <span className={`font-bold text-xs w-8 flex-shrink-0 ${r.color}`}>{r.star}</span>
                      <div>
                        <p className="text-white font-semibold text-xs">{r.label}</p>
                        <p className="text-slate-500 text-[11px] leading-snug">{r.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => setTipOpen(false)}
                  className="mt-5 w-full btn-gold rounded-xl py-2.5 text-sm font-bold">
                  OK
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
