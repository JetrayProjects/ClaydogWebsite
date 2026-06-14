import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const navItems = ['Films', 'Advertisement', 'Gallery', 'About Us']
  const [isMobile, setIsMobile] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <nav style={styles.nav}>
      <div className="fluid-container" style={styles.container}>
        <div style={styles.logoContainer}>
          <img 
            src="/logo.png" 
            alt="Claydog Media" 
            style={styles.logo} 
          />
          <span style={styles.brandName}>Claydog Media</span>
        </div>

        {isMobile ? (
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              style={styles.hamburger}
              aria-label="Toggle menu"
            >
              <span style={{ ...styles.hamburgerLine, transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
              <span style={{ ...styles.hamburgerLine, opacity: menuOpen ? 0 : 1 }}></span>
              <span style={{ ...styles.hamburgerLine, transform: menuOpen ? 'rotate(-45deg) translate(6px, -7px)' : 'none' }}></span>
            </button>
            
            <AnimatePresence>
              {menuOpen && (
                <motion.ul 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  style={styles.mobileMenu}
                >
                  {navItems.map((item) => (
                    <li key={item} style={styles.mobileMenuItem}>
                      <a 
                        href={`#${item.toLowerCase().replace(' ', '')}`} 
                        onClick={() => setMenuOpen(false)}
                        style={styles.link}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <ul style={styles.menu}>
            {navItems.map((item) => (
              <motion.li 
                key={item}
                whileHover={{ scale: 1.05, y: -2 }}
                style={styles.menuItem}
              >
                <a href={`#${item.toLowerCase().replace(' ', '')}`} style={styles.link}>
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '0 1.5rem',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  logo: {
    height: '36px',
    width: 'auto',
    objectFit: 'contain',
  },
  brandName: {
    fontFamily: 'var(--font-hand)',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#000',
  },
  menu: {
    display: 'flex',
    listStyle: 'none',
    gap: '2rem',
  },
  menuItem: {
    fontFamily: 'var(--font-hand)',
    fontSize: '1rem',
  },
  link: {
    textDecoration: 'none',
    color: 'var(--text-primary)',
    fontWeight: '500',
    display: 'block',
    padding: '0.5rem 0',
  },
  hamburger: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '24px',
    height: '18px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    zIndex: 1001,
  },
  hamburgerLine: {
    width: '100%',
    height: '2px',
    backgroundColor: '#000',
    transition: 'all 0.3s ease',
    transformOrigin: 'left center',
  },
  mobileMenu: {
    position: 'absolute',
    top: '40px',
    right: '0',
    backgroundColor: '#ffffff',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    padding: '1rem 1.5rem',
    listStyle: 'none',
    minWidth: '180px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    zIndex: 1000,
    border: '1px solid rgba(0,0,0,0.05)',
  },
  mobileMenuItem: {
    fontFamily: 'var(--font-hand)',
    fontSize: '1.1rem',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    paddingBottom: '0.25rem',
  }
}

export default Navbar
