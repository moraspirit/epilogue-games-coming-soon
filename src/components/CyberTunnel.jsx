import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function TunnelSegment({ index, totalSegments, segmentLength, speed }) {
  const groupRef = useRef();
  const initialZ = -index * segmentLength;

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const dt = Math.min(delta, 1 / 30);
    groupRef.current.position.z += speed * dt;

    const totalLength = totalSegments * segmentLength;
    if (groupRef.current.position.z > 12) {
      groupRef.current.position.z -= totalLength;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, initialZ]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -segmentLength / 2]}>
        <cylinderGeometry args={[5, 5, segmentLength, 8, 4, true]} />
        <meshBasicMaterial color="#2a6c24" wireframe transparent opacity={0.35} />
      </mesh>

      <mesh position={[0, 0, -segmentLength * 0.5]}>
        <torusGeometry args={[4.9, 0.04, 6, 16]} />
        <meshBasicMaterial color="#43a43c" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

export default function CyberTunnel({ children, segments = 4, dpr = 1.5 }) {
  const segmentLength = 18;
  const speed = 3.5;

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 65, near: 0.1, far: 70 }}
        dpr={dpr}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={['#0a0c09']} />
        <fog attach="fog" args={['#0a0c09', 8, 55]} />

        {Array.from({ length: segments }).map((_, idx) => (
          <TunnelSegment
            key={idx}
            index={idx}
            totalSegments={segments}
            segmentLength={segmentLength}
            speed={speed}
          />
        ))}

        {children}
      </Canvas>
    </div>
  );
}
