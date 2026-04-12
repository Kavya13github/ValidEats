// src/components/SiteAmbient3D.jsx
// CSS-only ambient replacement — eliminates WebGL context loss warnings
import React from 'react';
import { useLocation } from 'react-router-dom';

const SiteAmbient3D = () => {
  const { pathname } = useLocation();
  const onHome = pathname === '/';
  const opacity = onHome ? 0.12 : 0.28;

  return (
    <div
      className="site-ambient-3d fixed inset-0 z-[1] pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ opacity }}
    >
      {/* Gold torus-knot CSS orb */}
      <div
        style={{
          position: 'absolute',
          top: '18%',
          left: '-4%',
          width: 220,
          height: 220,
          borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
          background: 'radial-gradient(circle at 40% 40%, rgba(212,175,55,0.18), rgba(212,175,55,0.04) 70%)',
          border: '1px solid rgba(212,175,55,0.14)',
          animation: 'siteOrb1 12s ease-in-out infinite',
          filter: 'blur(1px)',
        }}
      />
      {/* Purple icosahedron-style polygon */}
      <div
        style={{
          position: 'absolute',
          top: '55%',
          right: '-3%',
          width: 160,
          height: 160,
          borderRadius: '30% 70% 40% 60% / 60% 30% 70% 40%',
          background: 'radial-gradient(circle at 60% 55%, rgba(139,92,246,0.18), rgba(139,92,246,0.03) 70%)',
          border: '1px solid rgba(139,92,246,0.18)',
          animation: 'siteOrb2 16s ease-in-out infinite',
          filter: 'blur(0.5px)',
        }}
      />
      {/* Small cyan accent */}
      <div
        style={{
          position: 'absolute',
          top: '75%',
          left: '8%',
          width: 90,
          height: 90,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(20,184,166,0.16), transparent 70%)',
          border: '1px solid rgba(20,184,166,0.2)',
          animation: 'siteOrb3 9s ease-in-out infinite',
        }}
      />

      <style>{`
        @keyframes siteOrb1 {
          0%, 100% { transform: translate(0,0) rotate(0deg) scale(1); }
          33% { transform: translate(16px, -24px) rotate(60deg) scale(1.08); }
          66% { transform: translate(-10px, 18px) rotate(120deg) scale(0.94); }
        }
        @keyframes siteOrb2 {
          0%, 100% { transform: translate(0,0) rotate(0deg) scale(1); }
          40% { transform: translate(-20px, 12px) rotate(-80deg) scale(1.1); }
          70% { transform: translate(8px, -16px) rotate(-160deg) scale(0.92); }
        }
        @keyframes siteOrb3 {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default SiteAmbient3D;
