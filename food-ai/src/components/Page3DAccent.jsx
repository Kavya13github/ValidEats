// src/components/Page3DAccent.jsx
// Lightweight 3D accents for inner pages (a floating ring or icosahedron)
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Torus, Icosahedron, MeshDistortMaterial } from '@react-three/drei';

const VARIANTS = {
  ring:    { Component: 'ring',   color: '#D4AF37', emissive: '#8B6914' },
  health:  { Component: 'ico',    color: '#22C55E', emissive: '#14532D' },
  scan:    { Component: 'split',  color: '#60A5FA', emissive: '#1E3A5F' },
  profile: { Component: 'ring',   color: '#A78BFA', emissive: '#4C1D95' },
};

const SpinRing = ({ color, emissive }) => {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.4;
    ref.current.rotation.y = state.clock.elapsedTime * 0.6;
  });
  return (
    <Float speed={2} floatIntensity={2} rotationIntensity={0.4}>
      <Torus ref={ref} args={[1, 0.06, 12, 80]}>
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} emissive={emissive} emissiveIntensity={0.5} />
      </Torus>
      <Torus args={[0.65, 0.04, 12, 60]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} emissive={emissive} emissiveIntensity={0.3} transparent opacity={0.6} />
      </Torus>
    </Float>
  );
};

const SpinIco = ({ color, emissive }) => {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.3;
    ref.current.rotation.y = state.clock.elapsedTime * 0.5;
  });
  return (
    <Float speed={1.8} floatIntensity={1.5} rotationIntensity={0.5}>
      <Icosahedron ref={ref} args={[1, 0]}>
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.25} emissive={emissive} emissiveIntensity={0.4} wireframe />
      </Icosahedron>
      <Icosahedron args={[0.75, 0]}>
        <MeshDistortMaterial color={color} distort={0.2} speed={2} metalness={0.4} roughness={0.4} transparent opacity={0.5} emissive={emissive} emissiveIntensity={0.3} />
      </Icosahedron>
    </Float>
  );
};

const InnerScene = ({ variant }) => {
  const v = VARIANTS[variant] || VARIANTS.ring;
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]}   intensity={1.5} color={v.color} />
      <pointLight position={[-3, -3, 2]} intensity={0.8} color="#7C3AED" />
      {v.Component === 'ico'
        ? <SpinIco color={v.color} emissive={v.emissive} />
        : <SpinRing color={v.color} emissive={v.emissive} />
      }
    </>
  );
};

const Page3DAccent = ({ variant = 'ring', size = 180, className = '' }) => (
  <div className={`pointer-events-none ${className}`} style={{ width: size, height: size }}>
    <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} gl={{ alpha: true, antialias: true }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <InnerScene variant={variant} />
      </Suspense>
    </Canvas>
  </div>
);

export default Page3DAccent;
