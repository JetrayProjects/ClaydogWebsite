import React, { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'

const menuData = {
  'SHORTS': [
    'Anthyesti',
    'On the back burner',
    'Until We Dance Again',
    'The Photograph'
  ],
  'NON-FICTION': [
    'Example 1',
    'Example 2',
    'Example 3'
  ],
  'COMMERCIAL': [
    'Example 1',
    'Example 2',
    'Example 3'
  ],
  'MUSIC VIDEOS': [
    'Mysie - Dun Di Dun',
    'CAVN',
    'The Blade and The Butterfly'
  ]
}

const videoMap = {
  'Anthyesti': '/videos/Antyesthi/Anthyesti clip.mp4',
  'On the back burner': '/videos/On the Back Burner/oTBB.mp4',
  'Until We Dance Again': '/videos/Until We Dance Again/The furnished room clip.mp4',
  'Mysie - Dun Di Dun': '/videos/MysieDunDiDun/dundidun.mp4',
  'CAVN': '/videos/cavn/Untitled.mp4',
  'The Blade and The Butterfly': '/videos/TheBladeandTheButterfly/thebladeandthebutterfly.mp4'
}

const VideoPreview = ({ children, videoSrc, position = 'top' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const springConfig = { stiffness: 100, damping: 15 }
  const x = useMotionValue(0)
  const translateX = useSpring(x, springConfig)

  const handleMouseMove = (event) => {
    const targetRect = event.currentTarget.getBoundingClientRect()
    const eventOffsetX = event.clientX - targetRect.left
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2
    x.set(offsetFromCenter)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <span
        style={{
          fontFamily: '"Outfit", sans-serif',
          fontSize: '2rem',
          color: '#e0e0e0',
          cursor: 'pointer',
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#e0e0e0')}
      >
        {children}
      </span>

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
  )
}

const ProjectsMenu = ({ onClose }) => {
  const [activeCategory, setActiveCategory] = useState('SHORTS')

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  }

  const rightSideVariants = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0, transition: { staggerChildren: 0.05 } }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'transparent',
        color: '#ffffff',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 4rem'
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '4rem' }}>
        <button
          onClick={onClose}
          aria-label="Close menu"
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.7';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <svg
            width="3rem"
            height="3rem"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        width: '100%',
        flex: 1
      }}>
        {/* Left Column: Categories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', flex: 1 }}>
          {Object.keys(menuData).map((category) => (
            <motion.div
              key={category}
              variants={itemVariants}
              onClick={() => setActiveCategory(category)}
              style={{
                cursor: 'pointer',
                fontFamily: 'var(--font-hand)',
                fontSize: '5rem',
                fontWeight: 'normal',
                lineHeight: '1',
                color: activeCategory === category ? '#ffffff' : '#666666',
                textTransform: 'uppercase',
                transition: 'color 0.3s ease'
              }}
            >
              {category}
            </motion.div>
          ))}
        </div>

        {/* Right Column: Projects */}
        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '1rem', flex: 1, paddingLeft: '4rem' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={rightSideVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {menuData[activeCategory].map((project, index) => (
                <motion.div
                  key={project}
                  variants={itemVariants}
                >
                  <VideoPreview 
                    videoSrc={videoMap[project]}
                    position={index === 0 ? 'right' : 'top'}
                  >
                    {project}
                  </VideoPreview>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      </div>
    </motion.div>
  )
}

export default ProjectsMenu
