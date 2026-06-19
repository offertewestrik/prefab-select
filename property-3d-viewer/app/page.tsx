import Link from "next/link";

export default function Home() {
  return (
    <main className="page">
      <header className="page-hero">
        <span className="eyebrow">Droomhuis in Dubai</span>
        <h1>Luxe 3D-villatour</h1>
        <p>Loop digitaal door exclusieve woningen in Dubai.</p>
      </header>
      <div className="under-cta">
        <Link className="btn-gold" href="/3d-viewer">
          Open de 3D-viewer
        </Link>
      </div>
    </main>
  );
}
