import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import MarqueeCarousel from './MarqueeCarousel';
import CreditsCarousel from './CreditsCarousel';
import { getProjectById } from '../../../lib/data';

const placeholderCredits = [
  { role: 'Director', name: 'Kushal Dhingra' },
  { role: 'Cinematographer', name: 'Kushal Dhingra' },
];

const FilmDetails = ({ project, videoSrc, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projObj = typeof project === 'object' && project !== null
    ? project
    : (typeof project === 'string' ? getProjectById(project) : null);

  const title = projObj?.title || (typeof project === 'string' ? project : 'Project');
  const role = projObj?.role;
  const aboutParagraphs = projObj?.about || [];
  const youtubeUrl = projObj?.youtubeUrl;
  const activeVideo = projObj?.video || videoSrc;
  const stills = (projObj?.stills && projObj.stills.length > 0) 
    ? projObj.stills 
    : (projObj?.poster ? [projObj.poster] : []);

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

            {/* Title */}
            <motion.h1 
              layoutId={`project-title-${title}`}
              initial={{ color: '#e0e0e0' }}
              animate={{ color: '#000' }}
              exit={{ color: '#e0e0e0' }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
              style={{
                fontFamily: 'var(--font-lostina)',
                fontSize: '4.5rem',
                lineHeight: '1.1',
                margin: '0 0 1rem 0',
              }}
            >
              {title}
            </motion.h1>

            {role && (
              <p style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: '1.2rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#666',
                marginBottom: '2rem'
              }}>
                {role}
              </p>
            )}

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
              {aboutParagraphs.length > 0 ? (
                aboutParagraphs.map((para, idx) => (
                  <p key={idx} style={{ marginBottom: '1rem' }}>{para}</p>
                ))
              ) : (
                <p>Intimate visual narrative by Claydog Media.</p>
              )}
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
                backgroundColor: '#000',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}>
                {youtubeUrl ? (
                  <iframe 
                    src={youtubeUrl} 
                    title={title}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : activeVideo ? (
                  <video 
                    src={activeVideo} 
                    controls 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                    Media preview unavailable
                  </div>
                )}
             </div>
          </motion.div>
        </div>
      </div>

      {/* Middle Section: Stills (Dual Carousels) */}
      {stills.length > 0 && (() => {
        const displayStills = stills.slice(0, 16);
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease: [0.33, 1, 0.68, 1] }}
            style={{ marginBottom: '4rem', maxWidth: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
            <h2 style={{ 
              fontFamily: 'var(--font-lostina)', 
              fontSize: '2.5rem', 
              textAlign: 'center', 
              marginBottom: '2rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              Stills
            </h2>
            
            <MarqueeCarousel images={displayStills} reverse={false} />
            {displayStills.length > 3 && (
              <MarqueeCarousel images={displayStills} reverse={true} />
            )}
          </motion.div>
        );
      })()}

      {/* Bottom Section: Credits */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.8, ease: [0.33, 1, 0.68, 1] }}
        style={{ maxWidth: '1600px', margin: '0 auto', paddingBottom: '4rem' }}>
        <h2 style={{ 
          fontFamily: 'var(--font-lostina)', 
          fontSize: '2.5rem', 
          textAlign: 'center', 
          marginBottom: '2rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          Credits
        </h2>
        <CreditsCarousel credits={role ? [{ role: role, name: 'Kushal Dhingra' }] : placeholderCredits} />
      </motion.div>

    </motion.div>
  );
};

export default FilmDetails;
