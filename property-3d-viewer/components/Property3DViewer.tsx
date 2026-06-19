"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, SoftShadows } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { property } from "@/data/properties3d";
import Villa from "./Villa";
import ViewerHotspot from "./ViewerHotspot";
import MaterialSelector from "./MaterialSelector";
import FloorplanOverlay from "./FloorplanOverlay";
import Loader from "./Loader";
import ModelErrorBoundary from "./ModelErrorBoundary";

const START_CAM: [number, number, number] = [6, 4, 8];
const HOME_TARGET = new THREE.Vector3(0, 1.4, 0);

/* =====================================================================
   Camera-rig: lerpt camera + controls-target naar de gekozen hotspot
   ===================================================================== */
function CameraRig({
  target,
  lookAt,
  controls,
}: {
  target: THREE.Vector3 | null;
  lookAt: THREE.Vector3;
  controls: React.MutableRefObject<OrbitControlsImpl | null>;
}) {
  const { camera } = useThree();
  const desiredPos = useRef(new THREE.Vector3(...START_CAM));
  const desiredTarget = useRef(HOME_TARGET.clone());

  useEffect(() => {
    if (target) {
      desiredPos.current.copy(target);
      desiredTarget.current.copy(lookAt);
    } else {
      desiredPos.current.set(...START_CAM);
      desiredTarget.current.copy(HOME_TARGET);
    }
  }, [target, lookAt]);

  useFrame(() => {
    camera.position.lerp(desiredPos.current, 0.06);
    if (controls.current) {
      controls.current.target.lerp(desiredTarget.current, 0.06);
      controls.current.update();
    }
  });

  return null;
}

/* =====================================================================
   Scene-lichten + omgeving voor dag/nacht
   ===================================================================== */
/* Ingebouwde studio-omgeving via PMREM (RoomEnvironment) — geen externe
   HDR/CDN nodig, dus snel en betrouwbaar. Intensiteit zakt 's nachts. */
