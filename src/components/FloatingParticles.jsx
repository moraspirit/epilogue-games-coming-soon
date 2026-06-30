import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingParticles({ count = 180, speedRef }) {
  const pointsRef = useRef();

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 4.2;
      const angle = Math.random() * Math.PI * 2;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = -Math.random() * 70;

      spd[i] = 2 + Math.random() * 2.5;
    }

    return { positions: pos, speeds: spd };
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    const dt = Math.min(delta, 1 / 30);
    const speedMultiplier = speedRef?.current ?? 1;
    const positionAttr = pointsRef.current.geometry.attributes.position;
    const array = positionAttr.array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      array[idx + 2] += speeds[i] * speedMultiplier * dt;

      if (array[idx + 2] > 6) {
        array[idx + 2] = -70;
        const radius = Math.random() * 4.2;
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
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#43a43c"
        size={0.09}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
