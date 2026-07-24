import React, { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import InfiniteGallery from './components/ui/3d-gallery-photography'
import FilmDetails from './components/ui/FilmDetails'
import Work from '../lib/Work'
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

const HoverBranding = () => {
  const { progress, active } = useProgress()
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)

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
  const isMobile = windowWidth < 768

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        cursor: 'default',
        padding: '20px'
      }}
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
              fontFamily: 'var(--font-lostina)',
              fontSize: isMobile ? '5rem' : '6.5rem',
              lineHeight: '1',
              color: 'var(--text-primary)',
              textShadow: '0 1px 4px rgba(255,255,255,0.8)'
            }}>
              Claydog
            </span>
            <span style={{
              fontFamily: 'var(--font-lostina)',
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
  const [activeProject, setActiveProject] = useState(null)
  const [lastActiveProject, setLastActiveProject] = useState(null)
  const [activeVideoSrc, setActiveVideoSrc] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [activeProject])

  return (
    <div 
      className="app-content" 
      style={{ 
        minHeight: '100vh', 
        backgroundColor: '#fff', 
        color: '#1a1a1a', 
        position: 'relative' 
      }}
    >
      <LayoutGroup id="app-routing">
        <motion.section 
          key="home-and-menu"
          animate={{ opacity: activeProject ? 0 : 1 }}
          transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          style={{
            pointerEvents: activeProject ? 'none' : 'auto',
            visibility: activeProject ? 'hidden' : 'visible',
            backgroundColor: '#fff' // Keep hero bg white
          }}
        >
          {/* Hero Section Container */}
          <div style={{ 
            height: '100vh', 
            width: '100%', 
            position: 'relative'
          }}>
            {/* Fixed Background Gallery */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
              <InfiniteGallery
                images={images}
                speed={0.7}
                zSpacing={3}
                visibleCount={10}
                style={{ height: '100%', width: '100%' }}
                isPaused={!!activeProject}
              />
              {/* Global Wash Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.75) 80%)'
              }} />
            </div>

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
              zIndex: 10
            }}>
              <HoverBranding />
            </div>
          </div>

          {/* Work Accordion Section */}
          <div style={{ 
            backgroundColor: 'transparent', 
            minHeight: '100vh',
            position: 'relative',
            zIndex: 11
          }}>
            <Work 
              onSelectProject={(proj) => {
                setActiveProject(proj);
                setLastActiveProject(proj);
                setActiveVideoSrc(proj.video || '');
              }}
            />
          </div>

        </motion.section>

        {/* Project details — layered on top */}
        <AnimatePresence>
          {activeProject && (
            <motion.section 
              key="project-details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
              style={{ position: 'fixed', inset: 0, zIndex: 9999, overflowY: 'auto' }} // Added overflowY: auto to allow scrolling in film details
            >
              <FilmDetails 
                project={lastActiveProject} 
                videoSrc={activeVideoSrc} 
                onBack={() => {
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

