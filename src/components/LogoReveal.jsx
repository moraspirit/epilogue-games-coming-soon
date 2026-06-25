import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function LogoReveal({ onTransitionComplete, onLogoDissolve }) {
  const controls = useAnimation();

  useEffect(() => {
    const runTimeline = async () => {
      // 0s: Background loads (canvas renders immediately)
      
      // 4.5s: Full logo glow pulse triggers
      await new Promise(r => setTimeout(r, 4500));
      
      // Animate size scaling and intense green glow pulse
      await controls.start({
        scale: [1, 1.02, 1],
        filter: [
          "drop-shadow(0 0 0px rgba(67, 164, 60, 0))",
          "drop-shadow(0 0 20px rgba(67, 164, 60, 0.8))",
          "drop-shadow(0 0 0px rgba(67, 164, 60, 0))"
        ],
        transition: { duration: 0.5, ease: "easeInOut" }
      });
      
      // 5.0s: Dissolve into particles starts
      if (onLogoDissolve) {
        onLogoDissolve();
      }
      
      // Dissolve SVG/HTML overlay over 1.0s (blur out and fade to 0)
      await controls.start({
        opacity: 0,
        scale: 1.06,
        filter: "blur(12px) brightness(2.0)",
        transition: { duration: 1.0, ease: "easeIn" }
      });
      
      // 6.0s: GAMES COMING SOON forms
      onTransitionComplete();
    };
    
    runTimeline();
  }, [controls, onTransitionComplete, onLogoDissolve]);

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 }
  };

  // 1s -> Tagline fades in
  const taglineVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.9, ease: "easeOut", delay: 1.0 } 
    }
  };

  // 2s -> EPILOGUE outline draws (using inset clip-path sweep from left to right)
  const textSweepVariants = {
    hidden: { clipPath: "inset(0 100% 0 0)" },
    visible: {
      clipPath: "inset(0 0% 0 0)",
      transition: { duration: 1.0, ease: "easeInOut", delay: 2.0 }
    }
  };

  // 3s -> Underline sweeps (scaling X from left to right)
  const underlineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: { 
      scaleX: 1, 
      opacity: 1, 
      transition: { duration: 0.6, ease: "easeInOut", delay: 3.0 } 
    }
  };

  // 3.5s -> 26 appears (neon flicker)
  const numVariants = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: { 
      opacity: [0, 0.6, 0.1, 1, 0.7, 1],
      scale: 1,
      transition: { 
        duration: 0.7, 
        ease: "easeOut", 
        delay: 3.5,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1] 
      }
    }
  };

  return (
    <motion.div 
      className="overlay-content"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <motion.div 
        className="logo-wrapper"
        animate={controls}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '90%',
          maxWidth: '700px', // Exact width matching branding proportions
        }}
      >
        {/* Tagline */}
        <motion.div
          variants={taglineVariants}
          style={{
            fontFamily: "'HK Modular', 'Orbitron', sans-serif",
            fontSize: 'clamp(8px, 2.2vw, 13px)',
            fontWeight: '600',
            letterSpacing: '0.45em',
            color: '#FFFFFF',
            textTransform: 'uppercase',
            marginBottom: 'clamp(10px, 3.5vh, 22px)',
            textAlign: 'center',
            textShadow: '0 0 8px rgba(255, 255, 255, 0.35)',
            width: '100%',
          }}
        >
          A Night Of Musical Brilliance
        </motion.div>

        {/* Brand Text Row */}
        <motion.div
          variants={textSweepVariants}
          style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'baseline',
          }}
        >
          {/* EPILOGUE Glow Stroke Background */}
          <span
            style={{
              fontFamily: "'HK Modular', 'Orbitron', sans-serif",
              fontSize: 'clamp(2.5rem, 10vw, 6.6rem)',
              fontWeight: 'bold',
              letterSpacing: '0.08em',
              color: 'transparent',
              WebkitTextStroke: '2.5px #43a43c',
              filter: 'drop-shadow(0 0 8px rgba(67, 164, 60, 0.95)) drop-shadow(0 0 20px rgba(67, 164, 60, 0.5))',
              lineHeight: '1.0',
              textTransform: 'uppercase',
            }}
          >
            EPILOGUE
          </span>

          {/* EPILOGUE Sharp White Core Foreground */}
          <span
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              fontFamily: "'HK Modular', 'Orbitron', sans-serif",
              fontSize: 'clamp(2.5rem, 10vw, 6.6rem)',
              fontWeight: 'bold',
              letterSpacing: '0.08em',
              color: 'transparent',
              WebkitTextStroke: '1px #ffffff',
              lineHeight: '1.0',
              textTransform: 'uppercase',
              pointerEvents: 'none',
            }}
          >
            EPILOGUE
          </span>
        </motion.div>

        {/* Underline + 26 Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: 'clamp(8px, 2.5vh, 16px)',
          }}
        >
          {/* Glowing Energy Underline Rod */}
          <motion.div
            variants={underlineVariants}
            style={{
              flex: 1, // dynamically fills all empty space
              height: 'clamp(4px, 1.2vw, 8px)',
              background: 'linear-gradient(90deg, #2a6c24 0%, #43a43c 50%, #ffffff 70%, #43a43c 90%, #193118 100%)',
              boxShadow: '0 0 10px rgba(67, 164, 60, 0.8)',
              borderRadius: '4px',
              originX: 0, // sweeps from left to right
            }}
          />

          {/* Number 26 Wrapper (anchored on the right end) */}
          <motion.div
            variants={numVariants}
            className="neon-flicker"
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'baseline',
              marginLeft: 'clamp(12px, 3.5vw, 24px)', // precise spacing gap
              height: 'fit-content',
            }}
          >
            {/* Number 26 Glow Stroke Background */}
            <span
              style={{
                fontFamily: "'Astren', 'Orbitron', sans-serif",
                fontSize: 'clamp(1.5rem, 5.2vw, 3.5rem)',
                fontWeight: 'bold',
                color: 'transparent',
                WebkitTextStroke: '2.5px #43a43c',
                filter: 'drop-shadow(0 0 8px rgba(67, 164, 60, 0.95)) drop-shadow(0 0 15px rgba(67, 164, 60, 0.5))',
                lineHeight: '1.0',
              }}
            >
              26
            </span>

            {/* Number 26 Sharp White Core Foreground */}
            <span
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                fontFamily: "'Astren', 'Orbitron', sans-serif",
                fontSize: 'clamp(1.5rem, 5.2vw, 3.5rem)',
                fontWeight: 'bold',
                color: 'transparent',
                WebkitTextStroke: '1px #ffffff',
                lineHeight: '1.0',
                pointerEvents: 'none',
              }}
            >
              26
            </span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