function EnvironmentRig({ night }: { night: boolean }) {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = env.texture;
    return () => {
      env.texture.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  useEffect(() => {
    // three r0.169: per-scene environment-intensiteit
    (scene as THREE.Scene & { environmentIntensity?: number }).environmentIntensity = night
      ? 0.25
      : 1;
  }, [scene, night]);
  return null;
}

function SceneLighting({ night }: { night: boolean }) {
  return (
    <>
      <ambientLight intensity={night ? 0.25 : 0.6} />
      <directionalLight
        position={night ? [-6, 8, -4] : [8, 12, 6]}
        intensity={night ? 0.6 : 1.5}
        color={night ? "#9db4e0" : "#fff4e0"}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={40}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />
      {night && (
        <pointLight position={[0, 3, 2]} intensity={2.4} color="#ffb766" distance={14} />
      )}
    </>
  );
}

/* =====================================================================
   Hoofd-viewer
   ===================================================================== */
export default function Property3DViewer() {
  const controls = useRef<OrbitControlsImpl | null>(null);
  const glRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.Camera | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [fullscreen, setFullscreen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [materialId, setMaterialId] = useState(property.materials[0].id);
  const [night, setNight] = useState(false);
  const [floorOpen, setFloorOpen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  const activeHotspot = property.hotspots.find((h) => h.id === activeId) || null;
  const material = property.materials.find((m) => m.id === materialId) || property.materials[0];

  const camTarget = activeHotspot ? new THREE.Vector3(...activeHotspot.camPos) : null;
  const lookAt = activeHotspot ? new THREE.Vector3(...activeHotspot.position) : HOME_TARGET;

  const selectHotspot = useCallback((id: string) => {
    setActiveId(id);
    setAutoRotate(false);
    setFloorOpen(false);
  }, []);

  const closePanel = useCallback(() => {
    setActiveId(null);
    setAutoRotate(true);
  }, []);

  const resetView = useCallback(() => {
    setActiveId(null);
    setFloorOpen(false);
    setAutoRotate(true);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = rootRef.current;
    if (!el) return;
    if (!document.fullscreenElement) el.requestFullscreen?.();
    else document.exitFullscreen?.();
  }, []);

  useEffect(() => {
    const onFs = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const screenshot = useCallback(() => {
    const gl = glRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    if (!gl || !scene || !camera) return;
    gl.render(scene, camera); // verse frame in de buffer (preserveDrawingBuffer)
    const url = gl.domElement.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `${property.name.replace(/\s+/g, "-").toLowerCase()}-3d.png`;
    a.click();
  }, []);

  return (
    <div className={`viewer${night ? " night" : ""}`} ref={rootRef}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: START_CAM, fov: 42 }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        onCreated={({ gl, scene, camera }) => {
          glRef.current = gl;
          sceneRef.current = scene;
          cameraRef.current = camera;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
        }}
      >
        <color attach="background" args={[night ? "#0c1322" : "#dce8f2"]} />
        <fog attach="fog" args={[night ? "#0c1322" : "#dce8f2", 18, 40]} />

        <SoftShadows size={28} samples={12} focus={0.6} />
        <EnvironmentRig night={night} />
        <SceneLighting night={night} />

        <Suspense fallback={<Loader />}>
          <ModelErrorBoundary fallback={<Villa material={material} night={night} />}>
            <Villa modelUrl={property.modelUrl} material={material} night={night} />
          </ModelErrorBoundary>
          {property.hotspots.map((h) => (
            <ViewerHotspot
              key={h.id}
              hotspot={h}
              active={h.id === activeId}
              onSelect={selectHotspot}
            />
          ))}
        </Suspense>

        <ContactShadows
          position={[0, 0, 1]}
          opacity={night ? 0.5 : 0.35}
          scale={20}
          blur={2.6}
          far={6}
        />

        <CameraRig target={camTarget} lookAt={lookAt} controls={controls} />

        <OrbitControls
          ref={controls}
          target={HOME_TARGET}
          enableDamping
          dampingFactor={0.08}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          minDistance={4}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2.08} // niet onder de grond kijken
          enablePan={false}
          onStart={() => setAutoRotate(false)}
        />
      </Canvas>

      {/* ---- naam / locatie ---- */}
      <div className="ui-top-left">
        <div className="tag glass" data-no-i18n>
          <div className="t-name">{property.name}</div>
          <div className="t-loc">
            {property.location} · {property.price}
          </div>
        </div>
      </div>

      {/* ---- reset / dag-nacht / screenshot / fullscreen ---- */}
      <div className="ui-top-right">
        <button
          className="icon-btn glass"
          onClick={resetView}
          aria-label="Beginstand"
          title="Beginstand"
          type="button"
        >
          <HomeIcon />
        </button>
        <button
          className={`icon-btn glass${night ? " active" : ""}`}
          onClick={() => setNight((v) => !v)}
          aria-label={night ? "Dagmodus" : "Nachtmodus"}
          title={night ? "Dagmodus" : "Nachtmodus"}
          type="button"
        >
          {night ? <SunIcon /> : <MoonIcon />}
        </button>
        <button
          className="icon-btn glass"
          onClick={screenshot}
          aria-label="Schermafbeelding maken"
          title="Schermafbeelding maken"
          type="button"
        >
          <CameraIcon />
        </button>
        <button
          className={`icon-btn glass${fullscreen ? " active" : ""}`}
          onClick={toggleFullscreen}
          aria-label="Volledig scherm"
          title="Volledig scherm"
          type="button"
        >
          <FullscreenIcon />
        </button>
      </div>

      {/* ---- materiaalkiezer ---- */}
      <div className="ui-bottom-right">
        <MaterialSelector
          materials={property.materials}
          activeId={materialId}
          onChange={setMaterialId}
        />
      </div>

      {/* ---- plattegrond-knop ---- */}
      <div className="ui-bottom-left">
        <button className="pill glass" onClick={() => setFloorOpen(true)} type="button">
          <PlanIcon /> Plattegrond
        </button>
      </div>

      {/* ---- info-paneel ---- */}
      <AnimatePresence>
        {activeHotspot && (
          <motion.aside
            className="info-panel glass"
            key={activeHotspot.id}
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 60, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="ip-close" onClick={closePanel} aria-label="Sluiten" type="button">
              <CloseIcon />
            </button>
            <span className="ip-k">{activeHotspot.label}</span>
            <h2>{activeHotspot.title}</h2>
            <p>{activeHotspot.description}</p>
            <div className="ip-cta">
              <a
                className="pill pill-gold"
                href="https://wa.me/971521299081"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CalendarIcon /> Plan een bezichtiging
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ---- plattegrond-overlay ---- */}
      <AnimatePresence>
        {floorOpen && (
          <FloorplanOverlay
            floor={property.floor}
            activeId={activeId}
            onSelectRoom={selectHotspot}
            onClose={() => setFloorOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---- icons (inline, geen externe lib) ------------------------------ */
function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}
function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}
function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l9-8 9 8" />
      <path d="M5 9.5V21h14V9.5" />
    </svg>
  );
}
function FullscreenIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H4a1 1 0 0 0-1 1v4M16 3h4a1 1 0 0 1 1 1v4M21 16v4a1 1 0 0 1-1 1h-4M3 16v4a1 1 0 0 0 1 1h4" />
    </svg>
  );
}
function PlanIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M3 10h7V3M14 21v-7h7" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}
