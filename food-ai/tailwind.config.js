/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light:  '#F0D060',
          DEFAULT:'#D4AF37',
          dark:   '#A88A1A',
          muted:  '#8B6914',
        },
        charcoal: {
          DEFAULT: '#0F0F0F',
          '50':    '#f5f5f5',
          '100':   '#e8e8e8',
          '200':   '#c8c8c8',
          '300':   '#a0a0a0',
          '400':   '#6e6e6e',
          '500':   '#3e3e3e',
          '600':   '#2a2a2a',
          '700':   '#1e1e1e',
          '800':   '#161616',
          '900':   '#0F0F0F',
        },
        ivory: {
          DEFAULT: '#F8F6F1',
          dark:    '#EDE9DE',
        },
        safe:    '#2E7D32',
        caution: '#F57F17',
        risk:    '#C62828',
        'safe-light':    '#E8F5E9',
        'caution-light': '#FFF8E1',
        'risk-light':    '#FFEBEE',
      },
      fontFamily: {
        serif:  ['"Playfair Display"', 'Georgia', 'serif'],
        sans:   ['Inter', 'system-ui', 'sans-serif'],
        mono:   ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gold-gradient':    'linear-gradient(135deg, #F0D060, #D4AF37, #A88A1A)',
        'dark-gradient':    'linear-gradient(180deg, #0F0F0F 0%, #1a1a1a 100%)',
        'hero-gradient':    'radial-gradient(ellipse at 50% 0%, #1e1a0e 0%, #0F0F0F 60%)',
        'card-gradient':    'linear-gradient(145deg, #1e1e1e, #161616)',
        'ivory-gradient':   'linear-gradient(180deg, #F8F6F1 0%, #EDE9DE 100%)',
      },
      boxShadow: {
        'gold':        '0 4px 24px rgba(212,175,55,0.25)',
        'gold-hover':  '0 8px 40px rgba(212,175,55,0.4)',
        'gold-sm':     '0 2px 10px rgba(212,175,55,0.2)',
        'elegant':     '0 4px 30px rgba(0,0,0,0.4)',
        'card':        '0 2px 16px rgba(0,0,0,0.25)',
        'card-hover':  '0 12px 40px rgba(0,0,0,0.5)',
        'inner-gold':  'inset 0 1px 0 rgba(212,175,55,0.3)',
        'safe':        '0 4px 16px rgba(46,125,50,0.25)',
        'risk':        '0 4px 16px rgba(198,40,40,0.25)',
      },
      animation: {
        'star-fill':    'starFill 0.4s ease-out forwards',
        'fade-up':      'fadeUp 0.6s ease-out',
        'fade-in':      'fadeIn 0.4s ease-in',
        'shimmer':      'shimmer 2.5s linear infinite',
        'float':        'float 5s ease-in-out infinite',
        'scan-sweep':   'scanSweep 2s linear infinite',
        'count-up':     'countUp 1s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: 0 },
          '100%': { opacity: 1 },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
        scanSweep: {
          '0%':   { top: '-2px' },
          '100%': { top: '100%' },
        },
        starFill: {
          '0%':   { transform: 'scale(0)', opacity: 0 },
          '60%':  { transform: 'scale(1.3)', opacity: 1 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        slideInLeft: {
          '0%':   { opacity: 0, transform: 'translateX(-20px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
      },
      borderRadius: {
        'xl2': '1rem',
        'xl3': '1.5rem',
      },
    },
  },
  plugins: [],
}
