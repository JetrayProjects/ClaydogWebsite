import React, { useState } from 'react';
import ProjectCard from './ProjectCard';

const ProjectCarousel = ({ category, projects, videoMap, onSelectProject }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  if (!projects || projects.length === 0) return null;

  return (
    <div style={{ width: '100%', padding: '4rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{
        fontFamily: 'var(--font-lostina)',
        fontSize: '4rem',
        color: '#1a1a1a',
        marginBottom: '2rem',
        alignSelf: 'flex-start',
        marginLeft: '10%',
        position: 'relative',
        zIndex: 5
      }}>
        {category}
      </h2>

      <div style={{
        position: 'relative',
        width: '100%',
        height: '65vh',
        minHeight: '400px',
        maxHeight: '900px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Cards */}
        {projects.map((project, index) => {
          const isActive = index === currentIndex;
          // Determine relative positions for wrapping
          const dist = (index - currentIndex + projects.length) % projects.length;
          
          let isRight = false;
          let isLeft = false;

          if (projects.length === 2) {
            if (index !== currentIndex) {
              if (currentIndex === 0) {
                isRight = true;
              } else {
                isLeft = true;
              }
            }
          } else if (projects.length > 2) {
            isRight = dist === 1;
            isLeft = dist === projects.length - 1;
          }

          return (
            <ProjectCard
              key={project}
              project={project}
              videoSrc={videoMap[project]}
              isActive={isActive}
              isLeft={isLeft}
              isRight={isRight}
              onClick={() => {
                if (isActive) {
                  onSelectProject(project, videoMap[project]);
                } else if (isLeft) {
                  handlePrev();
                } else if (isRight) {
                  handleNext();
                }
              }}
            />
          );
        })}

        {/* Navigation Arrows */}
        {projects.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              style={{
                position: 'absolute',
                left: '5%',
                zIndex: 10,
                background: 'rgba(0,0,0,0.05)',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1a1a1a',
                cursor: 'pointer',
                backdropFilter: 'blur(4px)',
                transition: 'background 0.3s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              onClick={handleNext}
              style={{
                position: 'absolute',
                right: '5%',
                zIndex: 10,
                background: 'rgba(0,0,0,0.05)',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1a1a1a',
                cursor: 'pointer',
                backdropFilter: 'blur(4px)',
                transition: 'background 0.3s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectCarousel;
