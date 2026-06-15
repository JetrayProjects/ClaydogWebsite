import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import MarqueeCarousel from './MarqueeCarousel';
import CreditsCarousel from './CreditsCarousel';

// Placeholder data for testing
const placeholderStills = [
  '/landing_page/Additional PHOTOGRAPHY /000052.webp',
  '/landing_page/Additional PHOTOGRAPHY /000057.webp',
  '/landing_page/Additional PHOTOGRAPHY /000059.webp',
  '/landing_page/Additional PHOTOGRAPHY /000064.webp',
  '/landing_page/Additional PHOTOGRAPHY /000065.webp',
  '/landing_page/Additional PHOTOGRAPHY /000072.webp',
  '/landing_page/Additional PHOTOGRAPHY /_DSF3875.webp',
  '/landing_page/Additional PHOTOGRAPHY /_DSF3943.webp',
];

const placeholderCredits = [
  { role: 'Director', name: 'John Doe' },
  { role: 'Producer', name: 'Jane Smith' },
  { role: 'Director of Photography', name: 'Alice Johnson' },
  { role: 'Editor', name: 'Bob Williams' },
  { role: 'Production Designer', name: 'Charlie Brown' },
  { role: 'Costume Designer', name: 'Diana Davis' },
  { role: 'Original Music', name: 'Eve Evans' },
  { role: 'Sound Design', name: 'Frank Ford' },
];

const FilmDetails = ({ project, videoSrc, onBack }) => {
  useEffect(() => {
    // Scroll to top when mounted
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ backgroundColor: '#000' }}
      animate={{ backgroundColor: '#fff' }}
      exit={{ backgroundColor: '#000', transition: { duration: 0.3 } }}
      transition={{ duration: 1, delay: 0.45, ease: [0.33, 1, 0.68, 1] }}
      style={{ 
        minHeight: '100vh', 
        width: '100%', 
        color: '#000', 
        padding: '4rem 2rem',
        overflowX: 'hidden'
      }}
    >
      {/* Top Section: Hero (2 Columns) */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '2rem',
        maxWidth: '1600px',
        margin: '0 auto',
        paddingBottom: '4rem'
      }}>
        
        {/* Desktop Layout Uses Grid, Mobile Uses Flex Column */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
          
          {/* Left Column */}
          <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}>
            
            {/* Back Button */}
            <motion.button 
              onClick={onBack}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'none',
                border: 'none',
                color: '#000',
                cursor: 'pointer',
                padding: '0 0 2rem 0',
                fontFamily: '"Syne", var(--font-body), sans-serif',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to Menu
            </motion.button>

            {/* Title with Shared Layout ID */}
            <motion.h1 
              layoutId={`project-title-${project}`}
              initial={{ color: '#e0e0e0' }}
              animate={{ color: '#000' }}
              exit={{ color: '#e0e0e0' }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
              style={{
                fontFamily: 'var(--font-hand)',
                fontSize: '6rem',
                lineHeight: '1',
                margin: '0 0 2rem 0',
              }}
            >
              {project}
            </motion.h1>

            {/* About the film */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.55, ease: [0.33, 1, 0.68, 1] }}
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '1.1rem',
                lineHeight: '1.6',
                color: '#333'
              }}
            >
              {(() => {
                const normalized = (project || '').toLowerCase().trim();
                if (normalized === 'on the back burner') {
                  return (
                    <>
                      <p style={{ marginBottom: '1rem' }}>
                        On the Backburner is a slow, intimate drama that follows two immigrant friends in the UK as they drift through conversations about work, dreams, and displacement.
                      </p>
                      <p>
                        Beneath their casual exchanges lies the quiet anxiety of survival, visas, instability, and the fear of being sent back. As tensions rise between responsibility and desire, the film captures the emotional limbo of putting one’s life “on hold” in a foreign land.
                      </p>
                    </>
                  );
                }
                if (normalized === 'the blade and the butterfly') {
                  return (
                    <>
                      <p style={{ marginBottom: '1rem' }}>
                        The Blade and the Butterfly is a thriller centered on Sonia, a ballet dancer whose life is upended when she is kidnapped by gangsters from her instructor Andre’s criminal past. Andre, a former member of "The Krows," attempts to rescue her from his former associate, Kevin, but is brutally defeated in a violent confrontation.
                      </p>
                      <p style={{ marginBottom: '1rem' }}>
                        The film reaches its climax as Sonia finds her own strength to fight back, with her life-or-death struggle in an abandoned nightclub mirrored through flash-forwards to her graceful "Birth of the Butterfly" stage performance.
                      </p>
                      <p>
                        Ultimately, Sonia uses her agility and a final act of violence to defeat Kevin and secure her survival.
                      </p>
                    </>
                  );
                }
                return (
                  <>
                    <p style={{ marginBottom: '1rem' }}>
                      This is a placeholder description for {project}. It explores the profound themes of human connection, isolation, and the relentless passage of time.
                    </p>
                    <p>
                      Shot on location with a dedicated crew, the visual storytelling relies heavily on natural light and intimate character moments to convey a narrative that is both personal and universal.
                    </p>
                  </>
                );
              })()}
            </motion.div>
          </div>

          {/* Right Column: Video Player */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
             transition={{ duration: 0.5, delay: 0.6, ease: [0.33, 1, 0.68, 1] }}
             style={{ flex: '2 1 600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <div style={{
                width: '100%',
                aspectRatio: '16/9',
                backgroundColor: '#f0f0f0',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}>
                {videoSrc ? (
                  <video 
                    src={videoSrc} 
                    controls 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                    Video Player Placeholder
                  </div>
                )}
             </div>
          </motion.div>
        </div>
      </div>

      {/* Middle Section: Stills (Dual Carousels) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.7, ease: [0.33, 1, 0.68, 1] }}
        style={{ marginBottom: '4rem', maxWidth: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
        <h2 style={{ 
          fontFamily: '"Syne", sans-serif', 
          fontSize: '2rem', 
          textAlign: 'center', 
          marginBottom: '2rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          Stills
        </h2>
        
        {/* Row 1: Left to Right */}
        <MarqueeCarousel images={placeholderStills} reverse={false} />
        
        {/* Row 2: Right to Left */}
        <MarqueeCarousel images={placeholderStills} reverse={true} />
      </motion.div>

      {/* Bottom Section: Credits */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.8, ease: [0.33, 1, 0.68, 1] }}
        style={{ maxWidth: '1600px', margin: '0 auto', paddingBottom: '4rem' }}>
        <h2 style={{ 
          fontFamily: '"Syne", sans-serif', 
          fontSize: '2rem', 
          textAlign: 'center', 
          marginBottom: '2rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          Credits
        </h2>
        <CreditsCarousel credits={placeholderCredits} />
      </motion.div>

    </motion.div>
  );
};

export default FilmDetails;
