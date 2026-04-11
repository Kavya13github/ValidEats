// src/components/AnimatedBackground.jsx
// Global canvas-based moving particle network — zero dependency on Three.js
import React, { useRef, useEffect } from 'react';

const PARTICLE_COUNT = 52;
const MAX_DIST       = 118;
const GOLD           = '212, 175, 55';
const BLUE           = '96, 165, 250';
const PURPLE         = '167, 139, 250';

function rand(min, max) { return Math.random() * (max - min) + min; }

class Particle {
  constructor(w, h) { this.reset(w, h); }

  reset(w, h) {
    this.x   = rand(0, w);
    this.y   = rand(0, h);
    this.vx  = rand(-0.12, 0.12);
    this.vy  = rand(-0.12, 0.12);
    this.r   = rand(1, 2.2);
    const p  = Math.random();
    this.color = p < 0.6 ? GOLD : p < 0.8 ? BLUE : PURPLE;
    this.a   = rand(0.2, 0.55);
  }

  update(w, h) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < -10) this.x = w + 10;
    if (this.x > w + 10) this.x = -10;
    if (this.y < -10) this.y = h + 10;
    if (this.y > h + 10) this.y = -10;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.a})`;
    ctx.fill();
  }
}

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const stateRef  = useRef({ particles: [], mouse: { x: -999, y: -999 }, raf: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx    = canvas.getContext('2d');
    const state  = stateRef.current;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      state.particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle(canvas.width, canvas.height));
    };

    const onMouse = (e) => { state.mouse.x = e.clientX; state.mouse.y = e.clientY; };
    const onLeave = () => { state.mouse.x = -999; state.mouse.y = -999; };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('mouseleave', onLeave);

    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      const { particles, mouse } = state;

      particles.forEach((p) => { p.update(w, h); p.draw(ctx); });

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${GOLD}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect to mouse
        const p = particles[i];
        const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 160) {
          const alpha = (1 - mdist / 160) * 0.32;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${GOLD}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          // Draw a highlight dot on the particle near mouse
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${GOLD}, ${alpha * 1.5})`;
          ctx.fill();
        }
      }

      state.raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(state.raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 2, opacity: 0.42 }}
    />
  );
};

export default AnimatedBackground;
