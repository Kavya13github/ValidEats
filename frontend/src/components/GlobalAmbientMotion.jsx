// src/components/GlobalAmbientMotion.jsx
// Site-wide, fixed, low-contrast motion behind all pages (relaxing; matches gold / navy vibe).
import React from 'react';

const GlobalAmbientMotion = () => (
  <div className="global-ambient" aria-hidden="true">
    <div className="global-ambient__orb global-ambient__orb--a" />
    <div className="global-ambient__orb global-ambient__orb--b" />
    <div className="global-ambient__orb global-ambient__orb--c" />
    <div className="global-ambient__sheen" />
  </div>
);

export default GlobalAmbientMotion;
