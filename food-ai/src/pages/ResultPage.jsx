// src/pages/ResultPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import RatingStars from '../components/RatingStars';
import HealthBadge from '../components/HealthBadge';
import NutritionChip from '../components/NutritionChip';
import Button from '../components/Button';
import LoaderSpinner from '../components/LoaderSpinner';
import { products } from '../data/products';
import { getGeneralRating, getStatusFromStars } from '../data/ratings';

const ResultPage = () => {
  const { id }       = useParams();
  const navigate     = useNavigate();
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
      <div className="min-h-screen flex items-center justify-center">
        <LoaderSpinner label="Loading product report..." size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <p className="text-5xl mb-4">🔍</p>
          <p className="serif-heading text-2xl text-white font-bold mb-2">Product Not Found</p>
          <p className="text-charcoal-400 text-sm mb-6">This product doesn't exist in our database.</p>
          <Button onClick={() => navigate('/general-rating')} icon="←">Back to Rating</Button>
        </div>
      </div>
    );
  }

  const statusObj = getStatusFromStars(rating?.stars || 2.5);
  const status    = statusObj.color;
  const borderColor = status === 'safe' ? 'border-safe/20' : status === 'risk' ? 'border-risk/20' : 'border-caution/20';
  const bgAccent    = status === 'safe' ? 'from-safe/5' : status === 'risk' ? 'from-risk/5' : 'from-caution/5';

  const goodFor    = {
    safe:    ['Most healthy adults', 'Active teens', 'Occasional indulgence'],
    caution: ['Healthy adults in moderation', 'Non-diabetic users'],
    risk:    ['Healthy adults on rare occasions only'],
  };
  const notGoodFor = {
    safe:    ['Patients on strict low-sodium diets'],
    caution: ['Children under 10', 'Diabetics', 'Hypertension patients'],
    risk:    ['Diabetics', 'Children', 'Heart patients', 'BP patients'],
  };
  const alts = { 1: ['Baked chips', 'Rice cakes'], 2: ['Oat noodles', 'Millet noodles'], 3: ['Oat cookies', 'Dark chocolate'], 4: ['Dark 70%+ choc.', 'Dates'], 5: ['Coconut water', 'Lemon water'], 6: ['Multigrain biscuits'], 7: ['Roasted chana', 'Makhana'], 8: ['Mixed nuts', 'Roasted seeds'], 9: ['Fresh fruit', 'Smoothies'], 10: ['Makhana', 'Popcorn'] };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-charcoal-500 mb-8 font-medium">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link to="/general-rating" className="hover:text-gold transition-colors">General Rating</Link>
          <span>/</span>
          <span className="text-charcoal-300">{product.name}</span>
        </div>

        {/* Hero card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className={`rounded-2xl border ${borderColor} overflow-hidden mb-6`}>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image */}
              <div className="relative h-56 md:h-auto bg-charcoal-800 overflow-hidden">
                <img src={product.image} alt={product.name}
                  className="w-full h-full object-cover opacity-80"
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                />
                <div className="hidden w-full h-full items-center justify-center text-8xl bg-charcoal-800">{product.emoji}</div>
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent to-charcoal-900/40`} />
              </div>

              {/* Info */}
              <div className={`p-7 bg-gradient-to-br ${bgAccent} to-charcoal-900`}>
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <span className="text-xs bg-charcoal-800 text-charcoal-400 px-2.5 py-1 rounded-full border border-charcoal-700">{product.category}</span>
                  <HealthBadge status={status} />
                </div>
                <h1 className="serif-heading text-2xl md:text-3xl font-bold text-white mb-1">{product.name}</h1>
                <p className="text-charcoal-400 text-sm mb-5">{product.brand}</p>
                <RatingStars stars={rating?.stars || 2.5} size="lg" className="mb-4" />
                {rating?.verdict && (
                  <div className={`px-4 py-3 rounded-xl border text-sm font-medium mb-5
                    ${status === 'safe' ? 'bg-safe-light border-safe/30 text-safe' :
                      status === 'risk' ? 'bg-risk-light border-risk/30 text-risk' :
                      'bg-caution-light border-caution/30 text-caution'}`}>
                    {rating.verdict}
                  </div>
                )}
                <div className="flex gap-3 flex-wrap">
                  <Button onClick={() => navigate('/general-rating')} variant="dark" size="sm" icon="←">Back</Button>
                  <Link to="/personalized">
                    <Button variant="outline" size="sm" icon="🧬">Get My Score</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Nutrition */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="premium-card p-6 mb-5">
            <p className="section-label mb-4">Nutrition · per 100g</p>
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

        {/* Good for / Not good for */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
            <div className="bg-safe-light border border-safe/20 rounded-2xl p-5 h-full">
              <p className="text-safe text-xs font-semibold uppercase tracking-wider mb-3">✓ Good For</p>
              <ul className="space-y-2">
                {(goodFor[status] || goodFor.caution).map((item) => (
                  <li key={item} className="text-sm text-charcoal-600 flex items-start gap-2">
                    <span className="text-safe mt-0.5">›</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div className="bg-risk-light border border-risk/20 rounded-2xl p-5 h-full">
              <p className="text-risk text-xs font-semibold uppercase tracking-wider mb-3">⚠ Not Good For</p>
              <ul className="space-y-2">
                {(notGoodFor[status] || notGoodFor.caution).map((item) => (
                  <li key={item} className="text-sm text-charcoal-600 flex items-start gap-2">
                    <span className="text-risk mt-0.5">›</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Explanation, Frequency, Alternatives */}
        {rating?.explanation && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <div className="premium-card p-6 mb-5">
              <p className="section-label mb-3">Expert Analysis</p>
              <p className="text-charcoal-300 text-sm leading-relaxed">{rating.explanation}</p>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {rating?.frequency_label && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <div className="premium-card p-5 flex items-center gap-4">
                <span className="text-3xl">⏱</span>
                <div>
                  <p className="section-label mb-1">Suggested Frequency</p>
                  <p className="text-gray-200 font-semibold text-sm">{rating.frequency_label}</p>
                </div>
              </div>
            </motion.div>
          )}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
            <div className="premium-card p-5">
              <p className="text-safe text-xs font-semibold uppercase tracking-wider mb-3">✓ Healthier Alternatives</p>
              <div className="flex flex-wrap gap-2">
                {(alts[product.id] || ['Whole foods', 'Fresh fruit']).map((a) => (
                  <span key={a} className="text-xs bg-safe-light border border-safe/20 text-safe px-2.5 py-1.5 rounded-lg font-medium">{a}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Personalized CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <div className="premium-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-gray-200 font-semibold text-sm">Get a rating built for you.</p>
              <p className="text-charcoal-400 text-xs mt-1">Enter your health profile for a personalized score.</p>
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
