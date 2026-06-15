import React, { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import InfiniteGallery from './components/ui/3d-gallery-photography'
import ProjectsMenu from './components/ui/ProjectsMenu'
import FilmDetails from './components/ui/FilmDetails'
import FadedMorphText from './components/ui/FadedMorphText'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { useProgress } from '@react-three/drei'


const images = [
  '/landing_page/Additional PHOTOGRAPHY /000052.webp',
  '/landing_page/Additional PHOTOGRAPHY /000057.webp',
  '/landing_page/Additional PHOTOGRAPHY /000059.webp',
  '/landing_page/Additional PHOTOGRAPHY /000064.webp',
  '/landing_page/Additional PHOTOGRAPHY /000065.webp',
  '/landing_page/Additional PHOTOGRAPHY /000072.webp',
  '/landing_page/Additional PHOTOGRAPHY /_DSF3875.webp',
  '/landing_page/Additional PHOTOGRAPHY /_DSF3943.webp',
  '/landing_page/Additional PHOTOGRAPHY /_DSF3963-2.webp',
  '/landing_page/Additional PHOTOGRAPHY /_DSF4044.webp',
  '/landing_page/Additional PHOTOGRAPHY /_DSF4084.webp',
  '/landing_page/Additional PHOTOGRAPHY /_DSF4167.webp',
  '/landing_page/Additional PHOTOGRAPHY /_DSF6508.webp',
  '/landing_page/Additional PHOTOGRAPHY /_DSF6524.webp',
  '/landing_page/Additional PHOTOGRAPHY /_DSF6548.webp',
  '/landing_page/Additional PHOTOGRAPHY /_DSF6593.webp',
  '/landing_page/Additional PHOTOGRAPHY /_DSF6599.webp',
  '/landing_page/Additional PHOTOGRAPHY /_DSF6618.webp',
  '/landing_page/Additional PHOTOGRAPHY /_DSF6621.webp',
  '/landing_page/Additional PHOTOGRAPHY /_DSF6630.webp',
  '/landing_page/Additional PHOTOGRAPHY /_DSF8298.webp',
  '/landing_page/Additional PHOTOGRAPHY /_DSF8303.webp',
  '/landing_page/Additional PHOTOGRAPHY /_DSF8304.webp',
  '/landing_page/Additional PHOTOGRAPHY /_DSF8467.webp',
  '/landing_page/Additional PHOTOGRAPHY /_DSF8533.webp',
  '/landing_page/Additional PHOTOGRAPHY /_DSF8922.webp',
  '/landing_page/Additional PHOTOGRAPHY /_DSF9111.webp',
  '/landing_page/Additional PHOTOGRAPHY /_DSF9212.webp',
  '/landing_page/Additional PHOTOGRAPHY /_DSF9275.webp'
]

const HoverBranding = ({ onTriggerMenu }) => {
  const { progress, active } = useProgress()
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)
  const hoverTimer = useRef(null)

  // 0 = unmounted/0%, 1 = crawling to 90%, 2 = finishing to 100%
  const [loadState, setLoadState] = useState(0) 

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    
    // Start hardware-accelerated crawl to 90% immediately
    const frame = requestAnimationFrame(() => setLoadState(1))
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    // When the actual gallery finishes loading, trigger the final 10%
    if (progress === 100 || (!active && loadState === 1)) {
      const timer = setTimeout(() => setLoadState(2), 500) // Small buffer
      return () => clearTimeout(timer)
    }
  }, [progress, active, loadState])

  const isLoading = loadState < 2

  const handleMouseEnter = () => {
    if (isLoading) return
    hoverTimer.current = setTimeout(() => {
      onTriggerMenu()
    }, 2000)
  }

  const handleMouseLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current)
    }
  }

  const handleClick = () => {
    if (isLoading) return
    onTriggerMenu()
  }

  const isMobile = windowWidth < 768

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'auto',
        cursor: isLoading ? 'default' : 'pointer',
        padding: '20px'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <motion.div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 2,
          position: 'relative'
        }}
      >
        <FadedMorphText show={!isLoading} />
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          gap: isMobile ? '1rem' : '2rem',
        }}
      >
        <img
          src="/whiteonblack.png"
          alt="Claydog Logo"
          style={{
            height: isMobile ? '100px' : '160px',
            width: 'auto',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            borderRadius: '8px'
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'center' : 'flex-start', textAlign: isMobile ? 'center' : 'left' }}>
          <h1 style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'var(--font-hand)',
              fontSize: isMobile ? '5rem' : '6.5rem',
              lineHeight: '1',
              color: 'var(--text-primary)',
              textShadow: '0 1px 4px rgba(255,255,255,0.8)'
            }}>
              Claydog
            </span>
            <span style={{
              fontFamily: '"Syne", var(--font-body), sans-serif',
              fontSize: isMobile ? '1.8rem' : '2.5rem',
              lineHeight: '1',
              fontWeight: 800,
              letterSpacing: '0.05em',
              color: 'var(--text-primary)',
              textShadow: '0 1px 4px rgba(255,255,255,0.8)'
            }}>
              MEDIA
            </span>
          </h1>
        </div>
      </div>

        {/* LOADING BAR */}
        <div style={{
          width: '350px',
          height: '4px',
          backgroundColor: 'rgba(0,0,0,0.1)',
          marginTop: '2rem',
          borderRadius: '4px',
          overflow: 'hidden',
          opacity: isLoading ? 1 : 0,
          transition: 'opacity 0.8s ease',
          pointerEvents: 'none'
        }}>
          <div
            style={{
              height: '100%',
              backgroundColor: '#000000',
              width: '100%',
              transformOrigin: 'left',
              transform: `scaleX(${loadState === 0 ? 0 : loadState === 1 ? 0.9 : 1})`,
              transition: loadState === 1 
                ? 'transform 3s cubic-bezier(0.1, 0.8, 0.2, 1)' // Crawl to 90% over 3s
                : 'transform 0.5s ease-out' // Zip to 100% in 0.5s
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showMenuContent, setShowMenuContent] = useState(false)
  const [showInstruction, setShowInstruction] = useState(false)
  const [activeProject, setActiveProject] = useState(null)
  const [lastActiveProject, setLastActiveProject] = useState(null)
  const [activeVideoSrc, setActiveVideoSrc] = useState(null)
  const returningFromProject = useRef(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowInstruction(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  // Manage content display timing relative to the clay expansion animation
  useEffect(() => {
    let timeoutId;
    if (isMenuOpen) {
      if (returningFromProject.current) {
        // If returning, show menu immediately so shared layout animations can tween back
        setShowMenuContent(true);
      } else {
        timeoutId = setTimeout(() => {
          setShowMenuContent(true)
        }, 1200) // Show content after clay fills the screen
      }
    } else {
      setShowMenuContent(false)
      returningFromProject.current = false // Reset so next menu open waits for clay
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    }
  }, [isMenuOpen])

  return (
    <div className="app-content" style={{ minHeight: '100vh', backgroundColor: '#fff', color: '#1a1a1a', position: 'relative' }}>
      <LayoutGroup id="app-routing">

        {/* Home section — always mounted, hidden when a project is active */}
        <motion.section 
          key="home"
          animate={{ opacity: activeProject ? 0 : 1 }}
          transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          style={{
            height: '100vh',
            width: '100%',
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            pointerEvents: activeProject ? 'none' : 'auto',
            visibility: activeProject ? 'hidden' : 'visible',
          }}
        >
            <InfiniteGallery
          images={images}
          speed={1.5}
          zSpacing={3}
          visibleCount={10}
          style={{ height: '100%', width: '100%' }}
          isPaused={!!activeProject}
        />

        {/* Center Hovering Logo & Text Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          zIndex: 10,
          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.75) 80%)'
        }}>
          <HoverBranding onTriggerMenu={() => setIsMenuOpen(true)} />
        </div>

        {/* Black Clay Expanding Animation */}
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9000,
          overflow: 'hidden'
        }}>
          <motion.div
            initial={false}
            animate={{ 
              scale: isMenuOpen ? 150 : 0,
              rotate: isMenuOpen ? 90 : 0,
              borderRadius: isMenuOpen 
                ? ['60% 40% 30% 70% / 60% 30% 70% 40%', '30% 70% 70% 30% / 30% 30% 70% 70%', '50% 50% 20% 80% / 25% 80% 20% 75%', '0%'] 
                : '60% 40% 30% 70% / 60% 30% 70% 40%'
            }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            style={{
              width: '60px',
              height: '50px',
              backgroundColor: '#000000',
              pointerEvents: 'none'
            }}
          />
        </div>

        {/* Full-Screen Projects Menu overlay */}
        <AnimatePresence>
          {showMenuContent && (
            <ProjectsMenu 
              skipAnimation={returningFromProject.current}
              onClose={() => setIsMenuOpen(false)} 
              onSelectProject={(proj, src) => {
                returningFromProject.current = false;
                setActiveProject(proj);
                setLastActiveProject(proj);
                setActiveVideoSrc(src);
              }} 
            />
          )}
        </AnimatePresence>

        {/* User Interaction Instructions Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 10,
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--text-secondary)',
          pointerEvents: 'none'
        }}>
          <p style={{ margin: 0, opacity: 0.8 }}>Scroll or swipe to explore the gallery</p>
        </div>
      </motion.section>

        {/* Project details — layered on top */}
        <AnimatePresence>
          {activeProject && (
            <motion.section 
              key="project-details"
              initial={false}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
              style={{ position: 'absolute', inset: 0, zIndex: 100 }}
            >
              <FilmDetails 
                project={lastActiveProject} 
                videoSrc={activeVideoSrc} 
                onBack={() => {
                  returningFromProject.current = true;
                  setActiveProject(null);
                }} 
              />
            </motion.section>
          )}
        </AnimatePresence>

      </LayoutGroup>
    </div>
  )
}

export default App
