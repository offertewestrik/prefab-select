"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

type ProgressRef = React.MutableRefObject<number>;

/* Stage centres along the X axis of the pipeline */
const STAGE_X = [-8.5, -4.25, 0, 4.25, 8.5];

/* -------------------------------------------------------------------------- */
/*  Water flowing through the glass pipe (points travelling left → right)     */
/* -------------------------------------------------------------------------- */
function FlowParticles() {
  const count = 380;
  const ref = React.useRef<THREE.Points>(null);

  const { positions, speeds, offsets } = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const offsets = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = -10 + Math.random() * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      speeds[i] = 1.5 + Math.random() * 2.5;
      offsets[i] = Math.random() * Math.PI * 2;
    }
    return { positions, speeds, offsets };
  }, []);

  useFrame((state, delta) => {
    const pts = ref.current;
    if (!pts) return;
    const arr = pts.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      arr[i * 3] += speeds[i] * delta;
      if (arr[i * 3] > 10) arr[i * 3] = -10;
      arr[i * 3 + 1] = Math.sin(t * 2 + offsets[i]) * 0.18;
    }
    pts.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        color="#22d3ee"
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* -------------------------------------------------------------------------- */
/*  Glass pipe connecting all stages                                          */
/* -------------------------------------------------------------------------- */
function Pipe() {
  return (
    <mesh rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.55, 0.55, 20, 40, 1, true]} />
      <meshPhysicalMaterial
        color="#bff0ff"
        transmission={0.9}
        thickness={0.4}
        roughness={0.08}
        metalness={0}
        transparent
        opacity={0.28}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* -------------------------------------------------------------------------- */
/*  Filtration cartridges                                                     */
/* -------------------------------------------------------------------------- */
function FilterUnit({ x }: { x: number }) {
  return (
    <group position={[x, 0, 0]}>
      {[-0.9, 0, 0.9].map((dx, i) => (
        <group key={i} position={[dx, 0, 0]}>
          {/* glass housing */}
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.32, 0.32, 2.4, 24]} />
            <meshPhysicalMaterial
              color="#d6f3ff"
              transmission={0.85}
              thickness={0.3}
              roughness={0.1}
              transparent
              opacity={0.4}
            />
          </mesh>
          {/* filter media */}
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 2.2, 16]} />
            <meshStandardMaterial color="#7dd3fc" roughness={0.6} />
          </mesh>
          {/* caps */}
          <mesh position={[0, 1.65, 0]}>
            <cylinderGeometry args={[0.36, 0.36, 0.2, 24]} />
            <meshStandardMaterial color="#0a2a5b" metalness={0.6} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.85, 0]}>
            <cylinderGeometry args={[0.36, 0.36, 0.2, 24]} />
            <meshStandardMaterial color="#0a2a5b" metalness={0.6} roughness={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  UV disinfection chamber (pulsing glow)                                    */
/* -------------------------------------------------------------------------- */
function UVChamber({ x }: { x: number }) {
  const core = React.useRef<THREE.MeshStandardMaterial>(null);
  useFrame((state) => {
    if (core.current) {
      core.current.emissiveIntensity =
        1.6 + Math.sin(state.clock.elapsedTime * 6) * 0.6;
    }
  });
  return (
    <group position={[x, 0.4, 0]}>
      <mesh>
        <cylinderGeometry args={[0.6, 0.6, 2.6, 32]} />
        <meshPhysicalMaterial
          color="#cdeeff"
          transmission={0.9}
          thickness={0.4}
          roughness={0.05}
          transparent
          opacity={0.35}
        />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.12, 0.12, 2.4, 16]} />
        <meshStandardMaterial
          ref={core}
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      <pointLight color="#22d3ee" intensity={6} distance={6} />
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  The 19L gallon that fills with purified water                             */
/* -------------------------------------------------------------------------- */
function Gallon({
  x,
  progressRef,
}: {
  x: number;
  progressRef: ProgressRef;
}) {
  const water = React.useRef<THREE.Mesh>(null);
  const maxH = 1.7;

  useFrame(() => {
    if (!water.current) return;
    // fill ramps up across the 4th portion of the journey, with a gentle idle
    const p = progressRef.current;
    const fill = THREE.MathUtils.clamp((p - 0.45) / 0.35, 0.08, 1);
    const h = maxH * fill;
    water.current.scale.y = Math.max(h, 0.001);
    water.current.position.y = -0.75 + h / 2;
  });

  return (
    <group position={[x, 0, 0]}>
      {/* bottle body */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.7, 0.6, 1.9, 32]} />
        <meshPhysicalMaterial
          color="#e6f7ff"
          transmission={0.92}
          thickness={0.5}
          roughness={0.05}
          ior={1.33}
          transparent
          opacity={0.5}
        />
      </mesh>
      {/* neck */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.22, 0.32, 0.5, 24]} />
        <meshPhysicalMaterial
          color="#e6f7ff"
          transmission={0.92}
          thickness={0.3}
          roughness={0.05}
          transparent
          opacity={0.5}
        />
      </mesh>
      {/* cap */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.22, 24]} />
        <meshStandardMaterial color="#06b6d4" metalness={0.4} roughness={0.3} />
      </mesh>
      {/* water inside (scales up as it fills) */}
      <mesh ref={water} position={[0, -0.75, 0]}>
        <cylinderGeometry args={[0.62, 0.54, 1, 32]} />
        <meshStandardMaterial
          color="#06b6d4"
          transparent
          opacity={0.85}
          emissive="#0891b2"
          emissiveIntensity={0.25}
        />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Delivery — a friendly home that lights up as the journey completes        */
