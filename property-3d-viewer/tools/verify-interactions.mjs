/* Klikt door de viewer-UI heen en maakt screenshots — dev-verificatie. */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../out");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".glb": "model/gltf-binary", ".png": "image/png", ".webp": "image/webp", ".json": "application/json", ".woff2": "font/woff2" };
const server = http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split("?")[0]);
  let file = path.join(outDir, url.endsWith("/") ? url + "index.html" : url);
  if (!fs.existsSync(file) && fs.existsSync(file + ".html")) file += ".html";
  if (!fs.existsSync(file)) { res.statusCode = 404; return res.end("nf"); }
  res.setHeader("content-type", types[path.extname(file)] || "application/octet-stream");
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, r));
const port = server.address().port;
const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
await page.goto(`http://localhost:${port}/3d-viewer/`, { waitUntil: "networkidle2", timeout: 60000 });
await wait(8000);

// 1) klik een hotspot (eerste .hotspot knop) → infopaneel
const clickedHotspot = await page.evaluate(() => {
  const h = document.querySelector(".hotspot");
  if (h) { h.click(); return true; }
  return false;
});
await wait(2500);
await page.screenshot({ path: "/tmp/v-hotspot.png" });
console.log("hotspot clicked:", clickedHotspot, "panel:", await page.evaluate(() => !!document.querySelector(".info-panel")));

// 2) nachtmodus (maan-knop = 2e icon-btn)
await page.evaluate(() => {
  const b = [...document.querySelectorAll(".ui-top-right .icon-btn")][1];
  b && b.click();
});
await wait(2000);
await page.screenshot({ path: "/tmp/v-night.png" });

// 3) plattegrond openen
await page.evaluate(() => {
  const close = document.querySelector(".info-panel .ip-close"); close && close.click();
});
await wait(500);
await page.evaluate(() => {
  const b = [...document.querySelectorAll(".pill")].find((e) => /Plattegrond/i.test(e.textContent));
  b && b.click();
});
await wait(1200);
await page.screenshot({ path: "/tmp/v-floor.png" });
console.log("floor overlay:", await page.evaluate(() => !!document.querySelector(".floor-overlay")));

await browser.close();
server.close();
console.log("done");
