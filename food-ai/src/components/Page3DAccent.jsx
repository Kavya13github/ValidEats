// src/components/Page3DAccent.jsx
// Lightweight 3D accents — rings, nutrition mesh, bowl / snack abstractions
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Torus, Icosahedron, MeshDistortMaterial, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

const VARIANTS = {
  ring:    { Component: 'ring',   color: '#D4AF37', emissive: '#8B6914' },
  health:  { Component: 'ico',    color: '#22C55E', emissive: '#14532D' },
  scan:    { Component: 'split',  color: '#60A5FA', emissive: '#1E3A5F' },
  profile: { Component: 'ring',   color: '#A78BFA', emissive: '#4C1D95' },
  bowl:    { Component: 'bowl',   color: '#E2E8F0', emissive: '#334155' },
  snack:   { Component: 'snack',  color: '#D4AF37', emissive: '#713F12' },
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

/* Scan / lens — twin rings */
const SpinSplit = ({ color, emissive }) => {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * 0.35;
    ref.current.rotation.y = state.clock.elapsedTime * 0.5;
  });
  return (
    <Float speed={1.6} floatIntensity={1.6} rotationIntensity={0.35}>
      <group ref={ref}>
        <Torus args={[1, 0.05, 12, 64]} rotation={[Math.PI / 2.2, 0.3, 0]}>
          <meshStandardMaterial color={color} metalness={0.85} roughness={0.12} emissive={emissive} emissiveIntensity={0.45} />
        </Torus>
        <Torus args={[0.62, 0.04, 10, 48]} rotation={[Math.PI / 3, 0.8, 0.4]}>
          <meshStandardMaterial color={color} metalness={0.75} roughness={0.2} emissive={emissive} emissiveIntensity={0.25} transparent opacity={0.75} />
        </Torus>
      </group>
    </Float>
  );
};

/* Bowl + garnish orbs */
const SpinBowl = ({ color, emissive }) => {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.45;
  });
  return (
    <Float speed={1.5} floatIntensity={1.4} rotationIntensity={0.25}>
      <group ref={ref}>
        <Sphere args={[0.95, 36, 36]} scale={[1, 0.52, 1]} position={[0, -0.18, 0]}>
          <meshStandardMaterial
            color={color}
            metalness={0.45}
            roughness={0.38}
            emissive={emissive}
            emissiveIntensity={0.2}
            side={THREE.DoubleSide}
          />
        </Sphere>
        <Sphere args={[0.12, 12, 12]} position={[0.38, 0.22, 0.18]}>
          <meshStandardMaterial color="#22C55E" emissive="#052E16" emissiveIntensity={0.15} roughness={0.4} />
        </Sphere>
        <Sphere args={[0.1, 10, 10]} position={[-0.28, 0.18, -0.12]}>
          <meshStandardMaterial color="#EF4444" emissive="#450A0A" emissiveIntensity={0.12} roughness={0.45} />
        </Sphere>
        <Sphere args={[0.09, 10, 10]} position={[0.08, 0.28, -0.32]}>
          <meshStandardMaterial color="#EAB308" emissive="#422006" emissiveIntensity={0.1} roughness={0.5} />
        </Sphere>
      </group>
    </Float>
  );
};

/* Cracker / bar + ring */
const SpinSnack = ({ color, emissive }) => {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.25;
    ref.current.rotation.y = state.clock.elapsedTime * 0.55;
  });
  return (
    <Float speed={2} floatIntensity={1.8} rotationIntensity={0.45}>
      <group ref={ref}>
        <Box args={[0.95, 0.28, 0.95]} position={[0, -0.05, 0]}>
          <meshStandardMaterial color={color} metalness={0.25} roughness={0.55} emissive={emissive} emissiveIntensity={0.18} />
        </Box>
        <Torus args={[0.42, 0.09, 12, 40]} position={[0, 0.32, 0]} rotation={[0.2, 0.4, 0.1]}>
          <meshStandardMaterial color="#CA8A04" metalness={0.4} roughness={0.35} emissive="#713F12" emissiveIntensity={0.12} />
        </Torus>
      </group>
    </Float>
  );
};

const InnerScene = ({ variant }) => {
  const v = VARIANTS[variant] || VARIANTS.ring;
  const body = (() => {
    switch (v.Component) {
      case 'ico':    return <SpinIco color={v.color} emissive={v.emissive} />;
      case 'split':  return <SpinSplit color={v.color} emissive={v.emissive} />;
      case 'bowl':   return <SpinBowl color={v.color} emissive={v.emissive} />;
      case 'snack':  return <SpinSnack color={v.color} emissive={v.emissive} />;
      default:       return <SpinRing color={v.color} emissive={v.emissive} />;
    }
  })();
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]}   intensity={1.5} color={v.color} />
      <pointLight position={[-3, -3, 2]} intensity={0.8} color="#7C3AED" />
      {body}
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
