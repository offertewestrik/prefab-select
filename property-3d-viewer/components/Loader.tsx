"use client";

import { Html, useProgress } from "@react-three/drei";

/**
 * Suspense-fallback die binnen de Canvas leeft.
 * Toont een gouden voortgangsring met percentage terwijl het model laadt.
 */
export default function Loader() {
  const { progress } = useProgress();
  const pct = Math.round(progress);
  const circ = 2 * Math.PI * 24; // r = 24
  const offset = circ * (1 - pct / 100);

  return (
    <Html center>
      <div className="loader">
        <svg className="loader-ring" viewBox="0 0 56 56" aria-hidden>
          <circle
            cx="28"
            cy="28"
            r="24"
            fill="none"
            stroke="rgba(20,33,61,0.12)"
            strokeWidth="3"
          />
          <circle
            cx="28"
            cy="28"
            r="24"
            fill="none"
            stroke="#c9a76a"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            transform="rotate(-90 28 28)"
            style={{ transition: "stroke-dashoffset 0.3s ease" }}
          />
        </svg>
        <span className="loader-pct">{pct}%</span>
        <span className="loader-txt">Villa laden</span>
      </div>
    </Html>
  );
}
