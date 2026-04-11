// src/components/SiteAmbient3D.jsx
// Shared subtle 3D accents on every route — complements GlobalAmbientMotion + particles.
import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, TorusKnot, Octahedron } from '@react-three/drei';
import { useLocation } from 'react-router-dom';

const Rig = ({ children }) => {
  const ref = useRef();
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.045;
    ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.11) * 0.12;
  });
  return <group ref={ref}>{children}</group>;
};

const Scene = () => (
  <>
    <ambientLight intensity={0.35} />
    <directionalLight position={[6, 8, 4]} intensity={0.55} color="#F0D060" />
    <directionalLight position={[-5, -2, -3]} intensity={0.28} color="#60A5FA" />

    <Rig>
      <Float speed={0.55} rotationIntensity={0.12} floatIntensity={0.4}>
        <TorusKnot args={[0.55, 0.16, 96, 12]} position={[-3.2, 1.35, -2.8]}>
          <meshStandardMaterial
            color="#D4AF37"
            metalness={0.88}
            roughness={0.22}
            emissive="#5C4510"
            emissiveIntensity={0.12}
          />
        </TorusKnot>
      </Float>

      <Float speed={0.7} rotationIntensity={0.18} floatIntensity={0.55}>
        <Icosahedron args={[0.42, 1]} position={[3.35, -1.55, -2.4]}>
          <meshStandardMaterial
            color="#64748B"
            metalness={0.35}
            roughness={0.45}
            wireframe
            transparent
            opacity={0.55}
          />
        </Icosahedron>
      </Float>

      <Float speed={0.45} rotationIntensity={0.22} floatIntensity={0.5}>
        <Octahedron args={[0.28, 0]} position={[2.85, 2.05, -3.6]}>
          <meshStandardMaterial
            color="#A78BFA"
            metalness={0.75}
            roughness={0.25}
            emissive="#4C1D95"
            emissiveIntensity={0.15}
            transparent
            opacity={0.85}
          />
        </Octahedron>
      </Float>
    </Rig>
  </>
);

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return reduced;
};

const SiteAmbient3D = () => {
  const { pathname } = useLocation();
  const reduced = usePrefersReducedMotion();

  if (reduced) return null;

  const onHome = pathname === '/';
  const wrapClass = onHome
    ? 'opacity-[0.1] sm:opacity-[0.14]'
    : 'opacity-[0.26] sm:opacity-[0.34]';

  return (
    <div
      className={`site-ambient-3d fixed inset-0 z-[1] pointer-events-none ${wrapClass}`}
      aria-hidden="true"
    >
      <Canvas
        className="!absolute inset-0 h-full w-full"
        camera={{ position: [0, 0, 7.2], fov: 46 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
        dpr={[1, 1.35]}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SiteAmbient3D;
