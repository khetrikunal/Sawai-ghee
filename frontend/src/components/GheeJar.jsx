import React from 'react'

export default function GheeJar({ size = 200, className = '' }) {
  const h = Math.round(size * 1.35)
  return (
    <svg width={size} height={h} viewBox="0 0 200 270" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="jarBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1a5c3e" />
          <stop offset="30%" stopColor="#2d7a55" />
          <stop offset="70%" stopColor="#2d7a55" />
          <stop offset="100%" stopColor="#1a5c3e" />
        </linearGradient>
        <linearGradient id="jarShine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="40%" stopColor="rgba(255,255,255,0.13)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(201,149,42,0.18)" />
          <stop offset="100%" stopColor="rgba(201,149,42,0)" />
        </radialGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="100" cy="255" rx="55" ry="8" fill="rgba(0,0,0,0.15)" />

      {/* Glow */}a
      <ellipse cx="100" cy="135" rx="75" ry="80" fill="url(#glowGrad)" />

      {/* Jar body */}
      <rect x="45" y="58" width="110" height="168" rx="8" fill="url(#jarBody)" />
      <rect x="50" y="62" width="100" height="164" rx="6" fill="url(#jarShine)" />

      {/* Lid base */}
      <rect x="38" y="46" width="124" height="26" rx="4" fill="#1a5c3e" />
      <rect x="42" y="50" width="116" height="18" rx="3" fill="#2d7a55" />

      {/* Label area */}
      <rect x="55" y="90" width="90" height="100" rx="4" fill="#0f3a2a" opacity="0.88" />

      {/* Lotus ornament */}
      <text x="100" y="108" textAnchor="middle" fill="#c9952a" fontSize="11" fontFamily="serif">🪷</text>

      {/* Brand name */}
      <text x="100" y="124" textAnchor="middle" fill="#e4b84a" fontSize="13" fontFamily="'Cormorant Garamond', serif" fontWeight="bold">सवाई</text>

      {/* Sub text */}
      <text x="100" y="138" textAnchor="middle" fill="rgba(228,184,74,0.75)" fontSize="7" fontFamily="serif">गिर अमृत तूप</text>

      {/* Divider line */}
      <line x1="65" y1="143" x2="135" y2="143" stroke="rgba(201,149,42,0.4)" strokeWidth="0.5" />

      {/* A2 label */}
      <text x="100" y="157" textAnchor="middle" fill="#c9952a" fontSize="6.5" fontFamily="sans-serif" letterSpacing="1">A2 GIR COW GHEE</text>
      <text x="100" y="168" textAnchor="middle" fill="rgba(201,149,42,0.5)" fontSize="5.5" fontFamily="sans-serif" letterSpacing="0.5">BILONA METHOD</text>

      {/* Shine highlight */}
      <ellipse cx="80" cy="120" rx="5" ry="20" fill="rgba(255,255,255,0.06)" transform="rotate(-12,80,120)" />

      {/* Lid top (ghee surface) */}
      <ellipse cx="100" cy="58" rx="55" ry="10" fill="#c9952a" opacity="0.85" />
      <ellipse cx="100" cy="57" rx="44" ry="8" fill="#e4b84a" />
      <ellipse cx="100" cy="55" rx="36" ry="6" fill="#f5d87a" />
      <ellipse cx="100" cy="53" rx="24" ry="4" fill="#fffbe8" opacity="0.85" />
    </svg>
  )
}
