/* Maakt een screenshot van de gebouwde, draaiende viewer (out/3d-viewer/).
   Dev-tool. Vereist: npm run build  +  npm i -D puppeteer
   Gebruik: node tools/screenshot-viewer.mjs [out.png] */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.resolve(root, "out");
const target = process.argv[2] || "/tmp/viewer-shot.png";

const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".glb": "model/gltf-binary",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".json": "application/json",
};
const server = http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split("?")[0]);
  let file = path.join(outDir, url);
  if (url.endsWith("/")) file = path.join(outDir, url, "index.html");
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    const alt = path.join(outDir, url + ".html");
    if (fs.existsSync(alt)) file = alt;
  }
  if (!fs.existsSync(file)) {
    res.statusCode = 404;
    return res.end("nf");
  }
  res.setHeader("content-type", types[path.extname(file)] || "application/octet-stream");
  fs.createReadStream(file).pipe(res);
});

await new Promise((r) => server.listen(0, r));
const port = server.address().port;
const browser = await puppeteer.launch({
  headless: true,
  args: [
    "--no-sandbox",
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    "--ignore-gpu-blocklist",
  ],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
page.on("pageerror", (e) => console.log("[pageerror]", e.message));
page.on("console", (m) => {
  const t = m.text();
  if (/error|fail|warn/i.test(t)) console.log("[page]", t);
});
await page.goto(`http://localhost:${port}/3d-viewer/`, { waitUntil: "networkidle2", timeout: 60000 });
// geef WebGL + model tijd om te laden en de auto-rotate een mooie hoek
await new Promise((r) => setTimeout(r, 9000));
await page.screenshot({ path: target });
console.log("screenshot →", target);
await browser.close();
server.close();
