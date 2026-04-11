// src/components/ProductCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onClick, selected = false, className = '' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick(product);
    else navigate(`/result/${product.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={handleClick}
      className={`
        glass rounded-xl border cursor-pointer overflow-hidden
        transition-all duration-300
        ${selected
          ? 'border-neon-blue/60 shadow-neon'
          : 'border-lab-border hover:border-neon-blue/40 hover:shadow-neon'
        }
        ${className}
      `}
    >
      {/* Image */}
      <div className="relative h-36 overflow-hidden bg-lab-surface">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
        />
        <div className="hidden w-full h-full items-center justify-center text-5xl bg-lab-surface">
          {product.emoji}
        </div>
        {/* Top overlay with category */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-3 py-2">
          <span className="text-xs font-mono bg-lab-bg/80 text-neon-blue/80 px-2 py-0.5 rounded border border-neon-blue/20">
            {product.category}
          </span>
          {selected && (
            <span className="text-xs font-mono bg-neon-blue/20 text-neon-blue px-2 py-0.5 rounded border border-neon-blue/40">
              SELECTED
            </span>
          )}
        </div>
        {/* Scan overlay on hover */}
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(0,212,255,0.05))' }} />
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-gray-200 font-semibold text-sm leading-tight">{product.name}</h3>
            <p className="text-gray-600 text-xs font-mono mt-0.5">{product.brand}</p>
          </div>
          <span className="text-2xl flex-shrink-0">{product.emoji}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {product.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs font-mono bg-lab-bg border border-lab-border text-gray-500 px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>

        {/* Nutrition quick view */}
        <div className="mt-3 pt-3 border-t border-lab-border grid grid-cols-3 gap-1 text-center">
          <div>
            <p className="text-gray-300 font-mono font-bold text-xs">{product.nutrition.calories}</p>
            <p className="text-gray-600 text-xs font-mono">kcal</p>
          </div>
          <div>
            <p className="text-caution font-mono font-bold text-xs">{product.nutrition.salt}g</p>
            <p className="text-gray-600 text-xs font-mono">salt</p>
          </div>
          <div>
            <p className="text-risk font-mono font-bold text-xs">{product.nutrition.sugar}g</p>
            <p className="text-gray-600 text-xs font-mono">sugar</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
