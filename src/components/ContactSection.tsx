import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DiagonalMarqueeCarousel from './ui/diagonal-carousel';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <section id="contact" className="relative w-full min-h-[100dvh] bg-zinc-950 overflow-x-hidden flex justify-center items-center py-24 lg:py-32" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      {/* Background Component */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <DiagonalMarqueeCarousel fadeClassName="opacity-0" />
      </div>
      
      {/* Dark gradient overlay to ensure text legibility */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-zinc-950/60 via-zinc-950/20 to-transparent pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 mt-10 md:mt-20">
        
        {/* Left Column: Typography & Intent */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring', damping: 25 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 text-center lg:text-left lg:w-1/2 lg:pr-8"
        >
          <h2 
            className="text-5xl md:text-7xl lg:text-[6rem] uppercase tracking-widest text-white leading-[1.1]"
            style={{ fontFamily: 'var(--font-lostina)' }}
          >
            Let's build a<br />
            <span className="text-zinc-500 italic lowercase tracking-normal">story</span><br />
            together.
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed max-w-[45ch] mx-auto lg:mx-0">
            We'd love to hear from you. Drop us a line below and let's craft something memorable.
          </p>
        </motion.div>

        {/* Right Column: Modern Clean Form Panel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="w-[95%] md:w-full lg:w-1/2 max-w-2xl bg-white border-0 md:border-b-[4px] md:border-black relative flex flex-col gap-10 rounded-3xl mx-auto lg:mx-0"
          style={{ padding: 'clamp(2rem, 5vw, 4rem)' }}
        >
          <div className="flex flex-col gap-3 text-left border-b-2 border-black pb-6">
            <div className="text-3xl font-bold text-black tracking-tight uppercase" style={{ fontFamily: 'var(--font-body)' }}>Drop us a line</div>
            <p className="text-sm text-zinc-600 leading-relaxed font-normal">Fill out the form below and we'll get back to you as soon as possible.</p>
          </div>

          <motion.form 
            className="flex flex-col gap-8 relative z-10 w-full" 
            onSubmit={(e: React.FormEvent) => { e.preventDefault(); setIsSubmitting(true); setTimeout(() => setIsSubmitting(false), 2000); }}
          >
            
            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              <label htmlFor="name" className="text-xs text-black uppercase tracking-widest font-bold text-left" style={{ fontFamily: 'var(--font-body)' }}>Name</label>
              <input
                type="text"
                id="name"
                className="w-full bg-zinc-50 border-2 border-black rounded-xl text-black focus:outline-none focus:bg-white transition-all duration-300 placeholder:text-zinc-400 font-normal"
                placeholder="John Doe"
                style={{ fontFamily: 'var(--font-body)', padding: '1.25rem 1.5rem' }}
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              <label htmlFor="email" className="text-xs text-black uppercase tracking-widest font-bold text-left" style={{ fontFamily: 'var(--font-body)' }}>Email</label>
              <input
                type="email"
                id="email"
                className="w-full bg-zinc-50 border-2 border-black rounded-xl text-black focus:outline-none focus:bg-white transition-all duration-300 placeholder:text-zinc-400 font-normal"
                placeholder="hello@example.com"
                style={{ fontFamily: 'var(--font-body)', padding: '1.25rem 1.5rem' }}
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              <label htmlFor="message" className="text-xs text-black uppercase tracking-widest font-bold text-left" style={{ fontFamily: 'var(--font-body)' }}>Message</label>
              <textarea
                id="message"
                className="w-full bg-zinc-50 border-2 border-black rounded-xl text-black focus:outline-none focus:bg-white transition-all duration-300 resize-y min-h-[160px] placeholder:text-zinc-400 font-normal"
                placeholder="Tell us about your project..."
                style={{ fontFamily: 'var(--font-body)', padding: '1.25rem 1.5rem', lineHeight: '1.6' }}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
              />
            </motion.div>

            <motion.button
              variants={itemVariants}
              type="submit"
              className="mt-6 w-full bg-white text-black border-2 border-black rounded-xl hover:bg-zinc-100 active:scale-[0.98] transition-all duration-300 flex justify-center items-center cursor-pointer py-5"
              style={{ fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 'bold', fontSize: '0.875rem' }}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
