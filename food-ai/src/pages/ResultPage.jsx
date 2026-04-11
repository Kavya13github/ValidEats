// src/pages/ResultPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import RatingStars from '../components/RatingStars';
import HealthBadge from '../components/HealthBadge';
import NutritionChip from '../components/NutritionChip';
import HealthBar from '../components/HealthBar';
import NeonButton from '../components/NeonButton';
import LabLoader from '../components/LabLoader';
import { products } from '../data/products';
import { getGeneralRating, getStatusFromStars } from '../data/ratings';

const ResultPage = () => {
  const { id } = useParams();
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
    }, 800);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LabLoader label="Loading product data..." size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <p className="text-6xl mb-4">🔍</p>
          <p className="font-mono font-bold text-xl text-gray-300 mb-2">PRODUCT NOT FOUND</p>
          <p className="text-gray-600 font-mono text-sm mb-6">ID {id} is not in the database.</p>
          <NeonButton onClick={() => navigate('/general-rating')} icon="←">Back to Lab</NeonButton>
        </div>
      </div>
    );
  }

  const statusObj = getStatusFromStars(rating?.stars || 2.5);
  const status    = statusObj.color;
  const hPct      = Math.round(((rating?.stars || 2.5) / 5) * 100);
  const color     = status === 'safe' ? 'green' : status === 'risk' ? 'red' : 'yellow';

  const goodFor    = { safe: ['Healthy adults', 'Teens in moderation'], caution: ['Adults without conditions', 'Occasional enjoyment'], risk: ['No group should consume regularly'] };
  const notGoodFor = { safe: ['Diabetic patients', 'Low-sodium diets'], caution: ['Children under 12', 'Diabetes/BP patients'], risk: ['All at-risk groups', 'Children', 'Seniors'] };
  const alts = { 1: ['Baked chips','Rice cakes'], 2: ['Makhana','Roasted chana'], 3: ['Oat noodles','Millet noodles'], 4: ['Oat cookies','Dark chocolate'], 5: ['Dark 70%+ chocolate','Dates'], 6: ['Coconut water','Lemon water'], 7: ['Multigrain biscuits','Oat crackers'], 8: ['Roasted chana','Makhana'], 9: ['Fresh fruit','Smoothies'], 10: ['Makhana','Popcorn'] };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-mono text-xs text-gray-700 mb-8">
          <Link to="/" className="hover:text-neon-blue transition-colors">HOME</Link>
          <span>/</span>
          <Link to="/general-rating" className="hover:text-neon-blue transition-colors">LAB</Link>
          <span>/</span>
          <span className="text-gray-400">{product.name.toUpperCase()}</span>
        </div>

        {/* Hero Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <GlassCard color={color} padding={false} className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image */}
              <div className="relative h-56 md:h-auto overflow-hidden rounded-t-xl md:rounded-l-xl md:rounded-tr-none bg-lab-surface">
                <img src={product.image} alt={product.name}
                  className="w-full h-full object-cover opacity-70"
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                />
                <div className="hidden w-full h-full items-center justify-center text-8xl bg-lab-surface">{product.emoji}</div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-lab-card/50 hidden md:block" />
                {/* Scan overlay */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ backgroundImage: 'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
              </div>

              {/* Info */}
              <div className="p-7 space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono border border-lab-border bg-lab-surface text-gray-500 px-2 py-0.5 rounded">{product.category.toUpperCase()}</span>
                  <HealthBadge status={status} />
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-white">{product.name}</h1>
                <p className="text-gray-600 font-mono text-sm">{product.brand}</p>

                <RatingStars stars={rating?.stars || 2.5} size="lg" />
                <HealthBar value={hPct} label="Health Score" color={status === 'safe' ? 'safe' : status === 'risk' ? 'risk' : 'caution'} />

                {rating?.verdict && (
                  <div className={`px-4 py-3 rounded-lg border font-mono text-xs
                    ${status === 'safe' ? 'border-safe/30 bg-safe/5 text-safe' :
                      status === 'risk' ? 'border-risk/30 bg-risk/5 text-risk' :
                      'border-caution/30 bg-caution/5 text-caution'}`}>
                    ◈ {rating.verdict}
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <Link to="/general-rating"><NeonButton variant="ghost" size="sm" icon="←">Back</NeonButton></Link>
                  <Link to="/personalized"><NeonButton variant="purple" size="sm" icon="🧬">Personal Sim</NeonButton></Link>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Nutrition */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <GlassCard className="mb-5">
            <p className="hud-label mb-4">Nutritional Profile — per 100g</p>
            <div className="flex flex-wrap gap-3">
              <NutritionChip label="Cal"     value={product.nutrition.calories} unit="kcal" nutritionKey="calories" delay={0.1} />
              <NutritionChip label="Fat"     value={product.nutrition.fat}      unit="g"    nutritionKey="fat"      delay={0.15} />
              <NutritionChip label="Sugar"   value={product.nutrition.sugar}    unit="g"    nutritionKey="sugar"    delay={0.2} />
              <NutritionChip label="Salt"    value={product.nutrition.salt}     unit="g"    nutritionKey="salt"     delay={0.25} />
              <NutritionChip label="Protein" value={product.nutrition.protein}  unit="g"    nutritionKey="protein"  delay={0.3} />
              <NutritionChip
                label="Additives" value={product.nutrition.additives} unit=""
                level={product.nutrition.additives === 'Low' ? 'low' : product.nutrition.additives === 'High' ? 'high' : 'medium'}
                delay={0.35}
              />
            </div>
          </GlassCard>
        </motion.div>

        {/* Good / Bad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <GlassCard color="green">
              <p className="text-safe text-xs font-mono uppercase tracking-widest mb-3">◉ Suitable For</p>
              <ul className="space-y-2">
                {(goodFor[status] || goodFor.caution).map((i) => (
                  <li key={i} className="text-xs text-gray-500 font-mono flex items-start gap-2"><span className="text-safe">›</span>{i}</li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <GlassCard color="red">
              <p className="text-risk text-xs font-mono uppercase tracking-widest mb-3">⚠ Not Suitable For</p>
              <ul className="space-y-2">
                {(notGoodFor[status] || notGoodFor.caution).map((i) => (
                  <li key={i} className="text-xs text-gray-500 font-mono flex items-start gap-2"><span className="text-risk">›</span>{i}</li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        </div>

        {/* Explanation & Alternatives */}
        {rating?.explanation && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <GlassCard className="mb-5">
              <p className="hud-label mb-3">AI Analysis</p>
              <p className="text-gray-500 font-mono text-xs leading-relaxed">{rating.explanation}</p>
            </GlassCard>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {rating?.frequency_label && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <GlassCard color={color} className="flex items-center gap-4">
                <span className="text-3xl">⏱</span>
                <div>
                  <p className="hud-label">Recommended Frequency</p>
                  <p className="text-gray-200 font-mono font-bold text-sm mt-1">{rating.frequency_label}</p>
                </div>
              </GlassCard>
            </motion.div>
          )}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
            <GlassCard color="green">
              <p className="text-safe text-xs font-mono uppercase tracking-widest mb-3">◉ Healthier Alternatives</p>
              <div className="flex flex-wrap gap-2">
                {(alts[product.id] || ['Whole foods', 'Fresh fruit']).map((a) => (
                  <span key={a} className="text-xs font-mono bg-safe/5 border border-safe/30 text-safe px-2.5 py-1 rounded">{a}</span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <GlassCard color="purple" className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-mono font-bold text-sm text-gray-200">Want a personalized simulation?</p>
              <p className="text-gray-600 font-mono text-xs mt-1">Enter your health profile for a score built for you.</p>
            </div>
            <Link to="/personalized">
              <NeonButton variant="purple" icon="🧬">Start DNA Mode</NeonButton>
            </Link>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultPage;
