// Soft drifting “kitchen light” + floating food motifs — sits behind section content
import React, { useMemo } from 'react';

const GLYPHS = ['🍎', '🥕', '🥬', '🍋', '🫐', '🥑', '🍞', '🧀', '🥛', '🍇', '🌾', '🍊'];

const pick = (arr, i) => arr[i % arr.length];

const FoodAmbientLayer = ({ density = 'normal', variant = 'default' }) => {
  const count = density === 'dense' ? 14 : density === 'sparse' ? 6 : 10;
  const layerClass =
    variant === 'hero'
      ? 'food-ambient-layer food-ambient-layer--hero'
      : 'food-ambient-layer';
  const items = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      glyph: pick(GLYPHS, i * 7 + 3),
      top: `${(i * 17 + 3) % 88}%`,
      left: `${(i * 23 + 11) % 92}%`,
      size: 0.85 + (i % 5) * 0.22,
      dur: 18 + (i % 9) * 4,
      delay: (i * 0.7) % 6,
      drift: i % 4,
    }));
  }, [count, density]);

  const driftClass = ['animate-food-drift-a', 'animate-food-drift-b', 'animate-food-drift-c', 'animate-food-drift-a'];

  return (
    <div className={`${layerClass} absolute inset-0 overflow-hidden pointer-events-none select-none`} aria-hidden>
      <div className="food-ambient-mesh animate-aurora-pan" />
      <div className="food-ambient-vignette" />
      {items.map((it, i) => (
        <span
          key={i}
          className={`food-float ${driftClass[it.drift]}`}
          style={{
            top: it.top,
            left: it.left,
            fontSize: `${it.size}rem`,
            animationDuration: `${it.dur}s`,
            animationDelay: `${it.delay}s`,
          }}
        >
          {it.glyph}
        </span>
      ))}
    </div>
  );
};

export default FoodAmbientLayer;
