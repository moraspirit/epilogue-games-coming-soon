import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

// A single moving tunnel segment
function TunnelSegment({ index, totalSegments, segmentLength, speed }) {
  const groupRef = useRef();

  // Calculate initial Z position
  const initialZ = -index * segmentLength;

  // Create rings inside this segment
  const rings = useMemo(() => {
    const arr = [];
    const numRings = 3; // 3 rings per segment
    for (let i = 0; i < numRings; i++) {
      arr.push({
        z: - (i * (segmentLength / numRings)),
        // Vary rotation speed or phase slightly
        phase: Math.random() * Math.PI
      });
    }
    return arr;
  }, [segmentLength]);

  // Create some floating geometric elements inside/outside the tunnel
  const shapes = useMemo(() => {
    const arr = [];
    const numShapes = 4;
    for (let i = 0; i < numShapes; i++) {
      const radius = 3.5;
      const angle = (i / numShapes) * Math.PI * 2;
      arr.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: -Math.random() * segmentLength,
        scale: 0.15 + Math.random() * 0.25,
        type: Math.random() > 0.5 ? 'octahedron' : 'dodecahedron',
        rotSpeed: [
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5
        ]
      });
    }
    return arr;
  }, [segmentLength]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Move segment towards the camera (positive Z direction)
    groupRef.current.position.z += speed * delta;

    // Wrap segment back to the far end if it passes behind the camera
    const maxZ = 15; // wrap threshold
    const totalLength = totalSegments * segmentLength;
    if (groupRef.current.position.z > maxZ) {
      groupRef.current.position.z -= totalLength;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, initialZ]}>
      {/* Main wireframe cylinder tunnel wall */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -segmentLength / 2]}>
        <cylinderGeometry args={[5, 5, segmentLength, 12, 6, true]} />
        <meshBasicMaterial
          color="#193118"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Outer glowing wireframe rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -segmentLength / 2]}>
        <cylinderGeometry args={[5.05, 5.05, segmentLength, 12, 6, true]} />
        <meshBasicMaterial
          color="#2a6c24"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Neon Light Rings */}
      {rings.map((ring, idx) => (
        <mesh key={idx} position={[0, 0, ring.z]}>
          <torusGeometry args={[4.9, 0.05, 8, 36]} />
          <meshBasicMaterial color="#43a43c" />
        </mesh>
      ))}

      {/* Floating Geometric Wireframes */}
      {shapes.map((shape, idx) => (
        <FloatingShape key={idx} shape={shape} />
      ))}
    </group>
  );
}

// Sub-component for floating geometry in the tunnel
function FloatingShape({ shape }) {
  const ref = useRef();

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += shape.rotSpeed[0] * delta;
    ref.current.rotation.y += shape.rotSpeed[1] * delta;
    ref.current.rotation.z += shape.rotSpeed[2] * delta;
  });

  return (
    <mesh
      ref={ref}
      position={[shape.x, shape.y, shape.z]}
      scale={[shape.scale, shape.scale, shape.scale]}
    >
      {shape.type === 'octahedron' ? (
        <octahedronGeometry args={[1, 0]} />
      ) : (
        <dodecahedronGeometry args={[1, 0]} />
      )}
      <meshBasicMaterial color="#43a43c" wireframe />
    </mesh>
  );
}

// Energy rings moving independently along the center of the tunnel
function EnergyRings() {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Animate scale and rotation of central energy rings
    groupRef.current.children.forEach((child, index) => {
      const offset = index * Math.PI * 0.3;
      child.rotation.z = time * 0.2 * (index % 2 === 0 ? 1 : -1) + offset;

      // Slight scale pulsation
      const pulse = 1 + Math.sin(time * 2 + offset) * 0.05;
      child.scale.set(pulse, pulse, 1);
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, -10]}>
      {/* Central Ring 1 */}
      <mesh position={[0, 0, -5]}>
        <torusGeometry args={[3, 0.02, 6, 24]} />
        <meshBasicMaterial color="#2a6c24" transparent opacity={0.6} />
      </mesh>
      {/* Central Ring 2 */}
      <mesh position={[0, 0, -15]}>
        <torusGeometry args={[2.5, 0.02, 6, 24]} />
        <meshBasicMaterial color="#193118" transparent opacity={0.4} />
      </mesh>
      {/* Central Ring 3 */}
      <mesh position={[0, 0, -25]}>
        <torusGeometry args={[2.0, 0.02, 6, 24]} />
        <meshBasicMaterial color="#193118" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

// Scene setup with camera animation, lighting, particles, and post-processing
export default function CyberTunnel({ children }) {
  const totalSegments = 6;
  const segmentLength = 15;
  const speed = 4.0; // speed at which tunnel moves

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 65, near: 0.1, far: 80 }}
        gl={{ antialias: false }} // postprocessing deals with AA
      >
        <color attach="background" args={['#0a0c09']} />

        {/* Soft volumetric green fog that hides the far boundary of the tunnel */}
        <fogExp2 attach="fog" color="#0a0c09" density={0.035} />

        <ambientLight color="#193118" intensity={0.5} />

        {/* Cinematic volumetric lighting from front and center */}
        <pointLight position={[0, 0, 2]} intensity={2.0} color="#43a43c" distance={15} decay={2} />
        <pointLight position={[0, 0, -15]} intensity={1.5} color="#2a6c24" distance={30} decay={2} />

        {/* Moving Tunnel Segments */}
        <group>
          {Array.from({ length: totalSegments }).map((_, idx) => (
            <TunnelSegment
              key={idx}
              index={idx}
              totalSegments={totalSegments}
              segmentLength={segmentLength}
              speed={speed}
            />
          ))}
        </group>

        {/* Central Independent Energy Rings */}
        <EnergyRings />

        {/* Children components like dynamic particle systems */}
        {children}

        {/* Post-processing: Bloom, Chromatic Aberration, Vignette */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.15}
            luminanceSmoothing={0.7}
            intensity={1.2}
            mipmapBlur
          />
          <ChromaticAberration
            offset={new THREE.Vector2(0.001, 0.001)}
          />
          <Vignette
            eskil={false}
            offset={0.2}
            darkness={1.2}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
