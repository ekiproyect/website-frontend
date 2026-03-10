"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, ContactShadows } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/logo.glb");
  
  // 1. AGREGADO: rotation={[-Math.PI / 2, 0, 0]} para levantarlo
  return <primitive object={scene} scale={1.5} rotation={[Math.PI / 2, 0, 0]}/>;
}

export function Logo3D() {
  return (
    <div className="w-full h-[400px] lg:h-[550px] cursor-grab active:cursor-grabbing">
      
      {/* Ajusté un poco la cámara hacia atrás (z: 6) para que se vea bien completo */}
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        
        <Model />

        {/* 2. AGREGADO: La sombra circular en el piso */}
        <ContactShadows
          position={[0, -1.8, 0]} // Lo bajamos un poco para que quede bajo el logo
          opacity={0.4}           // Qué tan oscura es la sombra (0 a 1)
          scale={10}              // El tamaño del "plano" de la sombra
          blur={2}                // Qué tan borrosos son los bordes (más alto = más suave)
          far={4.5}               // Distancia máxima para detectar objetos
          resolution={256}        // Calidad de la sombra
          color="#000000"         // Color de la sombra
        />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={1.5}
          // Opcional: limita el ángulo vertical para que no puedan verlo desde muy abajo
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
      
    </div>
  );
}

useGLTF.preload("/logo.glb");