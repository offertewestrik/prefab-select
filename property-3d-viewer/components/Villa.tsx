"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { property, type MaterialPreset } from "@/data/properties3d";

type Props = {
  modelUrl?: string;
  material: MaterialPreset;
  night: boolean;
};

/**
 * Toont een echte GLB als `modelUrl` is gezet, anders een procedurele
 * luxe-villa opgebouwd uit primitives. Beide reageren op de gekozen
 * afwerking en op de dag/nacht-modus (raamverlichting).
 */
export default function Villa({ modelUrl, material, night }: Props) {
  if (modelUrl) {
    return <GLTFVilla url={modelUrl} material={material} />;
  }
  return <ProceduralVilla material={material} night={night} />;
}

// laad het model alvast (lazy preload) zodra de bundel geladen is
if (property.modelUrl) {
  useGLTF.preload(property.modelUrl);
}

/* ---- echte GLB ------------------------------------------------------ */
const TARGET_SIZE = 6; // gewenste breedte van het model in scene-units

function GLTFVilla({ url, material }: { url: string; material: MaterialPreset }) {
  const { scene } = useGLTF(url);

  // auto-center + auto-scale zodat elk geïmporteerd model netjes past,
  // ongeacht de bron-schaal of -oriëntatie
  const { object, scale, offset } = useMemo(() => {
    const root = scene.clone(true);
    const tint = new THREE.Color(material.color);
    root.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        // Behoud de ingebakken PBR-textuur en geef 'm een subtiele afwerk-tint:
        // de basiskleur wordt deels naar de preset-kleur gemengd zodat de
        // textuur leesbaar blijft maar de "afwerking" zichtbaar verandert.
        const apply = (src: THREE.Material) => {
          const m = (src as THREE.MeshStandardMaterial).clone() as THREE.MeshStandardMaterial;
          if (m.color) {
            const base = m.map ? new THREE.Color("#ffffff") : new THREE.Color("#e9e2d5");
            m.color.copy(base).lerp(tint, m.map ? 0.45 : 1);
          }
          return m;
        };
        mesh.material = Array.isArray(mesh.material)
          ? mesh.material.map(apply)
          : apply(mesh.material);
      }
    });

    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.z) || 1;
    const s = TARGET_SIZE / maxDim;

    // centreer horizontaal en zet de onderkant op de grond (y=0)
    return {
      object: root,
      scale: s,
      offset: new THREE.Vector3(-center.x * s, -box.min.y * s, -center.z * s),
    };
  }, [scene, material]);

  return (
    <group position={offset} scale={scale}>
      <primitive object={object} />
    </group>
  );
}

/* ---- procedurele villa --------------------------------------------- */
function ProceduralVilla({ material, night }: { material: MaterialPreset; night: boolean }) {
  const facade = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(material.color),
        roughness: material.roughness,
        metalness: material.metalness,
      }),
    [material]
  );

  const glass = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: night ? "#1a2438" : "#bfd6e6",
        roughness: 0.05,
        metalness: 0,
        transmission: 0.9,
        transparent: true,
        opacity: night ? 0.92 : 0.55,
        thickness: 0.5,
      }),
    [night]
  );

  const windowGlow = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ffd9a0",
        emissive: new THREE.Color(night ? "#ffb766" : "#000000"),
        emissiveIntensity: night ? 1.4 : 0,
        roughness: 0.4,
      }),
    [night]
  );

  const pool = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: night ? "#0e3a52" : "#2f9fc4",
        roughness: 0.08,
        metalness: 0,
        transmission: 0.4,
        transparent: true,
        opacity: 0.9,
      }),
    [night]
  );

  const deck = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#cbb48f", roughness: 0.9 }),
    []
  );

  return (
    <group position={[0, 0, 0]}>
      {/* grondplaat / terras */}
      <mesh position={[0, -0.05, 1]} receiveShadow material={deck}>
        <boxGeometry args={[12, 0.1, 9]} />
      </mesh>

      {/* hoofdvolume — begane grond */}
      <mesh position={[0.4, 1, -0.6]} castShadow receiveShadow material={facade}>
        <boxGeometry args={[5.2, 2, 4]} />
      </mesh>

      {/* tweede bouwlaag, iets terugliggend */}
      <mesh position={[-0.4, 3, 0.4]} castShadow receiveShadow material={facade}>
        <boxGeometry args={[4, 2, 3.4]} />
      </mesh>

      {/* plat dak met overstek */}
      <mesh position={[-0.4, 4.1, 0.4]} castShadow material={facade}>
        <boxGeometry args={[4.6, 0.2, 4]} />
      </mesh>

      {/* glazen pui begane grond (woonkamer) */}
      <mesh position={[0.4, 1, 1.42]} material={glass}>
        <boxGeometry args={[4.4, 1.7, 0.08]} />
      </mesh>

      {/* verlichte ramen verdieping */}
      <mesh position={[-0.4, 3, 2.12]} material={windowGlow}>
        <boxGeometry args={[3.4, 1.4, 0.06]} />
      </mesh>
      <mesh position={[1.62, 3, 0.4]} material={windowGlow}>
        <boxGeometry args={[0.06, 1.4, 2.6]} />
      </mesh>

      {/* slanke gouden kolommen bij de entree */}
      {[-1.8, -0.6, 0.6, 1.8].map((x) => (
        <mesh key={x} position={[x, 1, 1.5]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 2, 16]} />
          <meshStandardMaterial color="#c9a76a" roughness={0.3} metalness={0.7} />
        </mesh>
      ))}

      {/* infinity pool */}
      <mesh position={[-2.4, 0.02, 3]} receiveShadow material={pool}>
        <boxGeometry args={[3.4, 0.16, 2.4]} />
      </mesh>
      {/* poolrand */}
      <mesh position={[-2.4, 0.04, 3]}>
        <boxGeometry args={[3.7, 0.12, 2.7]} />
        <meshStandardMaterial color="#e7dcc6" roughness={0.9} />
      </mesh>

      {/* loungeterras-deck rechts */}
      <mesh position={[3.4, 0.06, 3]} receiveShadow material={deck}>
        <boxGeometry args={[3, 0.12, 2.6]} />
      </mesh>

      {/* sculpturale tuinboom-accenten */}
      {[
        [-4.4, 0, -2],
        [4.6, 0, -1.6],
      ].map(([x, , z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.7, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.1, 1.4, 8]} />
            <meshStandardMaterial color="#6b5638" roughness={1} />
          </mesh>
          <mesh position={[0, 1.7, 0]} castShadow>
            <sphereGeometry args={[0.7, 16, 16]} />
            <meshStandardMaterial color={night ? "#1f3b2a" : "#5c8a5a"} roughness={1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
