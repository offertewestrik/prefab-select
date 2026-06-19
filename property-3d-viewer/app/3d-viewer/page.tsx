import dynamic from "next/dynamic";

// 3D-viewer alleen client-side laden (Three.js draait niet op de server)
const Property3DViewer = dynamic(() => import("@/components/Property3DViewer"), {
  ssr: false,
});

export default function ThreeDViewerPage() {
  return (
    <main className="page">
      <header className="page-hero">
        <span className="eyebrow">Virtuele rondleiding</span>
        <h1>Bekijk deze villa in 3D</h1>
        <p>Loop digitaal door exclusieve woningen in Dubai.</p>
      </header>

      <Property3DViewer />

      <section className="under-cta">
        <p>Klaar om deze woning in het echt te zien?</p>
        <a className="btn-gold" href="https://wa.me/971521299081" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          Plan een bezichtiging
        </a>
      </section>
    </main>
  );
}
