import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

interface OrbProps {
  color: string;
  intensity?: number;
}

const FloatingOrb = ({ color, intensity = 1 }: OrbProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 32, 32]} scale={1.2}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.1}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.3 * intensity}
      />
    </Sphere>
  );
};

interface MoodOrbProps {
  mood?: "neutral" | "happy" | "sad" | "frustrated";
  className?: string;
}

const MoodOrb = ({ mood = "neutral", className = "" }: MoodOrbProps) => {
  const moodColors = {
    neutral: "#2DD4BF", // Calming teal
    happy: "#F59E0B",   // Warm gold
    sad: "#6366F1",     // Soft blue
    frustrated: "#EF4444" // Orange red
  };

  const moodIntensity = {
    neutral: 1,
    happy: 1.5,
    sad: 0.7,
    frustrated: 1.3
  };

  return (
    <motion.div
      className={`w-64 h-64 mx-auto ${className}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        bounce: 0.4, 
        duration: 1.2,
        delay: 0.2 
      }}
    >
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 2, 2]} intensity={1} />
        <pointLight position={[-2, -2, -2]} intensity={0.5} color="#8B5CF6" />
        <FloatingOrb 
          color={moodColors[mood]} 
          intensity={moodIntensity[mood]}
        />
      </Canvas>
    </motion.div>
  );
};

export default MoodOrb;