import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const VideoPreview = ({ children, videoSrc, position = 'top', onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <motion.span
        layoutId={`project-title-${children}`}
        onClick={onClick}
        style={{
          fontFamily: '"Outfit", sans-serif',
          fontSize: '2rem',
          color: '#e0e0e0',
          cursor: 'pointer',
          transition: 'color 0.2s ease',
          display: 'inline-block'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#e0e0e0')}
      >
        {children}
      </motion.span>

      <AnimatePresence>
        {isOpen && videoSrc && (
          <div
            style={
              position === 'right'
                ? {
                    position: 'absolute',
                    left: '100%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    paddingLeft: '24px',
                    zIndex: 10000,
                    pointerEvents: 'none'
                  }
                : {
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    paddingBottom: '16px',
                    zIndex: 10000,
                    pointerEvents: 'none'
                  }
            }
          >
            <motion.div
              initial={{ 
                opacity: 0, 
                y: position === 'right' ? 0 : 15, 
                x: position === 'right' ? 15 : 0, 
                scale: 0.8 
              }}
              animate={{
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                transition: { type: 'spring', stiffness: 260, damping: 20 }
              }}
              exit={{ 
                opacity: 0, 
                y: position === 'right' ? 0 : 15, 
                x: position === 'right' ? 15 : 0, 
                scale: 0.8 
              }}
              style={{
                x: translateX,
              }}
            >
              <div style={{
                padding: '4px',
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                overflow: 'hidden',
                width: '360px',
                height: '202.5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <video
                  src={videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoPreview;
