import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function GamesComingSoon() {
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    // Lock in the glow/sweep after letters assemble (around 2 seconds)
    const timer = setTimeout(() => {
      setIsLocked(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const textLines = [
    { text: "GAMES", delay: 0 },
    { text: "COMING SOON", delay: 0.4 }
  ];

  // Variations for the letters gathering from digital fragments
  const letterVariants = {
    hidden: (custom) => ({
      opacity: 0,
      x: custom.x,
      y: custom.y,
      scale: custom.scale,
      rotate: custom.rotate,
      filter: "blur(12px)",
    }),
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 70,
        delay: custom.delay,
      }
    })
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 2.2 // Fade in after title locks in
      }
    }
  };

  // Helper to generate random starting state for each letter fragment
  const getFragmentStyle = (charIdx, lineIdx, baseDelay) => {
    const randomRange = (min, max) => Math.random() * (max - min) + min;
    return {
      x: randomRange(-80, 80),
      y: randomRange(-150, -50),
      scale: randomRange(0.3, 1.8),
      rotate: randomRange(-45, 45),
      delay: baseDelay + (charIdx * 0.06) + randomRange(0, 0.15)
    };
  };

  return (
    <div 
      className="overlay-content"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          maxWidth: '90%',
          width: '650px',
        }}
      >
        {/* GAMES COMING SOON Title */}
        <h1 
          className={isLocked ? "pulse-glow" : ""}
          style={{
            fontFamily: "'HK Modular', 'Orbitron', sans-serif",
            fontSize: 'min(8.5vw, 55px)',
            fontWeight: '900',
            letterSpacing: '8px',
            color: '#FFFFFF',
            textTransform: 'uppercase',
            lineHeight: '1.2',
            margin: '0 0 24px 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textShadow: '0 0 10px rgba(67, 164, 60, 0.2)'
          }}
        >
          {textLines.map((line, lineIdx) => {
            let charCounter = 0;
            return (
              <span 
                key={lineIdx} 
                style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  justifyContent: 'center',
                  width: '100%'
                }}
              >
                {line.text.split(" ").map((word, wordIdx) => (
                  <React.Fragment key={wordIdx}>
                    {wordIdx > 0 && <span style={{ display: 'inline-block', width: '0.35em' }}> </span>}
                    <span style={{ display: 'inline-flex', whiteSpace: 'nowrap' }}>
                      {word.split("").map((char) => {
                        const charIdx = charCounter++;
                        const customStyle = getFragmentStyle(charIdx, lineIdx, line.delay);
                        return (
                          <motion.span
                            key={charIdx}
                            custom={customStyle}
                            variants={letterVariants}
                            initial="hidden"
                            animate="visible"
                            className={isLocked ? "sweep-text" : ""}
                            style={{ 
                              display: 'inline-block',
                              textShadow: isLocked 
                                ? 'none'
                                : '0 0 8px rgba(67, 164, 60, 0.5)'
                            }}
                          >
                            {char}
                          </motion.span>
                        );
                      })}
                    </span>
                  </React.Fragment>
                ))}
              </span>
            );
          })}
        </h1>

        {/* Descriptive Subtitle */}
        <motion.p
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'min(4.2vw, 15px)',
            fontWeight: '200',
            letterSpacing: '1.5px',
            color: 'rgba(255, 255, 255, 0.75)',
            lineHeight: '1.7',
            maxWidth: '480px',
            textShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
            padding: '0 10px'
          }}
        >
          Get ready for exciting challenges, competitions, and surprises.
        </motion.p>
      </div>
    </div>
  );
}
