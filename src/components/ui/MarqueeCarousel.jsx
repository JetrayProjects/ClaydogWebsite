import React from 'react';

const getMobileSrc = (src) => {
  if (!src || typeof src !== 'string' || src.endsWith('-mobile.webp')) return src;
  if (src.endsWith('.webp')) return src.replace(/\.webp$/i, '-mobile.webp');
  return src;
};

const MarqueeCarousel = ({ images, reverse = false }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const displayImages = images || [];

  return (
    <div className="marquee-container" style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100%', padding: '10px 0' }}>
       <style>
        {`
          .marquee-content {
            display: inline-flex;
            gap: 20px;
            animation: scroll 40s linear infinite;
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
        {[...displayImages, ...displayImages].map((src, idx) => {
          const imgSrc = isMobile ? getMobileSrc(src) : src;
          return (
            <img 
              key={idx} 
              src={imgSrc} 
              alt="Film Still" 
              loading="lazy"
              decoding="async"
              style={{ 
                height: '250px', 
                width: 'auto', 
                borderRadius: '8px', 
                cursor: 'pointer', 
                objectFit: 'cover'
              }} 
              onClick={() => window.open(src, '_blank')}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MarqueeCarousel;
