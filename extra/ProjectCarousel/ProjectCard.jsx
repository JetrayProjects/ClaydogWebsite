import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, videoSrc, isActive, isLeft, isRight, onClick }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(e => console.log("Play interrupted", e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  let xOffset = 0;
  let scale = 1;
  let zIndex = 1;
  let opacity = 1;

  if (!isActive) {
    if (isLeft) {
      xOffset = '-80%';
      scale = 0.8;
      zIndex = 0;
      opacity = 0.6;
    } else if (isRight) {
      xOffset = '80%';
      scale = 0.8;
      zIndex = 0;
      opacity = 0.6;
    } else {
      scale = 0.8;
      zIndex = -1;
      opacity = 0;
    }
  }

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={false}
      animate={{
        x: xOffset,
        scale: scale,
        zIndex: zIndex,
        opacity: opacity,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{
        position: 'absolute',
        width: '75vw',
        maxWidth: '1400px',
        height: 'auto',
        maxHeight: '90%', // Prevent card from exceeding parent 65vh height (clips rounded corners and title)
        aspectRatio: '16/9',
        borderRadius: '24px',
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
        cursor: isActive || isLeft || isRight ? 'pointer' : 'default',
        boxShadow: isActive 
          ? '0 20px 40px rgba(0,0,0,0.1)' 
          : 'none',
        border: isActive ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(0,0,0,0.05)',
        /* Ensure hardware acceleration & clean Safari clipping for rounded corners */
        WebkitMaskImage: '-webkit-radial-gradient(white, black)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'translate3d(0,0,0)',
        WebkitTransform: 'translate3d(0,0,0)',
      }}
    >
      {/* Video Background */}
      {videoSrc ? (
        <video
          ref={videoRef}
          src={videoSrc}
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isActive ? 1 : 0.3,
            transition: 'opacity 0.4s ease',
            borderRadius: '24px', // Explicit rounding for video elements
          }}
        />
      ) : (
        <div style={{ width: '100%', height: '100%', backgroundColor: '#eee', borderRadius: '24px' }} />
      )}

      {/* Cinematic Gradient Overlay for Title Contrast */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 45%)',
        pointerEvents: 'none',
        borderRadius: '24px',
        zIndex: 1
      }} />

      {/* Title Overlay — bottom-left, cursive white */}
      <h3 style={{
        position: 'absolute',
        bottom: 'clamp(16px, 4%, 28px)',
        left: 'clamp(20px, 5%, 36px)',
        fontFamily: 'var(--font-hand)',
        fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)',
        margin: 0,
        color: '#fff',
        textShadow: '0 2px 14px rgba(0,0,0,0.5)',
        pointerEvents: 'none',
        lineHeight: 1,
        zIndex: 3 // Kept above the gradient overlay (zIndex 1) and video playback (zIndex 0)
      }}>
        {project}
      </h3>
    </motion.div>
  );
};

export default ProjectCard;
