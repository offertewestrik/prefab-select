"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  ContactShadows,
  OrbitControls,
  Float,
} from "@react-three/drei";
import * as THREE from "three";

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */
function useIsDesktop() {
  const [desktop, setDesktop] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const on = () => setDesktop(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return desktop;
}

/** Profile of a real 19L water gallon (radius, height) for LatheGeometry. */
const GALLON_PROFILE: [number, number][] = [
  [0.0, -1.32],
  [0.56, -1.32],
  [0.65, -1.27], // thick bottom rim
  [0.67, -1.18],
  [0.6, -1.07],
  [0.84, -0.93],
  [0.99, -0.6],
  [1.0, -0.2],
  [0.95, 0.06], // gentle waist (indented sides)
  [1.0, 0.34],
  [0.98, 0.6],
  [0.88, 0.82], // shoulder
  [0.62, 1.04],
  [0.38, 1.2],
  [0.31, 1.32], // neck
  [0.31, 1.46],
  [0.35, 1.5], // thick neck lip
  [0.35, 1.56],
];

/* -------------------------------------------------------------------------- */
/*  Arabic label drawn to a canvas texture (no external font needed)          */
/* -------------------------------------------------------------------------- */
function useLabelTexture() {
  return React.useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 640;
    c.height = 460;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, c.width, c.height);

    // frosted white label panel
    const r = 36;
    const x = 40,
      y = 40,
      w = c.width - 80,
      h = c.height - 80;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = "rgba(8,145,178,0.55)";
    ctx.stroke();

    ctx.direction = "rtl";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const family = "'Cairo','Tajawal','Segoe UI',Tahoma,sans-serif";

    // brand
    ctx.fillStyle = "#0a2a5b";
    ctx.font = `800 110px ${family}`;
    ctx.fillText("النقاء", c.width / 2, 165);

    // tagline
    ctx.fillStyle = "#0891b2";
    ctx.font = `700 52px ${family}`;
    ctx.fillText("مياه شرب نقية", c.width / 2, 270);

    // volume
    ctx.fillStyle = "#0a2a5b";
    ctx.font = `800 70px ${family}`;
    ctx.fillText("19L", c.width / 2, 360);

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }, []);
}

/* -------------------------------------------------------------------------- */
/*  Rising air bubbles inside the water                                       */
/* -------------------------------------------------------------------------- */
function Bubbles() {
  const ref = React.useRef<THREE.InstancedMesh>(null);
  const count = 18;
  const data = React.useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 1.3,
        z: (Math.random() - 0.5) * 1.3,
        y: -1.1 + Math.random() * 1.6,
        speed: 0.15 + Math.random() * 0.35,
        scale: 0.02 + Math.random() * 0.04,
      })),
    [],
  );
  const dummy = React.useMemo(() => new THREE.Object3D(), []);

  useFrame((_, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    data.forEach((b, i) => {
      b.y += b.speed * delta;
      if (b.y > 0.55) b.y = -1.1;
      const r = Math.min(0.9, 0.55 + (b.y + 1.1) * 0.05);
      dummy.position.set(
        THREE.MathUtils.clamp(b.x, -r, r),
        b.y,
        THREE.MathUtils.clamp(b.z, -r, r),
      );
      dummy.scale.setScalar(b.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined as never, undefined as never, count]}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshStandardMaterial
        color="#bfefff"
        transparent
        opacity={0.5}
        roughness={0.1}
      />
    </instancedMesh>
  );
}

/* -------------------------------------------------------------------------- */
/*  Animated water surface                                                    */
/* -------------------------------------------------------------------------- */
function WaterSurface({ y }: { y: number }) {
  const ref = React.useRef<THREE.Mesh>(null);
  const base = React.useMemo(() => {
    const g = new THREE.CircleGeometry(0.9, 64);
    return g.attributes.position.array.slice() as Float32Array;
  }, []);

  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;
    const pos = mesh.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < pos.length; i += 3) {
      const x = base[i];
      const yy = base[i + 1];
      pos[i + 2] =
        Math.sin(x * 4 + t * 1.6) * 0.025 + Math.cos(yy * 4 + t * 1.2) * 0.025;
    }
    mesh.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={ref} position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[0.9, 64]} />
      <meshPhysicalMaterial
        color="#0891b2"
        transparent
        opacity={0.85}
        roughness={0.15}
        metalness={0}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

