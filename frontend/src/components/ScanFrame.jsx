import React from 'react';
import { motion } from 'framer-motion';

const ScanFrame = ({ children, scanning = false, className = '' }) => {
  return (
    <div className={`relative rounded-xl overflow-hidden ${className}`}>
      {['top-0 left-0 border-t border-l', 'top-0 right-0 border-t border-r',
        'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r'
      ].map((pos, i) => (
        <div
          key={i}
          className={`absolute w-5 h-5 ${pos} border-neon-blue/80 z-20`}
          style={{ boxShadow: i < 2 ? '0 0 4px rgba(0,212,255,0.6)' : 'none' }}
        />
      ))}

      {scanning && (
        <>
          <motion.div
            className="absolute left-0 right-0 h-0.5 z-20"
            style={{ background: 'linear-gradient(90deg, transparent, #00d4ff, #8b5cf6, transparent)', boxShadow: '0 0 12px #00d4ff' }}
            initial={{ top: '-5%' }}
            animate={{ top: '105%' }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-0 z-10 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
        </>
      )}

      {children}
    </div>
  );
};

export default ScanFrame;
