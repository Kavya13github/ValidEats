import React from 'react';

const configs = {
  hero: [
    { cls: 'orb orb-gold',   size: 480, top: '-10%',   left: '-10%',  delay: 0    },
    { cls: 'orb orb-purple', size: 360, bottom: '-5%',  right: '-5%',  delay: 2    },
    { cls: 'orb orb-teal',   size: 260, top: '40%',     right: '15%',  delay: 4    },
    { cls: 'orb orb-blue',   size: 200, top: '20%',     left: '60%',   delay: 1    },
  ],
  section: [
    { cls: 'orb orb-gold',   size: 320, top: '-15%',   right: '-5%',  delay: 0    },
    { cls: 'orb orb-purple', size: 240, bottom: '-10%', left: '-5%',   delay: 2.5  },
  ],
  scan: [
    { cls: 'orb orb-teal',  size: 300, top: '10%',     left: '-5%',   delay: 0    },
    { cls: 'orb orb-gold',  size: 200, bottom: '10%',  right: '-5%',  delay: 3    },
  ],
  personalized: [
    { cls: 'orb orb-purple', size: 350, top: '-10%',   left: '-10%',  delay: 0    },
    { cls: 'orb orb-pink',   size: 260, bottom: '0%',  right: '-5%',  delay: 3    },
    { cls: 'orb orb-gold',   size: 180, top: '50%',    right: '30%',  delay: 1.5  },
  ],
  about: [
    { cls: 'orb orb-blue',  size: 320, top: '-10%',   right: '10%',  delay: 0    },
    { cls: 'orb orb-gold',  size: 220, bottom: '20%',  left: '-5%',   delay: 2    },
  ],
};

const FloatingOrbs = ({ variant = 'section' }) => {
  const orbs = configs[variant] || configs.section;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {orbs.map((orb, i) => (
        <div
          key={i}
          className={orb.cls}
          style={{
            width:  orb.size,
            height: orb.size,
            top:    orb.top,
            left:   orb.left,
            right:  orb.right,
            bottom: orb.bottom,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingOrbs;
