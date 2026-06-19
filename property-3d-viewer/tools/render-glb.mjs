/* Headless render van een GLB naar PNG's vanuit meerdere hoeken.
   Optionele dev-tool om een model te controleren — NIET nodig om de viewer
   te draaien. Eenmalig installeren:  npm i -D puppeteer
   Gebruik:  node tools/render-glb.mjs <pad-naar-glb> [outDir]
   Rendert via Puppeteer + three.js (WebGL in headless Chromium). */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const glbPath = process.argv[2] || "public/models/villa-dubai.glb";
const outDir = process.argv[3] || "/tmp/villa-render";
fs.mkdirSync(outDir, { recursive: true });

// kleine statische server zodat de browser three + de glb kan laden
const server = http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split("?")[0]);
  let file;
  if (url === "/model.glb") file = path.resolve(root, glbPath);
  else if (url.startsWith("/three/")) file = path.resolve(root, "node_modules/three", url.slice(7));
  else if (url === "/") file = null;
  else file = path.resolve(root, "." + url);
  if (!file) {
    res.setHeader("content-type", "text/html");
    return res.end(PAGE);
  }
  if (!fs.existsSync(file)) {
    res.statusCode = 404;
    return res.end("nf");
  }
  const ext = path.extname(file);
  const ct =
    ext === ".js" ? "text/javascript" : ext === ".glb" ? "model/gltf-binary" : "application/octet-stream";
  res.setHeader("content-type", ct);
  fs.createReadStream(file).pipe(res);
});

const PAGE = `<!doctype html><html><head><meta charset=utf8><style>html,body{margin:0;background:#dce8f2}</style>
<script type="importmap">{"imports":{"three":"/three/build/three.module.js","three/addons/":"/three/examples/jsm/"}}</script></head>
<body><canvas id=c width=900 height=900></canvas>
<script type="module">
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
const canvas=document.getElementById('c');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,preserveDrawingBuffer:true});
renderer.setSize(900,900,false);
renderer.toneMapping=THREE.ACESFilmicToneMapping;
const scene=new THREE.Scene();scene.background=new THREE.Color('#dce8f2');
const pmrem=new THREE.PMREMGenerator(renderer);
scene.environment=pmrem.fromScene(new RoomEnvironment(),0.04).texture;
const cam=new THREE.PerspectiveCamera(42,1,0.1,100);
const dir=new THREE.DirectionalLight('#fff4e0',1.6);dir.position.set(8,12,6);scene.add(dir);
scene.add(new THREE.AmbientLight('#ffffff',0.4));
const loader=new GLTFLoader();
const draco=new DRACOLoader();
draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
loader.setDRACOLoader(draco);
loader.setMeshoptDecoder(MeshoptDecoder);
window.__ready=false;window.__err=null;
loader.load('/model.glb',(g)=>{
  const root=g.scene;
  const box=new THREE.Box3().setFromObject(root);
  const size=new THREE.Vector3();const center=new THREE.Vector3();
  box.getSize(size);box.getCenter(center);
  const maxDim=Math.max(size.x,size.z)||1;const s=6/maxDim;
  root.scale.setScalar(s);
  root.position.set(-center.x*s,-box.min.y*s,-center.z*s);
  scene.add(root);
  window.__info={size:[size.x,size.y,size.z],scale:s};
  window.__ready=true;
},undefined,(e)=>{window.__err=String(e);window.__ready=true;});
window.__shoot=(az,el,dist)=>{
  const a=az*Math.PI/180, e=el*Math.PI/180;
  cam.position.set(Math.cos(a)*Math.cos(e)*dist, Math.sin(e)*dist, Math.sin(a)*Math.cos(e)*dist);
  cam.lookAt(0,1.4,0);cam.updateProjectionMatrix();
  renderer.render(scene,cam);
  return canvas.toDataURL('image/png');
};
</script></body></html>`;

await new Promise((r) => server.listen(0, r));
const port = server.address().port;
const browser = await puppeteer.launch({
  headless: true,
  args: [
    "--no-sandbox",
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    "--enable-webgl",
    "--ignore-gpu-blocklist",
    "--disable-gpu-sandbox",
  ],
});
const page = await browser.newPage();
page.on("console", (m) => console.log("[page]", m.text()));
await page.goto(`http://localhost:${port}/`, { waitUntil: "networkidle0" });
await page.waitForFunction("window.__ready===true", { timeout: 60000 });
const info = await page.evaluate(() => ({ err: window.__err, info: window.__info }));
if (info.err) {
  console.error("LOAD ERROR:", info.err);
  await browser.close();
  server.close();
  process.exit(1);
}
console.log("model info:", JSON.stringify(info.info));
const shots = [
  ["front", 90, 18, 13],
  ["hero", 45, 22, 13],
  ["side", 5, 16, 13],
  ["top", 90, 70, 13],
];
for (const [name, az, el, dist] of shots) {
  const data = await page.evaluate((az, el, dist) => window.__shoot(az, el, dist), az, el, dist);
  const b64 = data.split(",")[1];
  fs.writeFileSync(path.join(outDir, `${name}.png`), Buffer.from(b64, "base64"));
  console.log("wrote", name);
}
await browser.close();
server.close();
console.log("done →", outDir);
