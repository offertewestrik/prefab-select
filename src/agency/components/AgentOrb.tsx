import React from 'react';

/**
 * Glossy 3D "glow orb" used as an AI-agent avatar (à la the reference design).
 * Pure CSS: a radial gradient sphere with a specular highlight and a coloured
 * outer glow. `active` agents get a stronger, pulsing glow.
 */
export function AgentOrb({
  color, size = 56, active = false, dim = false,
}: {
  color: string;
  size?: number;
  active?: boolean;
  dim?: boolean;
}) {
  return (
    <span
      className={active ? 'acc-orb-active' : undefined}
      style={{
        position: 'relative',
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        flexShrink: 0,
        background: `radial-gradient(circle at 33% 27%, rgba(255,255,255,0.95), ${color} 46%, ${color} 58%, rgba(0,0,0,0.55) 100%)`,
        boxShadow: active
          ? `0 0 26px 3px ${color}aa, 0 8px 20px -6px ${color}88, inset -3px -5px 10px rgba(0,0,0,0.45)`
          : `0 6px 18px -6px ${color}88, inset -3px -5px 10px rgba(0,0,0,0.45)`,
        opacity: dim ? 0.45 : 1,
        transition: 'opacity .25s ease, box-shadow .25s ease',
        // expose the colour for the pulse keyframe
        ['--orb' as any]: color,
      }}
    >
      {/* specular highlight */}
      <span
        style={{
          position: 'absolute',
          top: '14%',
          left: '20%',
          width: '34%',
          height: '24%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.9), rgba(255,255,255,0) 70%)',
          filter: 'blur(1px)',
        }}
      />
    </span>
  );
}
