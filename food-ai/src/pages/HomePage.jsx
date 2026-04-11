// src/pages/HomePage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import SectionHeading from '../components/SectionHeading';
import RatingStars from '../components/RatingStars';
import logo from '../assets/logo.png';
import { products } from '../data/products';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    { icon: '★', title: 'Verified Ratings',      desc: 'Evidence-based health scores for every product.',       color: 'text-gold' },
    { icon: '🧬', title: 'Personalized Insights', desc: 'Scores tailored to your age, conditions & goals.',      color: 'text-purple-400' },
    { icon: '📸', title: 'Smart Scan',            desc: 'Upload a packet image. AI reads it instantly.',         color: 'text-blue-400' },
    { icon: '⚡', title: 'Fast Results',           desc: 'Understand your food in seconds — not hours.',          color: 'text-green-400' },
  ];

  const testimonials = [
    { name: 'Priya S.', text: 'Finally I know which biscuits are safe for my diabetic father.', rating: 5 },
    { name: 'Arjun M.', text: 'The personalized score changed how I read food labels forever.', rating: 5 },
    { name: 'Kavya R.', text: 'Scanned Maggi in 3 seconds. The breakdown was eye-opening.', rating: 4.5 },
  ];

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e1a0e] via-charcoal-900 to-charcoal DEFAULT" />
        <div className="absolute inset-0"
          style={{ backgroundImage:"radial-gradient(ellipse 80% 50% at 50% -10%, rgba(212,175,55,0.08) 0%, transparent 60%)" }}
        />

        {/* Decorative gold rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full border border-gold/5" />
          <div className="absolute inset-8 rounded-full border border-gold/5" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Logo */}
          <motion.div {...fadeUp(0)} className="flex justify-center mb-6">
            <img
              src={logo}
              alt="ValidEats"
              className="h-24 md:h-32 w-auto object-contain animate-float"
              onError={(e) => { e.target.style.display='none'; }}
            />
          </motion.div>

          {/* Badge */}
          <motion.div {...fadeUp(0.1)} className="flex justify-center mb-5">
            <span className="inline-flex items-center gap-2 border border-gold/30 text-gold/80 text-xs tracking-widest uppercase px-4 py-2 rounded-full bg-gold/5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Verified Star Rating System · 2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div {...fadeUp(0.2)}>
            <h1 className="serif-heading text-5xl md:text-7xl font-black text-white leading-[1.05] mb-5">
              Eat Smart.<br />
              <span className="gold-text">Live Better.</span>
            </h1>
            <p className="text-charcoal-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Understand how your food truly affects you. <br className="hidden md:block" />
              Not generic advice — personalized health intelligence.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div {...fadeUp(0.3)} className="mt-8 w-full max-w-xl mx-auto">
            <SearchBar
              onSelect={(p) => navigate(`/result/${p.id}`)}
              placeholder="Search any packaged food..."
            />
          </motion.div>

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.4)} className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <Link to="/general-rating">
              <Button variant="gold" size="lg" icon="★">General Rating</Button>
            </Link>
            <Link to="/personalized">
              <Button variant="outline" size="lg" icon="🧬">Personalized Rating</Button>
            </Link>
            <Link to="/scan">
              <Button variant="dark" size="lg" icon="📸">Scan & Rate</Button>
            </Link>
          </motion.div>

          {/* Trust row */}
          <motion.div {...fadeUp(0.5)} className="flex flex-wrap items-center justify-center gap-6 mt-10 text-charcoal-500 text-xs">
            {['10+ products rated', '3 analysis modes', 'AI-powered insights', 'Free to use'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="text-gold">✓</span>
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Scroll arrow */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute bottom-8 flex flex-col items-center gap-2 text-charcoal-600"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold/30 to-gold/60" />
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section className="section-py bg-charcoal-900">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <SectionHeading
            label="Why ValidEats"
            title="More than a food label."
            subtitle="We translate complex nutritional data into clear, actionable health intelligence."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="premium-card p-6 text-center"
              >
                <div className={`text-3xl mb-4 ${f.color}`}>{f.icon}</div>
                <h3 className="text-gray-200 font-semibold text-sm mb-2">{f.title}</h3>
                <p className="text-charcoal-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="section-py">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <SectionHeading label="Process" title="Three ways to analyze." subtitle="Choose the method that fits your need." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { n: '01', icon: '★', title: 'General Rating',     path: '/general-rating', desc: 'Select a product and age group. Get a star rating with detailed health explanation.', cta: 'Try General Rating', variant: 'gold' },
              { n: '02', icon: '🧬', title: 'Personalized',       path: '/personalized',   desc: 'Enter your age, weight, health conditions. Get a rating built exactly for your biology.', cta: 'Start Personalized', variant: 'outline' },
              { n: '03', icon: '📸', title: 'Scan & Rate',        path: '/scan',           desc: 'Upload a packet photo. Our AI reads the label and generates an instant health score.', cta: 'Launch Scanner', variant: 'dark' },
            ].map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="premium-card p-7 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-gold/40 text-xs font-medium tracking-widest">{step.n}</span>
                  <div className="h-px flex-1 bg-charcoal-800" />
                </div>
                <div className="text-3xl mb-4">{step.icon}</div>
                <h3 className="serif-heading text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-charcoal-400 text-sm leading-relaxed flex-1 mb-6">{step.desc}</p>
                <Link to={step.path}>
                  <Button variant={step.variant} fullWidth size="md" iconRight="→">{step.cta}</Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sample Products ── */}
      <section className="section-py bg-charcoal-900">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <SectionHeading label="Database" title="Popular products rated." subtitle="From your favourite snacks to daily beverages." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {products.slice(0, 8).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <ProductCard product={p} showRating />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/general-rating">
              <Button variant="outline" size="lg" iconRight="→">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section-py">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <SectionHeading label="Feedback" title="What people say." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="premium-card p-6"
              >
                <RatingStars stars={t.rating} size="sm" showNumber={false} className="mb-4" />
                <p className="text-charcoal-300 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <p className="text-charcoal-500 text-xs font-medium">— {t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-py">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden bg-charcoal-900 border border-gold/20 p-10 md:p-16 text-center"
            style={{ background: 'linear-gradient(135deg, #1a160a, #0F0F0F)' }}
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 60%)' }} />
            <div className="relative">
              <div className="flex justify-center mb-6">
                <img src={logo} alt="ValidEats" className="h-16 w-auto opacity-80"
                  onError={(e) => { e.target.style.display='none'; }} />
              </div>
              <h2 className="serif-heading text-3xl md:text-4xl font-bold text-white mb-3">
                Know what you're eating.
              </h2>
              <p className="text-charcoal-400 text-sm leading-relaxed max-w-md mx-auto mb-8">
                Start with a scan. Get answers in seconds. Make food decisions you'll feel good about.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/scan">
                  <Button variant="gold" size="xl" icon="📸">Scan a Product</Button>
                </Link>
                <Link to="/personalized">
                  <Button variant="outline" size="xl" icon="🧬">Get Personalized Rating</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
