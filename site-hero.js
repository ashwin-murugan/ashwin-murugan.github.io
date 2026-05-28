// site-hero.jsx — Hero + sticky nav for Ashwin's personal site (Stellar Cartographer)
// Theming is done entirely through CSS custom properties on :root.

const { useEffect, useState, useMemo, useRef } = React;

// ─── procedural star generator ────────────────────────────────────────────────
function genStars(seed, count, w, h) {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: count }, () => ({
    x: rand() * w,
    y: rand() * h,
    r: 0.4 + rand() * 1.6,
    o: 0.3 + rand() * 0.7,
    twinkle: rand() < 0.15,
    delay: rand() * 4,
  }));
}

function Starfield({ width, height, density = 1, seed = 11, parallaxY = 0, parallaxX = 0 }) {
  const stars = useMemo(
    () => genStars(seed, Math.round(width * height * 0.0004 * density), width, height),
    [width, height, density, seed]
  );

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        transform: `translate(${parallaxX}px, ${parallaxY}px)`,
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="heroGlow" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="var(--accent-glow-1)" />
          <stop offset="55%" stopColor="var(--accent-glow-2)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      <rect width={width} height={height} fill="url(#heroGlow)" />
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill="var(--star)"
          opacity={s.o}
          style={
            s.twinkle
              ? {
                  animation: `twinkle 3.2s ${s.delay}s infinite ease-in-out`,
                  transformOrigin: `${s.x}px ${s.y}px`,
                }
              : undefined
          }
        />
      ))}
    </svg>
  );
}

function ShootingStars({ on }) {
  if (!on) return null;
  return (
    <div className="shooting-layer" aria-hidden="true">
      <span className="shoot" style={{ top: '14%', left: '8%', animationDelay: '0s' }} />
      <span className="shoot" style={{ top: '32%', left: '46%', animationDelay: '6s' }} />
      <span className="shoot" style={{ top: '60%', left: '24%', animationDelay: '11s' }} />
    </div>
  );
}

// ─── constellation graphic (used by hero variant + cards) ─────────────────────
function Constellation({ points, w, h, glow = true, scale = 1 }) {
  return (
    <svg width={w} height={h} style={{ display: 'block', overflow: 'visible' }} aria-hidden="true">
      <g transform={`scale(${scale})`}>
        {points.slice(0, -1).map((p, i) => {
          const n = points[i + 1];
          return (
            <line
              key={'l' + i}
              x1={p[0]}
              y1={p[1]}
              x2={n[0]}
              y2={n[1]}
              stroke="var(--accent)"
              strokeOpacity="0.45"
              strokeWidth="1"
            />
          );
        })}
        {points.map((p, i) => (
          <g key={'p' + i}>
            {glow && <circle cx={p[0]} cy={p[1]} r="6" fill="var(--accent)" opacity="0.18" />}
            <circle cx={p[0]} cy={p[1]} r="2.4" fill="var(--accent)" />
          </g>
        ))}
      </g>
    </svg>
  );
}

// A larger ornamental constellation for the constellation hero variant
function HeroConstellation({ w, h }) {
  // semi-random but stable points
  const pts = [
    [w * 0.18, h * 0.25],
    [w * 0.28, h * 0.42],
    [w * 0.36, h * 0.32],
    [w * 0.5, h * 0.5],
    [w * 0.62, h * 0.36],
    [w * 0.72, h * 0.5],
    [w * 0.82, h * 0.34],
    [w * 0.58, h * 0.6],
    [w * 0.42, h * 0.66],
    [w * 0.3, h * 0.58],
    [w * 0.18, h * 0.25],
  ];
  return (
    <svg
      width="100%"
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {pts.slice(0, -1).map((p, i) => {
        const n = pts[i + 1];
        return (
          <line
            key={i}
            x1={p[0]}
            y1={p[1]}
            x2={n[0]}
            y2={n[1]}
            stroke="var(--accent)"
            strokeOpacity="0.35"
            strokeWidth="1.2"
          />
        );
      })}
      {pts.map((p, i) => (
        <g key={'pp' + i}>
          <circle cx={p[0]} cy={p[1]} r="10" fill="var(--accent)" opacity="0.12" />
          <circle cx={p[0]} cy={p[1]} r="3" fill="var(--accent)" />
        </g>
      ))}
    </svg>
  );
}

