// src/components/SectionHeading.jsx
import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({ label, title, subtitle, align = 'center', light = false, className = '' }) => {
  const textAlign = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col gap-3 ${textAlign} ${className}`}
    >
      {label && (
        <div className="flex items-center gap-3">
          {align === 'center' && <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/50" />}
          <span className="section-label">{label}</span>
          {align === 'center' && <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/50" />}
        </div>
      )}
      <h2 className={`font-elegant text-4xl md:text-5xl leading-none ${light ? 'text-charcoal-900' : 'text-white'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-sm leading-relaxed max-w-xl ${align === 'center' ? 'mx-auto' : ''} ${light ? 'text-charcoal-500' : 'text-charcoal-300'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
