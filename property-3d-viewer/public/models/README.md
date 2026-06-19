# 3D-modellen

Zet hier je eigen villa-model neer als **`villa-dubai.glb`** (of `.gltf`).

1. Exporteer/comprimeer naar GLB (Draco-compressie aanbevolen voor snelheid).
2. Plaats het bestand in deze map: `public/models/villa-dubai.glb`.
3. Activeer het in `data/properties3d.ts`:

   ```ts
   export const property: Property3D = {
     ...,
     modelUrl: "/models/villa-dubai.glb",
   };
   ```

Zolang `modelUrl` niet is gezet, toont de viewer een **procedurele luxe-villa**
die volledig in code is opgebouwd — zo werkt de demo direct zonder model.

## Tips voor materiaalwissel op een echt model

De `GLTFVilla` past de gekozen afwerking toe op meshes waarvan de naam
`facade`, `wall`, `muur`, `gevel` of `body` bevat. Benoem je gevel-meshes zo,
dan werkt de materiaalkiezer automatisch.
