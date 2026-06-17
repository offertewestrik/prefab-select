/* =====================================================================
   Meridian Crowne — Three.js loader
   Loads THREE from a local vendored copy first (for offline / air-gapped
   deployments), then falls back across CDNs. Once THREE is available it
   boots the hero scene. If every source fails, the CSS hero (veil + grid)
   remains — the page is never broken.

   To go fully offline, drop a copy at assets/vendor/three.min.js:
     curl -L -o assets/vendor/three.min.js \
       https://unpkg.com/three@0.128.0/build/three.min.js
   ===================================================================== */
(function () {
  var SOURCES = [
    "assets/vendor/three.min.js",
    "https://unpkg.com/three@0.128.0/build/three.min.js",
    "https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js",
  ];

  function loadScene() {
    var s = document.createElement("script");
    s.src = "assets/js/scene.js";
    document.body.appendChild(s);
  }

  function tryNext(i) {
    if (typeof THREE !== "undefined") return loadScene();
    if (i >= SOURCES.length) return; // graceful: CSS hero remains
    var s = document.createElement("script");
    s.src = SOURCES[i];
    s.onload = function () { (typeof THREE !== "undefined") ? loadScene() : tryNext(i + 1); };
    s.onerror = function () { tryNext(i + 1); };
    document.head.appendChild(s);
  }

  tryNext(0);
})();
