import React from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section style={styles.hero}>
      <div className="fluid-container" style={styles.container}>
        <motion.div
          style={styles.content}
        >
          <h2 style={styles.subtitle}>Welcome to Claydog Media</h2>
          <h1 style={styles.title}>
            We tell stories <br />
            <span style={styles.highlight}>that move.</span>
          </h1>
          <p style={styles.description}>
            Films, Advertisement & Photography. <br />
            Crafted with a human touch.
          </p>
          <div style={styles.ctaContainer}>
            <button className="btn-primary">View our work</button>
            <button style={styles.btnSecondary}>About Us</button>
          </div>
        </motion.div>

        <motion.div
          style={styles.imageContainer}
        >
          <div style={styles.imageWrapper} className="rough-border">
            <img
              src="/assets/hero-bg.png"
              alt="Cinematic Set"
              style={styles.image}
              onLoad={() => console.log('Image loaded')}
              onError={(e) => console.error('Image failed to load', e.target.src)}
            />
          </div>
        </motion.div>
      </div>

      {/* Decorative handwriting element */}
      <motion.div
        animate={{
          rotate: [0, 5, 0, -5, 0],
          y: [0, 10, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={styles.floater}
      >
        <span style={styles.floaterText}>est. 2024</span>
      </motion.div>
    </section>
  )
}

const styles = {
  hero: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: '120px 0',
    backgroundColor: '#fff',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '4rem',
    width: '100%',
  },
  content: {
    flex: '1',
    zIndex: 10,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: 'var(--text-secondary)',
    marginBottom: '1rem',
    fontWeight: '300',
    fontFamily: 'var(--font-body)',
  },
  title: {
    fontSize: 'clamp(3rem, 8vw, 4.5rem)',
    lineHeight: '1.1',
    marginBottom: '2rem',
    fontFamily: 'var(--font-body)',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  highlight: {
    fontFamily: 'var(--font-hand)',
    color: 'var(--text-primary)',
    display: 'inline-block',
    marginTop: '0.5rem',
  },
  description: {
    fontSize: '1.1rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
    marginBottom: '2.5rem',
    maxWidth: '500px',
  },
  ctaContainer: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  btnSecondary: {
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontWeight: '500',
    borderBottom: '1px solid var(--text-primary)',
    paddingBottom: '2px',
  },
  imageContainer: {
    flex: '1.2',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  imageWrapper: {
    width: '100%',
    maxWidth: '600px',
    aspectRatio: '4/5',
    overflow: 'hidden',
    borderRadius: '8px',
    backgroundColor: '#f0f0f0', // Fallback color
    boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  floater: {
    position: 'absolute',
    bottom: '10%',
    left: '5%',
    opacity: 0.3,
    pointerEvents: 'none',
  },
  floaterText: {
    fontFamily: 'var(--font-hand)',
    fontSize: '2.5rem',
    transform: 'rotate(-10deg)',
    display: 'block',
    color: 'var(--text-primary)',
  }
}

export default Hero