// ─── sticky nav now lives in site-shell.jsx (page-based) ──────────────────────

// ─── hero ─────────────────────────────────────────────────────────────────────
function Hero({ density, variant, shootingStars, onJump }) {
  const heroRef = useRef(null);
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);
  const [sy, setSy] = useState(0);

  useEffect(() => {
    const onMove = (e) => {
      const el = heroRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      setMx(nx * 18);
      setMy(ny * 14);
    };
    const onScroll = () => setSy(window.scrollY * 0.18);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const heroHeight = Math.round(window.innerHeight * 1.3);

  return (
    <section ref={heroRef} className="hero" style={{ height: heroHeight }}>
      <Starfield
        width={1600}
        height={heroHeight}
        density={density}
        parallaxX={mx}
        parallaxY={my - sy}
      />
      <ShootingStars on={shootingStars} />
      {variant === 'constellation' && (
        <div style={{ position: 'absolute', inset: 0, opacity: 0.7 }}>
          <HeroConstellation w={1600} h={heroHeight} />
        </div>
      )}
      {/* faint horizon */}
      <div className="hero-horizon" />

      {/* coordinates ticker */}
      <div className="hero-ticker">
        <span>LAT 42°21′N · LON 71°06′W</span>
        <span>MIT · CAMBRIDGE, MA</span>
        <span>EPOCH J2026.4</span>
      </div>

      {variant === 'constellation' ? (
        <HeroContentConstellation onJump={onJump} />
      ) : (
        <HeroContentTypographic onJump={onJump} />
      )}
    </section>
  );
}

function HeroContentTypographic({ onJump }) {
  return (
    <div className="hero-content typographic">
      <div className="hero-left fade-in">
        <div className="kicker accent">★ MIT AEROASTRO · DINAMO GROUP · NDSEG FELLOW '26</div>
        <h1 className="hero-name">
          Ashwin
          <br />
          <em className="accent">Murugan</em>
          <span className="accent">.</span>
        </h1>
        <p className="hero-tagline">
          Incoming MIT AeroAstro graduate student interested in drones, autonomous flight,
          AI for science, and aerospace systems that have to work outside the lab.
        </p>
      </div>
      <ObservingCard />
    </div>
  );
}

function HeroContentConstellation({ onJump }) {
  return (
    <div className="hero-content constellation">
      <div className="kicker accent" style={{ textAlign: 'center', marginBottom: 24 }}>
        ★ MIT AEROASTRO · DINAMO GROUP · NDSEG FELLOW '26
      </div>
      <h1 className="hero-name centered">
        Ashwin <em className="accent">Murugan</em>
        <span className="accent">.</span>
      </h1>
      <p className="hero-tagline centered">
        Incoming MIT AeroAstro graduate student interested in drones, autonomous flight,
        AI for science, and aerospace systems that have to work outside the lab.
      </p>
    </div>
  );
}

function ObservingCard() {
  return (
    <div className="observing-card fade-in delay-1">
      <div className="observing-tab">★ CURRENT FOCUS</div>
      <div className="observing-row">
        <Constellation
          w={120}
          h={120}
          points={[
            [16, 18],
            [60, 40],
            [44, 80],
            [96, 70],
            [110, 26],
            [60, 40],
          ]}
        />
        <div style={{ flex: 1 }}>
          <div className="meta">SCRAMJET ISOLATORS</div>
          <div className="observing-title">Back-pressure fluctuations in scramjet isolators</div>
          <div className="observing-blurb">
            Large-eddy simulations in OpenSBLI; manuscript in preparation for <em>J. Fluid Mech.</em>
          </div>
        </div>
      </div>
      <div className="observing-stats">
        {[
          ['MIT', 'AeroAstro', 'S.M./Ph.D.'],
          ['FELLOW', 'NDSEG', '2026'],
          ['IITM', '1 / 75', 'Aerospace'],
        ].map(([k, v, sub]) => (
          <div key={k} className="stat">
            <div className="stat-key">{k}</div>
            <div className="stat-val accent">{v}</div>
            <div className="stat-sub">{sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  Hero,
  Constellation,
  HeroConstellation,
  Starfield,
});
