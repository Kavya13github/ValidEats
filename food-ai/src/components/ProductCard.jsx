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
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={handleClick}
      className={`
        premium-card cursor-pointer overflow-hidden group
        ${selected ? '!border-gold/60 !shadow-gold' : ''}
        ${className}
      `}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden bg-charcoal-800">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
        />
        <div className="hidden w-full h-full items-center justify-center text-6xl bg-charcoal-800">
          {product.emoji}
        </div>

        {/* Category tag */}
        <div className="absolute top-3 left-3">
          <span className="text-xs bg-charcoal-900/80 text-charcoal-300 px-2.5 py-1 rounded-full border border-charcoal-700 backdrop-blur-sm">
            {product.category}
          </span>
        </div>

        {selected && (
          <div className="absolute top-3 right-3">
            <span className="text-xs bg-gold text-charcoal-900 font-semibold px-2.5 py-1 rounded-full">
              ✓ Selected
            </span>
          </div>
        )}

        {/* Gold bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-charcoal-900 to-transparent" />
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="text-gray-200 font-semibold text-sm leading-tight">{product.name}</h3>
            <p className="text-charcoal-400 text-xs mt-0.5">{product.brand}</p>
          </div>
          <span className="text-2xl flex-shrink-0">{product.emoji}</span>
        </div>

        {showRating && rating && (
          <div className="mt-3">
            <RatingStars stars={rating.stars} size="sm" showNumber />
            {status && <HealthBadge status={status} size="sm" className="mt-2" />}
          </div>
        )}

        {/* Nutrition row */}
        <div className="mt-3 pt-3 border-t border-charcoal-800 grid grid-cols-3 gap-1 text-center">
          <div>
            <p className="text-gray-300 font-semibold text-xs">{product.nutrition.calories}</p>
            <p className="text-charcoal-500 text-xs">kcal</p>
          </div>
          <div>
            <p className="text-caution font-semibold text-xs">{product.nutrition.salt}g</p>
            <p className="text-charcoal-500 text-xs">salt</p>
          </div>
          <div>
            <p className="text-risk font-semibold text-xs">{product.nutrition.sugar}g</p>
            <p className="text-charcoal-500 text-xs">sugar</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
