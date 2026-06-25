import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import CyberTunnel from './components/CyberTunnel';
import FloatingParticles from './components/FloatingParticles';
import LogoReveal from './components/LogoReveal';
import GamesComingSoon from './components/GamesComingSoon';
import Footer from './components/Footer';

export default function App() {
  const [scene, setScene] = useState('reveal'); // 'reveal' | 'games'
  const [speedMultiplier, setSpeedMultiplier] = useState(1.0);

  // Transition Scene 1 -> Scene 2: Camera pushes forward (warp speed)
  const handleLogoDissolve = () => {
    const start = performance.now();
    const duration = 1200; // milliseconds
    
    const accelerate = (time) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease in quadratic: warp from 1.0x to 8.0x speed
      const currentSpeed = 1.0 + (7.0 * progress * progress);
      setSpeedMultiplier(currentSpeed);
      
      if (progress < 1) {
        requestAnimationFrame(accelerate);
      }
    };
    
    requestAnimationFrame(accelerate);
  };

  // Transition complete: switch scene to 'games' and decay speed back to normal
  const handleTransitionComplete = () => {
    setScene('games');
    
    const start = performance.now();
    const duration = 2500; // milliseconds
    
    const decelerate = (time) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic: decay from 8.0x back to 1.0x speed
      const t = 1 - progress;
      const currentSpeed = 1.0 + (7.0 * t * t * t);
      setSpeedMultiplier(currentSpeed);
      
      if (progress < 1) {
        requestAnimationFrame(decelerate);
      }
    };
    
    requestAnimationFrame(decelerate);
  };

  return (
    <>
      {/* 3D Cyberpunk Canvas Background */}
      <CyberTunnel>
        {/* Ambient background particles with animated speed multiplier */}
        <FloatingParticles count={650} speedMultiplier={speedMultiplier} />
      </CyberTunnel>

      {/* Cinematic HTML Overlay Container */}
      <div className="overlay-container">
        <AnimatePresence mode="wait">
          {scene === 'reveal' && (
            <LogoReveal 
              key="reveal-scene"
              onLogoDissolve={handleLogoDissolve}
              onTransitionComplete={handleTransitionComplete}
            />
          )}
          
          {scene === 'games' && (
            <GamesComingSoon key="games-scene" />
          )}
        </AnimatePresence>
      </div>

      {/* Persistent MoraSpirit Footer */}
      <Footer />
    </>
  );
}
