/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          blue:   '#00d4ff',
          purple: '#8b5cf6',
          green:  '#00ff88',
          yellow: '#ffd700',
          red:    '#ff4444',
          pink:   '#ff00aa',
        },
        lab: {
          bg:      '#020408',
          panel:   '#060d16',
          card:    '#0a1628',
          surface: '#0d1f3c',
          border:  '#1a3a5c',
          muted:   '#2a4a6c',
        },
        safe:    '#00ff88',
        caution: '#ffd700',
        risk:    '#ff4444',
      },
      fontFamily: {
        mono:  ['JetBrains Mono', 'Courier New', 'monospace'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        orbitron: ['system-ui'],
      },
      backgroundImage: {
        'grid-pattern':    "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
        'hero-gradient':   'radial-gradient(ellipse at 50% 0%, #0d1f3c 0%, #020408 70%)',
        'neon-gradient':   'linear-gradient(135deg, #00d4ff, #8b5cf6)',
        'safe-gradient':   'linear-gradient(135deg, #00ff88, #00d4ff)',
        'risk-gradient':   'linear-gradient(135deg, #ff4444, #ff00aa)',
        'panel-gradient':  'linear-gradient(135deg, rgba(10,22,40,0.9), rgba(6,13,22,0.95))',
      },
      boxShadow: {
        'neon':       '0 0 20px rgba(0,212,255,0.5), 0 0 40px rgba(0,212,255,0.2)',
        'neon-sm':    '0 0 10px rgba(0,212,255,0.4)',
        'neon-purple':'0 0 20px rgba(139,92,246,0.5)',
        'neon-green': '0 0 20px rgba(0,255,136,0.4)',
        'neon-red':   '0 0 20px rgba(255,68,68,0.4)',
        'panel':      '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(0,212,255,0.1)',
        'glow-safe':  '0 0 30px rgba(0,255,136,0.3)',
        'glow-risk':  '0 0 30px rgba(255,68,68,0.3)',
      },
      animation: {
        'orb-pulse':    'orbPulse 3s ease-in-out infinite',
        'scan-line':    'scanLine 2s linear infinite',
        'flicker':      'flicker 4s ease-in-out infinite',
        'matrix-rain':  'matrixRain 8s linear infinite',
        'glow-pulse':   'glowPulse 2s ease-in-out infinite',
        'float':        'float 4s ease-in-out infinite',
        'slide-up':     'slideUp 0.5s ease-out',
        'fade-in':      'fadeIn 0.4s ease-in',
        'data-stream':  'dataStream 3s linear infinite',
        'rotate-slow':  'spin 12s linear infinite',
        'ping-slow':    'ping 3s cubic-bezier(0,0,0.2,1) infinite',
        'health-fill':  'healthFill 1.5s ease-out forwards',
      },
      keyframes: {
        orbPulse: {
          '0%,100%': { transform: 'scale(1)',   boxShadow: '0 0 40px rgba(0,212,255,0.6), 0 0 80px rgba(0,212,255,0.2)' },
          '50%':     { transform: 'scale(1.08)', boxShadow: '0 0 80px rgba(0,212,255,0.9), 0 0 120px rgba(139,92,246,0.4)' },
        },
        scanLine: {
          '0%':   { top: '-5%' },
          '100%': { top: '105%' },
        },
        flicker: {
          '0%,95%,100%': { opacity: 1 },
          '96%':          { opacity: 0.7 },
          '97%':          { opacity: 1 },
          '98%':          { opacity: 0.8 },
        },
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 10px rgba(0,212,255,0.4)' },
          '50%':     { boxShadow: '0 0 30px rgba(0,212,255,0.8), 0 0 60px rgba(0,212,255,0.3)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        slideUp: {
          '0%':   { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: 0 },
          '100%': { opacity: 1 },
        },
        dataStream: {
          '0%':   { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
        healthFill: {
          '0%':   { width: '0%' },
          '100%': { width: 'var(--health-width)' },
        },
      },
    },
  },
  plugins: [],
}
