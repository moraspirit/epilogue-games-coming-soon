import React, { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import CyberTunnel from './components/CyberTunnel';
import FloatingParticles from './components/FloatingParticles';
import LogoReveal from './components/LogoReveal';
import GamesComingSoon from './components/GamesComingSoon';
import Footer from './components/Footer';
import { usePerformanceProfile } from './hooks/usePerformanceProfile';

export default function App() {
  const [scene, setScene] = useState('reveal');
  const speedRef = useRef(1.0);
  const { particleCount, tunnelSegments, dpr } = usePerformanceProfile();

  const handleLogoDissolve = () => {
    const start = performance.now();
    const duration = 1200;

    const accelerate = (time) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      speedRef.current = 1.0 + 7.0 * progress * progress;

      if (progress < 1) {
        requestAnimationFrame(accelerate);
      }
    };

    requestAnimationFrame(accelerate);
  };

  const handleTransitionComplete = () => {
    setScene('games');

    const start = performance.now();
    const duration = 2500;

    const decelerate = (time) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const t = 1 - progress;
      speedRef.current = 1.0 + 7.0 * t * t * t;

      if (progress < 1) {
        requestAnimationFrame(decelerate);
      }
    };

    requestAnimationFrame(decelerate);
  };

  return (
    <>
      <CyberTunnel segments={tunnelSegments} dpr={dpr}>
        <FloatingParticles count={particleCount} speedRef={speedRef} />
      </CyberTunnel>

      <div className="overlay-container">
        <AnimatePresence mode="wait">
          {scene === 'reveal' && (
            <LogoReveal
              key="reveal-scene"
              onLogoDissolve={handleLogoDissolve}
              onTransitionComplete={handleTransitionComplete}
            />
          )}

          {scene === 'games' && <GamesComingSoon key="games-scene" />}
        </AnimatePresence>
      </div>

      <Footer />
    </>
  );
}
