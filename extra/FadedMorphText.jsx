import React from 'react';
import { motion } from 'framer-motion';

export default function FadedMorphText({ show }) {
  return (
    <div style={{ position: 'relative', minHeight: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', overflow: 'visible' }}>
      {/* Exact SVG gooey threshold filter provided in the prompt */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true" focusable="false">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        style={{
          filter: 'url(#threshold)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'visible',
          padding: '20px'
        }}
      >
        <motion.p
          initial={{ 
            opacity: 0, 
            filter: 'blur(10px)' // Start with a smaller CSS blur so the threshold doesn't erase it
          }}
          animate={show ? { 
            opacity: 1, 
            filter: 'blur(0px)' 
          } : {}}
          transition={{ 
            duration: 2.0, 
            ease: [0.25, 1, 0.5, 1] // Smooth ease-out
          }}
          style={{
            margin: 0,
            fontFamily: '"Chelsea Market", cursive',
            fontSize: '2rem',
            fontWeight: '400',
            color: '#000000', // Ensure high contrast black color for threshold filter
            textAlign: 'center',
            letterSpacing: '0.03em',
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          Click Below
        </motion.p>
      </div>
    </div>
  );
}
