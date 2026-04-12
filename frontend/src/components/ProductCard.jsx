// src/components/ProductCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import RatingStars from './RatingStars';
import HealthBadge from './HealthBadge';
import { getGeneralRating } from '../data/ratings';

const ProductCard = ({ product, onClick, selected = false, showRating = false, className = '' }) => {
  const navigate = useNavigate();
  const rating = showRating ? getGeneralRating(product.id, 'adults') : null;
  const status = rating ? (rating.stars >= 4 ? 'safe' : rating.stars >= 2.5 ? 'caution' : 'risk') : null;

  const handleClick = () => {
    if (onClick) onClick(product);
    else navigate(`/result/${product.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -7, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      onClick={handleClick}
      className={`
        card cursor-pointer overflow-hidden group
        ${selected ? '!border-gold/60 shadow-gold' : ''}
        ${className}
      `}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, rgba(26,31,53,0.5), rgba(18,23,43,0.9))' }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
        />
        <div className="hidden w-full h-full items-center justify-center text-7xl"
          style={{ background: 'linear-gradient(135deg, #1A1F35, #12172B)' }}>
          {product.emoji}
        </div>

        {/* Category */}
        <div className="absolute top-3 left-3">
          <span className="text-xs bg-black/50 text-slate-300 px-2.5 py-1 rounded-xl border border-white/10 backdrop-blur-sm font-medium">
            {product.category}
          </span>
        </div>

        {selected && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400 }}
            className="absolute top-3 right-3">
            <span className="text-xs bg-gold text-brand-bg font-bold px-2.5 py-1 rounded-xl shadow-gold-sm">✓ Selected</span>
          </motion.div>
        )}

        {/* Gradient fade */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-brand-card to-transparent" />

        {/* Emoji overlay */}
        <div className="absolute bottom-3 right-3 text-3xl opacity-80 group-hover:scale-110 transition-transform">
          {product.emoji}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 pt-3">
        <h3 className="text-slate-100 font-bold text-sm leading-tight mb-0.5">{product.name}</h3>
        <p className="text-slate-600 text-xs mb-3">{product.brand}</p>

        {showRating && rating && (
          <div className="space-y-2 mb-3">
            <RatingStars stars={rating.stars} size="xs" showNumber />
            {status && <HealthBadge status={status} size="sm" />}
          </div>
        )}

        {/* Mini nutrition row */}
        <div className="grid grid-cols-3 gap-1 text-center pt-3 border-t border-white/5">
          <div>
            <p className="text-slate-200 font-bold text-xs">{product.nutrition.calories}</p>
            <p className="text-slate-600 text-[10px]">kcal</p>
          </div>
          <div>
            <p className="text-caution font-bold text-xs">{product.nutrition.salt}g</p>
            <p className="text-slate-600 text-[10px]">salt</p>
          </div>
          <div>
            <p className="text-risk font-bold text-xs">{product.nutrition.sugar}g</p>
            <p className="text-slate-600 text-[10px]">sugar</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