/* -------------------------------------------------------------------------- */
/*  The gallon                                                                */
/* -------------------------------------------------------------------------- */
function Gallon({ hovered, spin }: { hovered: boolean; spin: boolean }) {
  const group = React.useRef<THREE.Group>(null);
  const intro = React.useRef(0);
  const label = useLabelTexture();

  const profile = React.useMemo(
    () => GALLON_PROFILE.map(([x, y]) => new THREE.Vector2(x, y)),
    [],
  );

  const glass = React.useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#0ea5e9",
        transparent: true,
        opacity: 0.45,
        transmission: 0.65,
        thickness: 1.2,
        roughness: 0.08,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        ior: 1.45,
        side: THREE.DoubleSide,
      }),
    [],
  );

  const capMat = React.useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#0369a1",
        roughness: 0.25,
        metalness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0.15,
      }),
    [],
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    // intro: ease forward + scale up
    intro.current = THREE.MathUtils.clamp(intro.current + delta * 0.8, 0, 1);
    const e = 1 - Math.pow(1 - intro.current, 3);
    const targetScale = (0.86 + e * 0.14) * (hovered ? 1.06 : 1);
    group.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1,
    );
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, -1.6 + e * 1.6, 0.1);
    // self-spin when there are no orbit controls (mobile)
    if (spin) group.current.rotation.y += delta * (hovered ? 0.8 : 0.28);
  });

  return (
    <group ref={group} position={[0, -0.1, -1.6]}>
      {/* glass body */}
      <mesh material={glass} castShadow>
        <latheGeometry args={[profile, 80]} />
      </mesh>

      {/* horizontal reinforcement rings */}
      {[-0.45, 0.0, 0.42].map((yy, i) => (
        <mesh key={i} position={[0, yy, 0]} material={glass}>
          <torusGeometry args={[i === 1 ? 0.99 : 0.985, 0.022, 12, 64]} />
        </mesh>
      ))}

      {/* subtle side grips near the shoulder */}
      {[1, -1].map((s) => (
        <mesh key={s} position={[s * 0.9, 0.7, 0]} rotation={[0, 0, Math.PI / 2]} material={glass}>
          <torusGeometry args={[0.16, 0.05, 10, 24, Math.PI]} />
        </mesh>
      ))}

      {/* neck lip */}
      <mesh position={[0, 1.5, 0]} material={glass}>
        <torusGeometry args={[0.34, 0.04, 12, 48]} />
      </mesh>

      {/* blue cap */}
      <mesh position={[0, 1.66, 0]} material={capMat} castShadow>
        <cylinderGeometry args={[0.37, 0.37, 0.26, 48]} />
      </mesh>
      <mesh position={[0, 1.8, 0]} material={capMat}>
        <cylinderGeometry args={[0.34, 0.37, 0.05, 48]} />
      </mesh>

      {/* water body */}
      <mesh position={[0, -0.28, 0]}>
        <cylinderGeometry args={[0.9, 0.74, 1.65, 48]} />
        <meshPhysicalMaterial
          color="#06b6d4"
          transparent
          opacity={0.55}
          roughness={0.12}
          transmission={0.3}
          thickness={0.8}
          ior={1.33}
        />
      </mesh>
      <WaterSurface y={0.55} />
      <Bubbles />

      {/* front label */}
      <mesh position={[0, -0.05, 0.995]}>
        <planeGeometry args={[1.18, 0.86, 16, 16]} />
        <meshStandardMaterial
          map={label}
          transparent
          roughness={0.45}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* glossy white highlight streaks on the front */}
      {[-0.42, 0.34].map((x, i) => (
        <mesh key={i} position={[x, 0.1, 1.02]} rotation={[0, 0, i ? -0.12 : 0.16]}>
          <planeGeometry args={[i ? 0.07 : 0.11, 1.7]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={i ? 0.18 : 0.28}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Scene + Canvas                                                            */
/* -------------------------------------------------------------------------- */
export default function WaterGallon3D() {
  const [hovered, setHovered] = React.useState(false);
  const isDesktop = useIsDesktop();

  return (
    <div
      className="h-full w-full"
      style={{ touchAction: "pan-y" }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.1, 6], fov: 34 }}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: false }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 6, 5]} intensity={1.6} castShadow />
        {/* blue rim light from behind */}
        <directionalLight position={[-5, 2, -4]} intensity={1.4} color="#38bdf8" />
        <directionalLight position={[0, -3, 3]} intensity={0.4} color="#7dd3fc" />

        <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.7}>
          <Gallon hovered={hovered} spin={!isDesktop} />
        </Float>

        <ContactShadows
          position={[0, -1.45, 0]}
          opacity={0.4}
          scale={6}
          blur={2.6}
          far={3}
          color="#0a2a5b"
        />

        {/* Procedural studio environment (HDRI-like reflections, no CDN fetch) */}
        <Environment resolution={256}>
          <Lightformer
            form="rect"
            intensity={3}
            position={[0, 3, 2]}
            scale={[6, 3, 1]}
            color="#ffffff"
          />
          <Lightformer
            form="rect"
            intensity={2}
            position={[-4, 1, 3]}
            scale={[3, 4, 1]}
            color="#e6f7ff"
          />
          <Lightformer
            form="rect"
            intensity={2.4}
            position={[4, 0, -3]}
            scale={[3, 5, 1]}
            color="#38bdf8"
          />
          <Lightformer
            form="circle"
            intensity={2}
            position={[0, -3, 2]}
            scale={[4, 4, 1]}
            color="#bae6fd"
          />
        </Environment>

        {isDesktop && (
          <OrbitControls
            makeDefault
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={hovered ? 6 : 1.1}
            minPolarAngle={Math.PI / 2.7}
            maxPolarAngle={Math.PI / 1.85}
          />
        )}
      </Canvas>
    </div>
  );
}
