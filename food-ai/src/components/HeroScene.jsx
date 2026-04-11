// src/components/HeroScene.jsx
// React Three Fiber 3D scene for the home page hero
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Torus, Octahedron, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

/* ── Animated golden torus ring ── */
const GoldenRing = () => {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.4;
    ref.current.rotation.y += 0.006;
    ref.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.2;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.5}>
      <Torus ref={ref} args={[1.6, 0.08, 16, 120]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.9}
          roughness={0.1}
          emissive="#8B6914"
          emissiveIntensity={0.3}
        />
      </Torus>
    </Float>
  );
};

/* ── Inner glowing sphere ── */
const GlowSphere = () => {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.distort = 0.25 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.8}>
      <Sphere args={[0.95, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          ref={ref}
          color="#1a1408"
          metalness={0.3}
          roughness={0.6}
          distort={0.25}
          speed={2}
          transparent
          opacity={0.85}
          emissive="#D4AF37"
          emissiveIntensity={0.08}
        />
      </Sphere>
    </Float>
  );
};

/* ── Floating octahedron satellites ── */
const Satellite = ({ position, color, speed, scale = 1 }) => {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x += speed * 0.8;
    ref.current.rotation.y += speed;
    ref.current.rotation.z += speed * 0.5;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 2) * 0.3;
  });
  return (
    <Octahedron ref={ref} args={[0.18 * scale, 0]} position={position}>
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.4}
        transparent
        opacity={0.9}
      />
    </Octahedron>
  );
};

/* ── Full scene ── */
const Scene = () => {
  const groupRef = useRef();
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.3;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
  });

  return (
    <>
      <Stars radius={60} depth={30} count={800} factor={2} saturation={0} fade speed={0.6} />

      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]}   intensity={1.2} color="#D4AF37" />
      <pointLight position={[-5, -5, 3]} intensity={0.8} color="#7C3AED" />
      <pointLight position={[0, 5, -5]}  intensity={0.6} color="#3B82F6" />

      <group ref={groupRef}>
        <GoldenRing />
        <GlowSphere />

        <Satellite position={[ 2.4,  0.8, 0.5]} color="#D4AF37" speed={0.018} scale={1.3} />
        <Satellite position={[-2.6, -0.5, 0.3]} color="#A78BFA" speed={0.012} scale={1.0} />
        <Satellite position={[ 1.2, -1.8, 1.0]} color="#60A5FA" speed={0.022} scale={0.9} />
        <Satellite position={[-1.5,  1.9, 0.8]} color="#34D399" speed={0.016} scale={0.8} />
        <Satellite position={[ 2.8, -1.2, 0.2]} color="#F472B6" speed={0.014} scale={0.7} />
      </group>
    </>
  );
};

const HeroScene = () => (
  <Canvas
    className="absolute inset-0 pointer-events-none"
    style={{ zIndex: 1 }}
    camera={{ position: [0, 0, 6], fov: 50 }}
    gl={{ alpha: true, antialias: true }}
    dpr={[1, 1.5]}
  >
    <Scene />
  </Canvas>
);

export default HeroScene;
