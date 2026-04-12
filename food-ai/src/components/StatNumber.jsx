import React, { useState, useEffect, useRef } from 'react';

const easeOutCubic = (t) => 1 - (1 - t) ** 3;

const durationForTarget = (n) => {
  if (n >= 5000) return 2400;
  if (n >= 500) return 2000;
  return 1400;
};

/**
 * Large stat figures — Italianno + count-up from 0 (relaxing ease-out).
 * @param {number} target — final integer (e.g. 1000, 10000, 3, 5)
 * @param {string} [suffix] — e.g. '+', '★', ''
 * @param {number} [delay] — ms before counting starts (stagger columns)
 */
const StatNumber = ({ target, suffix = '', className = '', delay = 0, duration: durationProp }) => {
  const [n, setN] = useState(0);
  const rafRef = useRef(null);
  const tMax = Math.max(0, Math.floor(Number(target) || 0));
  const duration = durationProp ?? durationForTarget(tMax);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setN(tMax);
      return undefined;
    }

    setN(0);
    const startWall = performance.now() + delay;

    const tick = (now) => {
      const elapsed = now - startWall;
      if (elapsed < 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const p = Math.min(1, elapsed / duration);
      setN(Math.round(easeOutCubic(p) * tMax));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, delay, tMax]);

  const visual = `${n}${suffix}`;
  const finalStr = `${tMax}${suffix}`;

  return (
    <span className={`stat-number ${className}`.trim()} aria-label={finalStr.replace('★', ' stars')}>
      <span className="sr-only">{finalStr}</span>
      <span className="stat-number-face" aria-hidden="true">
        {visual}
      </span>
    </span>
  );
};

export default StatNumber;
