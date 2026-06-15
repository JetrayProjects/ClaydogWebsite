import React from 'react';

const MarqueeCarousel = ({ images, reverse = false }) => {
  return (
    <div className="marquee-container" style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100%', padding: '10px 0', transform: 'translateZ(0)' }}>
       <style>
        {`
          .marquee-content {
            display: inline-flex;
            gap: 20px;
            animation: scroll 40s linear infinite;
            will-change: transform;
            transform: translateZ(0);
            backface-visibility: hidden;
            perspective: 1000px;
          }
          .marquee-content.reverse {
            animation: scroll-reverse 40s linear infinite;
          }
          .marquee-container:hover .marquee-content {
            animation-play-state: paused;
          }
          @keyframes scroll {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          @keyframes scroll-reverse {
            0% { transform: translate3d(-50%, 0, 0); }
            100% { transform: translate3d(0, 0, 0); }
          }
        `}
      </style>
      <div className={`marquee-content ${reverse ? 'reverse' : ''}`}>
        {/* Render twice for seamless loop */}
        {[...images, ...images].map((src, idx) => (
          <img 
            key={idx} 
            src={src} 
            alt="Film Still" 
            loading="lazy"
            decoding="async"
            style={{ 
              height: '250px', 
              width: 'auto', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              objectFit: 'cover',
              willChange: 'transform'
            }} 
            onClick={() => window.open(src, '_blank')} // Simple expand for now
          />
        ))}
      </div>
    </div>
  );
};

export default MarqueeCarousel;
