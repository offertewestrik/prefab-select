"use client";

import { useEffect, useRef } from "react";

/** Eenvoudige handtekening-pad (muis + touch). Geeft een PNG-dataURL terug. */
export function SignaturePad({ onChange }: { onChange: (dataUrl: string | null) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tekenen = useRef(false);
  const leeg = useRef(true);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#0f172a";
    }
  }, []);

  function pos(e: React.MouseEvent | React.TouchEvent) {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    const t = "touches" in e ? e.touches[0] : (e as React.MouseEvent);
    return { x: (t.clientX - r.left) * (c.width / r.width), y: (t.clientY - r.top) * (c.height / r.height) };
  }
  function start(e: React.MouseEvent | React.TouchEvent) {
    tekenen.current = true;
    leeg.current = false;
    const ctx = canvasRef.current!.getContext("2d")!;
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  }
  function move(e: React.MouseEvent | React.TouchEvent) {
    if (!tekenen.current) return;
    if ("touches" in e) e.preventDefault();
    const ctx = canvasRef.current!.getContext("2d")!;
    const p = pos(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  }
  function end() {
    if (!tekenen.current) return;
    tekenen.current = false;
    onChange(leeg.current ? null : canvasRef.current!.toDataURL("image/png"));
  }
  function wis() {
    const c = canvasRef.current!;
    c.getContext("2d")!.clearRect(0, 0, c.width, c.height);
    leeg.current = true;
    onChange(null);
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={520}
        height={170}
        className="w-full touch-none rounded-lg border border-slate-300 bg-white"
        onMouseDown={start}
        onMouseMove={move}
        onMouseUp={end}
        onMouseLeave={end}
        onTouchStart={start}
        onTouchMove={move}
        onTouchEnd={end}
      />
      <button type="button" onClick={wis} className="mt-1 text-xs font-semibold text-slate-500 hover:text-slate-800">
        Wissen
      </button>
    </div>
  );
}
