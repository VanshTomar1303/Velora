"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingBean() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.22;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1.4}>
        <torusKnotGeometry args={[0.8, 0.26, 180, 24]} />
        <MeshTransmissionMaterial
          color="#d4af37"
          thickness={0.6}
          roughness={0.08}
          transmission={0.9}
          ior={1.3}
          chromaticAberration={0.03}
          backside
        />
      </mesh>
    </Float>
  );
}

function CameraRig() {
  const { pointer, camera } = useThree();

  useFrame(() => {
    camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.03;
    camera.position.y += (pointer.y * 0.4 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function Scene() {
  const dpr = useMemo<[number, number]>(() => [1, 1.75], []);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 5.5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={40} color="#e8734a" />
      <pointLight position={[-4, -2, 2]} intensity={20} color="#d4af37" />
      <FloatingBean />
      <CameraRig />
      <Environment preset="city" />
    </Canvas>
  );
}
