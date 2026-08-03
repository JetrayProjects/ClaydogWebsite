import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const teamData = [
  {
    id: 1,
    name: 'Kushal Dhingra',
    position: 'Co-founder & Visual Director',
    description: "I'm a storyteller drawn to ideas that make people feel something.",
    image: '/team/person1.png',
  },
  {
    id: 2,
    name: 'Casper Galbraith',
    position: 'Co-founder & Executive Producer',
    description: 'I turn ambitious ideas into impactful brands and stories combining creative vision with strategic execution to build work that resonates and grows.',
    image: '/team/person2.png',
  },
  {
    id: 3,
    name: 'Joseph Olanlokun',
    position: 'Co-Founder & Visual Artist',
    description: 'I’m an artist that uses mixed media, animation and camera techniques to tell stories.',
    image: '/team/person3.png',
  },
];

export default function TeamSection() {
  const [activePerson, setActivePerson] = useState(null);

  return (
    <section style={{
      width: '100%',
      padding: '4rem 2rem',
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      zIndex: 10,
    }}>
      <h2 
        className="text-3xl md:text-5xl lg:text-6xl tracking-widest uppercase text-black bg-transparent leading-none text-center"
        style={{ fontFamily: 'var(--font-lostina)', marginBottom: '3rem' }}
      >
        Team
      </h2>

      <div 
        style={{
          width: '100%',
          maxWidth: '700px',
          position: 'relative',
          userSelect: 'none',
        }}
        onMouseLeave={() => setActivePerson(null)}
      >
        {/* IMAGE CONTAINER */}
        <div style={{ width: '100%', position: 'relative' }}>
          {/* Base Image */}
          <motion.img
            src="/team/base.jpeg"
            alt="Claydog Team"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
            animate={{
              filter: activePerson !== null ? 'brightness(0.6)' : 'brightness(1)',
            }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          />

          {/* Dark Overlay */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: '#000',
              pointerEvents: 'none',
              zIndex: 1,
            }}
            animate={{
              opacity: activePerson !== null ? 0.5 : 0,
            }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          />

          {/* Cutout Layers */}
          {teamData.map((person) => {
            const isActive = activePerson === person.id;
            return (
              <motion.img
                key={person.id}
                src={person.image}
                alt={person.name}
                style={{
                  position: 'absolute',
                  top: 0, left: 0, width: '100%', height: '100%',
                  objectFit: 'cover',
                  zIndex: isActive ? 3 : 2,
                  pointerEvents: 'none',
                }}
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  filter: isActive ? 'brightness(1.15)' : 'brightness(1)',
                }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              />
            );
          })}

          {/* Hit Zones */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex',
            zIndex: 10,
          }}>
            {teamData.map((person) => (
              <div
                key={`hit-${person.id}`}
                onMouseEnter={() => setActivePerson(person.id)}
                onClick={() => setActivePerson(person.id)}
                style={{
                  flex: 1,
                  height: '100%',
                  background: 'transparent',
                  cursor: 'pointer',
                }}
                aria-label={`View ${person.name}`}
              />
            ))}
          </div>
        </div>

        {/* INSTRUCTION TEXT */}
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'center' }}>
          <p className="hidden lg:block text-[0.65rem] uppercase tracking-[0.2em]" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
            Hover over text or face
          </p>
          <p className="block lg:hidden text-[0.65rem] uppercase tracking-[0.2em]" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
            Press on name
          </p>
        </div>

        {/* TEXT CONTAINER */}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '2rem',
          gap: '1rem',
        }}>
          {teamData.map((person) => {
            const isActive = activePerson === person.id;
            const isDimmed = activePerson !== null && !isActive;

            return (
              <div 
                key={`info-${person.id}`}
                onMouseEnter={() => setActivePerson(person.id)}
                onClick={() => setActivePerson(person.id)}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                <motion.h3
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    margin: 0,
                    color: 'var(--text-primary)',
                  }}
                  animate={{
                    opacity: isDimmed ? 0.3 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {person.name}
                </motion.h3>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        fontFamily: 'var(--font-body)',
                        marginTop: '0.5rem',
                        lineHeight: 1.4,
                      }}>
                        <p style={{
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          marginBottom: '0.25rem',
                        }}>
                          {person.position}
                        </p>
                        <p style={{
                          fontSize: '0.9rem',
                          color: 'var(--text-primary)',
                        }}>
                          {person.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
