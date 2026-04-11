// src/components/AIOrb.jsx
import React from 'react';
import { motion } from 'framer-motion';

const AIOrb = ({ size = 'lg', label = 'VALIDEAT AI', sublabel = 'Health Lab v2.0' }) => {
  const sizes = {
    sm:  { outer: 'w-24 h-24', inner: 'w-16 h-16', core: 'w-8 h-8',  text: 'text-xs' },
    md:  { outer: 'w-40 h-40', inner: 'w-28 h-28', core: 'w-14 h-14', text: 'text-sm' },
    lg:  { outer: 'w-56 h-56', inner: 'w-40 h-40', core: 'w-20 h-20', text: 'text-base' },
    xl:  { outer: 'w-72 h-72', inner: 'w-52 h-52', core: 'w-28 h-28', text: 'text-xl' },
  };
  const s = sizes[size] || sizes.lg;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Orb */}
      <div className={`relative ${s.outer} flex items-center justify-center`}>
        {/* Outer ring pulse */}
        <motion.div
          className="absolute inset-0 rounded-full border border-neon-blue/20"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border border-purple-500/20"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />

        {/* Rotating ring */}
        <motion.div
          className={`absolute ${s.inner} rounded-full`}
          style={{ border: '1px solid rgba(0,212,255,0.4)', borderTopColor: 'transparent' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className={`absolute rounded-full`}
          style={{
            width: '75%', height: '75%',
            border: '1px solid rgba(139,92,246,0.4)', borderBottomColor: 'transparent'
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />

        {/* Core glow */}
        <motion.div
          className={`${s.core} rounded-full z-10 flex items-center justify-center`}
          style={{
            background: 'radial-gradient(circle, rgba(0,212,255,0.9) 0%, rgba(139,92,246,0.6) 50%, rgba(0,212,255,0.3) 100%)',
          }}
          animate={{
            boxShadow: [
              '0 0 30px rgba(0,212,255,0.6), 0 0 60px rgba(0,212,255,0.2)',
              '0 0 60px rgba(0,212,255,0.9), 0 0 100px rgba(139,92,246,0.4)',
              '0 0 30px rgba(0,212,255,0.6), 0 0 60px rgba(0,212,255,0.2)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className={`text-white font-mono font-bold ${s.text}`}>AI</span>
        </motion.div>
      </div>

      {/* Label */}
      <div className="text-center">
        <p className="hud-label neon-text">{label}</p>
        <p className="text-xs text-gray-500 font-mono mt-0.5">{sublabel}</p>
      </div>
    </div>
  );
};

export default AIOrb;