/* -------------------------------------------------------------------------- */
function DeliveryHome({
  x,
  progressRef,
}: {
  x: number;
  progressRef: ProgressRef;
}) {
  const group = React.useRef<THREE.Group>(null);
  const win = React.useRef<THREE.MeshStandardMaterial>(null);

  useFrame(() => {
    const p = progressRef.current;
    const arrive = THREE.MathUtils.clamp((p - 0.78) / 0.22, 0, 1);
    if (win.current) win.current.emissiveIntensity = arrive * 1.4;
    if (group.current) group.current.scale.setScalar(0.9 + arrive * 0.15);
  });

  return (
    <group ref={group} position={[x, -0.2, 0]}>
      {/* body */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.6, 1.2, 1.4]} />
        <meshStandardMaterial color="#f4fbff" roughness={0.7} />
      </mesh>
      {/* roof */}
      <mesh position={[0, 1.35, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.35, 0.9, 4]} />
        <meshStandardMaterial color="#0a2a5b" roughness={0.5} />
      </mesh>
      {/* window */}
      <mesh position={[0, 0.5, 0.71]}>
        <planeGeometry args={[0.5, 0.5]} />
        <meshStandardMaterial
          ref={win}
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Falling source droplets above stage 1                                     */
/* -------------------------------------------------------------------------- */
function SourceDroplets({ x }: { x: number }) {
  return (
    <group position={[x, 2.4, 0]}>
      {[0, 1, 2].map((i) => (
        <Float key={i} speed={3} rotationIntensity={0} floatIntensity={2}>
          <mesh position={[(i - 1) * 0.35, Math.sin(i) * 0.3, 0]}>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshPhysicalMaterial
              color="#22d3ee"
              transmission={0.6}
              thickness={0.5}
              roughness={0.05}
              emissive="#22d3ee"
              emissiveIntensity={0.3}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Camera that gently pans across the pipeline with scroll progress          */
/* -------------------------------------------------------------------------- */
function Rig({ progressRef }: { progressRef: ProgressRef }) {
  useFrame((state) => {
    const p = progressRef.current;
    const targetX = THREE.MathUtils.lerp(-7, 7, p);
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      targetX,
      0.05,
    );
    state.camera.position.y = 1.5;
    state.camera.position.z = 12;
    state.camera.lookAt(targetX, 0, 0);
  });
  return null;
}

/* -------------------------------------------------------------------------- */
/*  Scene                                                                      */
/* -------------------------------------------------------------------------- */
export default function PurificationScene({
  progressRef,
}: {
  progressRef: ProgressRef;
}) {
  return (
    <Canvas
      camera={{ position: [-7, 1.5, 12], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.8]}
    >
      <color attach="background" args={["#07203f"]} />
      <fog attach="fog" args={["#07203f", 14, 30]} />

      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 6]} intensity={1.4} />
      <directionalLight position={[-6, 4, -4]} intensity={0.6} color="#22d3ee" />
      <pointLight position={[0, 5, 8]} intensity={2} color="#7dd3fc" />

      <Rig progressRef={progressRef} />

      <Pipe />
      <FlowParticles />

      <SourceDroplets x={STAGE_X[0]} />
      <FilterUnit x={STAGE_X[1]} />
      <UVChamber x={STAGE_X[2]} />
      <Gallon x={STAGE_X[3]} progressRef={progressRef} />
      <DeliveryHome x={STAGE_X[4]} progressRef={progressRef} />
    </Canvas>
  );
}
