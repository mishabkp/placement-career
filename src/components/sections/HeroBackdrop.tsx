/**
 * HeroBackdrop — an original, minimal vector motif for the hero section.
 *
 * Concept: a rising "readiness path" threading through a faint node
 * network, evoking both a career trajectory and an AI knowledge graph —
 * the two ideas the product sits between. Everything here is generated
 * geometry (no photography, no third-party artwork), kept very low
 * opacity so it reads as texture rather than an illustration and never
 * competes with the headline for contrast.
 */
export function HeroBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Fine dot-grid, fading toward the edges */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.35]"
        style={{ maskImage: 'radial-gradient(ellipse 70% 60% at 50% 35%, black 20%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 35%, black 20%, transparent 75%)' }}
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1600 900"
        fill="none"
      >
        <defs>
          <pattern id="hero-dot-grid" width="34" height="34" patternUnits="userSpaceOnUse">
            <circle cx="1.4" cy="1.4" r="1.4" fill="#3A4254" />
          </pattern>
        </defs>
        <rect width="1600" height="900" fill="url(#hero-dot-grid)" />
      </svg>

      {/* Ascending readiness path + knowledge-graph nodes */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ maskImage: 'radial-gradient(ellipse 65% 55% at 50% 30%, black 10%, transparent 78%)', WebkitMaskImage: 'radial-gradient(ellipse 65% 55% at 50% 30%, black 10%, transparent 78%)' }}
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1600 900"
        fill="none"
      >
        {/* thin connective lines between nodes, like a graph */}
        <g stroke="#C8952E" strokeOpacity="0.16" strokeWidth="1">
          <line x1="180" y1="620" x2="420" y2="480" />
          <line x1="420" y1="480" x2="360" y2="300" />
          <line x1="420" y1="480" x2="640" y2="520" />
          <line x1="640" y1="520" x2="760" y2="340" />
          <line x1="760" y1="340" x2="980" y2="380" />
          <line x1="980" y1="380" x2="920" y2="200" />
          <line x1="980" y1="380" x2="1180" y2="260" />
          <line x1="1180" y1="260" x2="1360" y2="330" />
          <line x1="1180" y1="260" x2="1260" y2="120" />
        </g>

        {/* the primary rising path, drawn slightly bolder in gold */}
        <path
          d="M160 640 C 320 560, 380 460, 430 470 C 560 500, 600 560, 660 510 C 740 440, 720 350, 780 335 C 900 305, 960 400, 1000 370 C 1080 310, 1100 220, 1190 255 C 1290 295, 1300 210, 1380 150"
          stroke="#C8952E"
          strokeOpacity="0.55"
          strokeWidth="1.75"
          strokeLinecap="round"
          fill="none"
        />

        {/* node markers along the graph, alternating brand hues */}
        {[
          { x: 180, y: 620, r: 4, hue: '#C8952E' },
          { x: 420, y: 480, r: 5, hue: '#1E7F76' },
          { x: 360, y: 300, r: 3, hue: '#C8952E' },
          { x: 640, y: 520, r: 4, hue: '#C8952E' },
          { x: 760, y: 340, r: 5, hue: '#1E7F76' },
          { x: 980, y: 380, r: 5, hue: '#C8952E' },
          { x: 920, y: 200, r: 3, hue: '#1E7F76' },
          { x: 1180, y: 260, r: 6, hue: '#C8952E' },
          { x: 1360, y: 330, r: 3, hue: '#1E7F76' },
          { x: 1260, y: 120, r: 4, hue: '#C8952E' },
        ].map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={n.hue} fillOpacity="0.5" />
        ))}
      </svg>
    </div>
  );
}
