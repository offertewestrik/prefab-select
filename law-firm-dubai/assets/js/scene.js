/* =====================================================================
   Meridian Crowne — Cinematic hero scene
   Animated Dubai skyline at night, floating gold particles, glass
   reflections and a slow 3D camera move. Uses global THREE (CDN).
   Degrades gracefully: if THREE is unavailable the CSS hero veil/grid
   remains, so the hero is never broken.
   ===================================================================== */
(function () {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas || typeof THREE === "undefined") return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050505, 0.018);

  const camera = new THREE.PerspectiveCamera(46, window.innerWidth / window.innerHeight, 0.1, 400);
  camera.position.set(0, 14, 64);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const GOLD = 0xd4af37, GOLD_BRIGHT = 0xf4d27a;

  /* ---- Lighting --------------------------------------------------- */
  scene.add(new THREE.AmbientLight(0x222028, 0.9));
  const key = new THREE.PointLight(GOLD, 2.2, 240);
  key.position.set(40, 70, 40);
  scene.add(key);
  const rim = new THREE.PointLight(0x4a4660, 1.1, 260);
  rim.position.set(-60, 30, -20);
  scene.add(rim);

  /* ---- Reflective ground (glass) ---------------------------------- */
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(800, 800),
    new THREE.MeshStandardMaterial({ color: 0x050507, metalness: 0.9, roughness: 0.35 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.2;
  scene.add(ground);

  /* ---- Skyline ---------------------------------------------------- */
  const city = new THREE.Group();
  scene.add(city);

  const litMat = new THREE.MeshStandardMaterial({ color: 0x0c0c12, metalness: 0.7, roughness: 0.45, emissive: GOLD, emissiveIntensity: 0.0 });
  const winGeo = new THREE.BoxGeometry(1, 1, 1);

  const rows = 5, perRow = 26, spacing = 6.2;
  const towers = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < perRow; c++) {
      const depth = r;
      const x = (c - perRow / 2) * spacing + (r % 2) * spacing * 0.5;
      const z = -depth * 16 - 8;
      // height: a few signature super-talls (Burj-like) in front-center
      const center = 1 - Math.min(1, Math.abs(c - perRow / 2) / 6);
      let h = 8 + Math.random() * 26 + center * center * 46 * (r < 2 ? 1 : 0.4);
      const w = 2.4 + Math.random() * 2.6;
      const mat = litMat.clone();
      // window glow strength per tower
      const glow = 0.18 + Math.random() * 0.6;
      mat.emissiveIntensity = glow * (Math.random() > 0.78 ? 1.6 : 0.5);
      mat.color = new THREE.Color(0x0a0a10).lerp(new THREE.Color(0x161620), Math.random());
      const m = new THREE.Mesh(winGeo, mat);
      m.scale.set(w, h, w);
      m.position.set(x, h / 2, z);
      city.add(m);
      towers.push({ mesh: m, base: mat.emissiveIntensity, phase: Math.random() * Math.PI * 2, speed: 0.6 + Math.random() * 1.4 });

      // antenna / spire on tall ones
      if (h > 44) {
        const spire = new THREE.Mesh(
          new THREE.CylinderGeometry(0.05, 0.35, 14, 6),
          new THREE.MeshStandardMaterial({ color: 0x111, emissive: GOLD_BRIGHT, emissiveIntensity: 1.2 })
        );
        spire.position.set(x, h + 6.5, z);
        city.add(spire);
      }
    }
  }

  /* ---- Floating gold particles ------------------------------------ */
  const pCount = reduced ? 260 : 900;
  const pGeo = new THREE.BufferGeometry();
  const pos = new Float32Array(pCount * 3);
  const speeds = new Float32Array(pCount);
  for (let i = 0; i < pCount; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 260;
    pos[i * 3 + 1] = Math.random() * 110;
    pos[i * 3 + 2] = -Math.random() * 200 + 40;
    speeds[i] = 0.5 + Math.random();
  }
  pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const sprite = makeGlowTexture();
  const pMat = new THREE.PointsMaterial({
    size: 1.5, map: sprite, color: GOLD_BRIGHT, transparent: true, opacity: 0.85,
    depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
  });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  /* ---- Gold light streaks (volumetric beams) ---------------------- */
  const beams = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const beam = new THREE.Mesh(
      new THREE.PlaneGeometry(2.2, 200),
      new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.05, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    beam.position.set((i - 1) * 50, 60, -120);
    beam.rotation.z = (i - 1) * 0.12;
    beams.add(beam);
  }
  scene.add(beams);

  /* ---- Interaction ------------------------------------------------ */
  let mx = 0, my = 0, tmx = 0, tmy = 0, scrollY = 0;
  window.addEventListener("pointermove", (e) => {
    tmx = (e.clientX / window.innerWidth - 0.5);
    tmy = (e.clientY / window.innerHeight - 0.5);
  }, { passive: true });
  window.addEventListener("scroll", () => { scrollY = window.scrollY; }, { passive: true });

  /* ---- Render loop ------------------------------------------------ */
  const clock = new THREE.Clock();
  let raf;
  function tick() {
    const t = clock.getElapsedTime();
    mx += (tmx - mx) * 0.04;
    my += (tmy - my) * 0.04;

    // slow cinematic dolly + mouse parallax + scroll lift
    camera.position.x = Math.sin(t * 0.06) * 10 + mx * 16;
    camera.position.y = 14 + my * -6 + Math.min(scrollY, 600) * 0.02;
    camera.position.z = 64 - Math.sin(t * 0.04) * 6;
    camera.lookAt(0, 16 - Math.min(scrollY, 600) * 0.01, -40);

    // twinkling windows
    if (!reduced) {
      for (let i = 0; i < towers.length; i += 1) {
        const tw = towers[i];
        tw.mesh.material.emissiveIntensity = tw.base * (0.7 + Math.sin(t * tw.speed + tw.phase) * 0.3);
      }
    }

    // drifting particles
    const arr = pGeo.attributes.position.array;
    for (let i = 0; i < pCount; i++) {
      arr[i * 3 + 1] += speeds[i] * 0.03;
      arr[i * 3] += Math.sin(t * 0.3 + i) * 0.006;
      if (arr[i * 3 + 1] > 112) arr[i * 3 + 1] = 0;
    }
    pGeo.attributes.position.needsUpdate = true;

    beams.children.forEach((b, i) => { b.material.opacity = 0.04 + Math.abs(Math.sin(t * 0.4 + i)) * 0.05; });

    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  }
  tick();

  /* ---- Resize / pause -------------------------------------------- */
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else tick();
  });

  function makeGlowTexture() {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,240,200,1)");
    grad.addColorStop(0.25, "rgba(212,175,55,0.8)");
    grad.addColorStop(1, "rgba(212,175,55,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    const tex = new THREE.Texture(c);
    tex.needsUpdate = true;
    return tex;
  }
})();
