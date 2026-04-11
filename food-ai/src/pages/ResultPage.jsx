// src/pages/ResultPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import RatingStars from '../components/RatingStars';
import HealthBadge from '../components/HealthBadge';
import NutritionChip from '../components/NutritionChip';
import Button from '../components/Button';
import LoaderSpinner from '../components/LoaderSpinner';
import FloatingOrbs from '../components/FloatingOrbs';
import { products } from '../data/products';
import { getGeneralRating, getStatusFromStars } from '../data/ratings';

const ResultPage = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [rating,  setRating]  = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const p = products.find((x) => x.id === parseInt(id));
      if (p) { setProduct(p); setRating(getGeneralRating(p.id, 'adults')); }
      setLoading(false);
    }, 600);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(180deg, #0D1020 0%, #080B14 100%)' }}>
        <LoaderSpinner label="Loading…" size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4"
        style={{ background: 'linear-gradient(180deg, #0D1020 0%, #080B14 100%)' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <p className="text-6xl mb-4">🔍</p>
          <p className="font-elegant text-5xl text-white mb-2 leading-none">Not here yet.</p>
          <p className="type-hand-sm text-slate-500 mb-6 normal-case max-w-xs mx-auto">double-check the spelling, then try again.</p>
          <Button onClick={() => navigate('/general-rating')} icon="←">Back to Rating</Button>
        </motion.div>
      </div>
    );
  }

  const statusObj   = getStatusFromStars(rating?.stars || 2.5);
  const status      = statusObj.color;
  const borderColor = status === 'safe' ? 'border-safe/20' : status === 'risk' ? 'border-risk/20' : 'border-caution/20';
  const accentBg    = status === 'safe' ? 'from-safe/5' : status === 'risk' ? 'from-risk/5' : 'from-caution/5';

  const goodFor = {
    safe:    ['Most healthy adults', 'Active teens', 'Occasional indulgence'],
    caution: ['Healthy adults in moderation', 'Non-diabetic users'],
    risk:    ['Healthy adults on rare occasions only'],
  };
  const notGoodFor = {
    safe:    ['Strict low-sodium diets'],
    caution: ['Children under 10', 'Diabetics', 'Hypertension patients'],
    risk:    ['Diabetics', 'Children', 'Heart patients', 'BP patients'],
  };
  const alts = { 1:['Baked chips','Rice cakes'], 2:['Oat noodles','Millet noodles'], 3:['Oat cookies','Dark chocolate'], 4:['Dark 70%+ choc.','Dates'], 5:['Coconut water','Lemon water'], 6:['Multigrain biscuits'], 7:['Roasted chana','Makhana'], 8:['Mixed nuts','Roasted seeds'], 9:['Fresh fruit','Smoothies'], 10:['Makhana','Popcorn'] };

  return (
    <div className="relative min-h-screen page-wrap overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0D1020 0%, #080B14 60%, #12101C 100%)' }}>
      <FloatingOrbs variant="section" />
      <div className="grid-bg absolute inset-0 opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 pt-24 pb-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-600 mb-6">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="text-slate-700">›</span>
          <Link to="/general-rating" className="hover:text-gold transition-colors">General</Link>
          <span className="text-slate-700">›</span>
          <span className="text-slate-400 font-medium">{product.name}</span>
        </div>

        {/* Hero card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className={`rounded-3xl border ${borderColor} overflow-hidden mb-6`}>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-56 md:h-auto overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1A1F35, #12172B)' }}>
                <img src={product.image} alt={product.name}
                  className="w-full h-full object-cover opacity-75"
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                />
                <div className="hidden w-full h-full items-center justify-center text-8xl">{product.emoji}</div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-card/50" />
              </div>

              <div className={`p-7 bg-gradient-to-br ${accentBg} to-transparent`}>
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <span className="text-xs bg-brand-card text-slate-400 px-2.5 py-1 rounded-full border border-white/5">{product.category}</span>
                  <HealthBadge status={status} />
                </div>
                <h1 className="font-sans text-2xl md:text-3xl font-bold text-white mb-1 tracking-tight">{product.name}</h1>
                <p className="text-slate-500 text-sm mb-5">{product.brand}</p>
                <RatingStars stars={rating?.stars || 2.5} size="lg" className="mb-4" />
                {rating?.verdict && (
                  <div className={`px-4 py-3 rounded-xl border text-sm font-semibold mb-5
                    ${status === 'safe' ? 'bg-safe/10 border-safe/30 text-safe' :
                      status === 'risk' ? 'bg-risk/10 border-risk/30 text-risk' :
                      'bg-caution/10 border-caution/30 text-caution'}`}>
                    {rating.verdict}
                  </div>
                )}
                <div className="flex gap-3 flex-wrap">
                  <Button onClick={() => navigate('/general-rating')} variant="ghost" size="sm" icon="←">Back</Button>
                  <Link to="/personalized">
                    <Button variant="outline" size="sm" icon="🧬">For me</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Nutrition */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="card-static p-6 rounded-3xl mb-5">
            <p className="label-sm mb-3">Nutrition / 100g</p>
            <div className="flex flex-wrap gap-3">
              <NutritionChip label="Calories" value={product.nutrition.calories} unit="kcal" nutritionKey="calories" delay={0.1} />
              <NutritionChip label="Fat"      value={product.nutrition.fat}      unit="g"    nutritionKey="fat"      delay={0.15} />
              <NutritionChip label="Sugar"    value={product.nutrition.sugar}    unit="g"    nutritionKey="sugar"    delay={0.2} />
              <NutritionChip label="Salt"     value={product.nutrition.salt}     unit="g"    nutritionKey="salt"     delay={0.25} />
              <NutritionChip label="Protein"  value={product.nutrition.protein}  unit="g"    nutritionKey="protein"  delay={0.3} />
              <NutritionChip label="Additives" value={product.nutrition.additives} unit=""
                level={product.nutrition.additives === 'Low' ? 'good' : product.nutrition.additives === 'High' ? 'bad' : 'mid'} delay={0.35} />
            </div>
          </div>
        </motion.div>

        {/* Good/Bad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
            <div className="card-static rounded-3xl p-5 h-full border border-safe/15">
              <p className="text-safe text-[10px] font-bold uppercase tracking-wider mb-2">✓ OK for</p>
              <ul className="space-y-2">
                {(goodFor[status] || goodFor.caution).map((item) => (
                  <li key={item} className="text-sm text-slate-400 flex items-start gap-2">
                    <span className="text-safe mt-0.5 text-xs">●</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div className="card-static rounded-3xl p-5 h-full border border-risk/15">
              <p className="text-risk text-[10px] font-bold uppercase tracking-wider mb-2">⚠ Caution</p>
              <ul className="space-y-2">
                {(notGoodFor[status] || notGoodFor.caution).map((item) => (
                  <li key={item} className="text-sm text-slate-400 flex items-start gap-2">
                    <span className="text-risk mt-0.5 text-xs">●</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Explanation */}
        {rating?.explanation && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <div className="card-static p-6 rounded-3xl mb-5">
              <p className="label-sm mb-3">Expert Analysis</p>
              <p className="text-slate-300 text-[15px] leading-relaxed">{rating.explanation}</p>
            </div>
          </motion.div>
        )}

        {/* Frequency & Alternatives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {rating?.frequency_label && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <div className="card-static p-5 rounded-3xl flex items-center gap-4">
                <span className="text-3xl">⏱</span>
                <div>
                  <p className="label-sm mb-1">Suggested Frequency</p>
                  <p className="text-slate-200 font-bold text-base">{rating.frequency_label}</p>
                </div>
              </div>
            </motion.div>
          )}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
            <div className="card-static p-5 rounded-3xl">
              <p className="text-safe text-xs font-bold uppercase tracking-wider mb-3">✓ Healthier Alternatives</p>
              <div className="flex flex-wrap gap-2">
                {(alts[product.id] || ['Whole foods', 'Fresh fruit']).map((a) => (
                  <span key={a} className="text-xs bg-safe/10 border border-safe/25 text-safe px-2.5 py-1.5 rounded-xl font-semibold">{a}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <div className="card-static p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.05), transparent)' }}>
            <div>
              <p className="text-white font-bold mb-1">Get a rating built for you.</p>
              <p className="text-slate-500 text-sm">Enter your health profile for a personalised score.</p>
            </div>
            <Link to="/personalized">
              <Button variant="gold" icon="🧬">Personalized Rating</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultPage;
