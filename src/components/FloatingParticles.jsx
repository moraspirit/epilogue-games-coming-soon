import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingParticles({ count = 600, speedMultiplier = 1.0 }) {
  const pointsRef = useRef();

  // Create random position, speed, and size details for each particle
  const [positions, speeds, phases, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const phs = new Float32Array(count);
    const scl = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Cylindrical distribution within the tunnel (radius up to 4.5, Z between 5 and -75)
      const radius = Math.random() * 4.5;
      const angle = Math.random() * Math.PI * 2;

      pos[i * 3] = Math.cos(angle) * radius;     // X
      pos[i * 3 + 1] = Math.sin(angle) * radius; // Y
      pos[i * 3 + 2] = -Math.random() * 80;       // Z

      spd[i] = 1.5 + Math.random() * 3.5;         // Individual forward speed (units/sec)
      phs[i] = Math.random() * Math.PI * 2;       // Phase for horizontal/vertical drift
      scl[i] = 0.04 + Math.random() * 0.07;       // Individual size scale
    }
    return [pos, spd, phs, scl];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const positionAttr = pointsRef.current.geometry.attributes.position;
    const array = positionAttr.array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      // Move particle forward (positive Z)
      array[idx + 2] += speeds[i] * speedMultiplier * delta;

      // Add elegant drifting wave movement on X and Y axis
      array[idx] += Math.sin(time * 0.5 + phases[i]) * 0.005;
      array[idx + 1] += Math.cos(time * 0.5 + phases[i]) * 0.005;

      // Wrap particles that travel behind the camera
      if (array[idx + 2] > 6) {
        array[idx + 2] = -75; // send back to depth

        // Re-randomize X and Y inside the tunnel radius
        const radius = Math.random() * 4.5;
        const angle = Math.random() * Math.PI * 2;
        array[idx] = Math.cos(angle) * radius;
        array[idx + 1] = Math.sin(angle) * radius;
      }
    }

    positionAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#43a43c"
        size={0.07}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
