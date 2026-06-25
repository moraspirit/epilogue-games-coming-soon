import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut", delay: 1.0 }}
      style={{
        position: 'fixed',
        bottom: 'min(4vh, 32px)',
        left: 0,
        width: '100%',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '260px', // Controlled width for a premium, compact layout
        }}
      >
        {/* Top glowing neon divider line */}
        <div 
          style={{
            width: '100%',
            height: '1.2px',
            background: 'linear-gradient(90deg, rgba(67, 164, 60, 0) 0%, rgba(67, 164, 60, 0.75) 50%, rgba(67, 164, 60, 0) 100%)',
            boxShadow: '0 0 6px rgba(67, 164, 60, 0.5)',
            marginBottom: '8px',
          }}
        />
        
        {/* Footer Branding Text */}
        <span
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '11px',
            fontWeight: '500',
            letterSpacing: '3.5px',
            color: 'rgba(255, 255, 255, 0.85)',
            textTransform: 'uppercase',
            textAlign: 'center',
            textShadow: '0 0 6px rgba(255, 255, 255, 0.15)',
            lineHeight: '1.2',
          }}
        >
          Organized by MoraSpirit
        </span>
        
        {/* Bottom glowing neon divider line */}
        <div 
          style={{
            width: '100%',
            height: '1.2px',
            background: 'linear-gradient(90deg, rgba(67, 164, 60, 0) 0%, rgba(67, 164, 60, 0.75) 50%, rgba(67, 164, 60, 0) 100%)',
            boxShadow: '0 0 6px rgba(67, 164, 60, 0.5)',
            marginTop: '8px',
          }}
        />
      </div>
    </motion.footer>
  );
}
