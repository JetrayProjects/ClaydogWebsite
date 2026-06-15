import React from 'react';

const CreditsCarousel = ({ credits }) => {
  return (
    <div className="credits-marquee-container" style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100%', padding: '40px 0', borderTop: '1px solid #eaeaea', transform: 'translateZ(0)' }}>
       <style>
        {`
          .credits-marquee-content {
            display: inline-flex;
            gap: 60px;
            animation: scroll-credits 40s linear infinite;
            will-change: transform;
            transform: translateZ(0);
          }
          .credits-marquee-container:hover .credits-marquee-content {
            animation-play-state: paused;
          }
          @keyframes scroll-credits {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
        `}
      </style>
      <div className="credits-marquee-content">
        {[...credits, ...credits, ...credits].map((credit, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>{credit.role}</span>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{credit.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreditsCarousel;
