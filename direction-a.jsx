// Direction A — Stellar Cartographer
// Deep cosmos navy/black, star field + constellation lines, warm amber accent,
// editorial serif headlines + mono metadata.

const A_PALETTE = {
  bg: '#070a14',
  bg2: '#0c1120',
  ink: '#e9e4d4',
  dim: '#8a8676',
  line: 'rgba(233,228,212,0.12)',
  amber: '#e8a04a',
  amberSoft: 'rgba(232,160,74,0.18)',
  star: '#f4ecd0',
};

const aFonts = {
  display: '"DM Serif Display", "Source Serif Pro", Georgia, serif',
  body: '"Source Serif Pro", "Crimson Text", Georgia, serif',
  mono: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace',
};

// Procedurally-placed stars for the hero backdrop. Seeded so it's stable.
function aStars(seed, count, w, h) {
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
  }));
}

function AStarfield({ width, height, density = 1, seed = 7 }) {
  const stars = React.useMemo(
    () => aStars(seed, Math.round(width * height * 0.0004 * density), width, height),
    [width, height, density, seed]
  );
  return (
    <svg
      width={width}
      height={height}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="aGlowG" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="rgba(232,160,74,0.18)" />
          <stop offset="60%" stopColor="rgba(232,160,74,0.04)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      <rect width={width} height={height} fill="url(#aGlowG)" />
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={A_PALETTE.star} opacity={s.o} />
      ))}
    </svg>
  );
}

// A small constellation graphic — points + connecting lines.
function AConstellation({ points, w, h, glow = true }) {
  return (
    <svg width={w} height={h} style={{ display: 'block', overflow: 'visible' }} aria-hidden="true">
      {points.slice(0, -1).map((p, i) => {
        const n = points[i + 1];
        return (
          <line
            key={'l' + i}
            x1={p[0]}
            y1={p[1]}
            x2={n[0]}
            y2={n[1]}
            stroke={A_PALETTE.amber}
            strokeOpacity="0.45"
            strokeWidth="1"
          />
        );
      })}
      {points.map((p, i) => (
        <g key={'p' + i}>
          {glow && (
            <circle cx={p[0]} cy={p[1]} r="6" fill={A_PALETTE.amber} opacity="0.18" />
          )}
          <circle cx={p[0]} cy={p[1]} r="2.4" fill={A_PALETTE.amber} />
        </g>
      ))}
    </svg>
  );
}

function ASectionLabel({ index, label }) {
  return (
    <div
      style={{
        fontFamily: aFonts.mono,
        fontSize: 11,
        letterSpacing: '0.22em',
        color: A_PALETTE.dim,
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        marginBottom: 36,
      }}
    >
      <span style={{ color: A_PALETTE.amber }}>★ {index}</span>
      <span style={{ flex: '0 0 28px', height: 1, background: A_PALETTE.line }} />
      <span>{label}</span>
    </div>
  );
}

function ANav() {
  const items = ['Research', 'Projects', 'Experience', 'Awards', 'Writing', 'Contact'];
  return (
    <div
      style={{
        position: 'absolute',
        top: 32,
        left: 64,
        right: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: aFonts.mono,
        fontSize: 12,
        color: A_PALETTE.dim,
        letterSpacing: '0.14em',
        zIndex: 3,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: 11,
            border: `1px solid ${A_PALETTE.amber}`,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: A_PALETTE.amber,
            fontFamily: aFonts.display,
            fontSize: 13,
          }}
        >
          a
        </span>
        <span style={{ color: A_PALETTE.ink, letterSpacing: '0.18em' }}>ASHWIN · MURUGAN</span>
        <span style={{ color: A_PALETTE.dim }}>— STAR CHART</span>
      </div>
      <div style={{ display: 'flex', gap: 28 }}>
        {items.map((x) => (
          <span key={x} style={{ textTransform: 'uppercase' }}>
            {x}
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: 6,
            background: A_PALETTE.amber,
            boxShadow: `0 0 8px ${A_PALETTE.amber}`,
          }}
        />
        <span>OBSERVING · MIT '30</span>
      </div>
    </div>
  );
}

function AHero({ w }) {
  return (
    <div
      style={{
        position: 'relative',
        height: 820,
        background: `linear-gradient(180deg, ${A_PALETTE.bg} 0%, ${A_PALETTE.bg2} 100%)`,
        overflow: 'hidden',
      }}
    >
      <AStarfield width={w} height={820} seed={11} density={1.2} />
      {/* faint horizon */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 220,
          background: `linear-gradient(180deg, rgba(232,160,74,0) 0%, rgba(232,160,74,0.06) 60%, rgba(232,160,74,0.12) 100%)`,
        }}
      />
      <ANav />

      {/* coordinates ticker */}
      <div
        style={{
          position: 'absolute',
          top: 110,
          left: 64,
          right: 64,
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: aFonts.mono,
          fontSize: 11,
          color: A_PALETTE.dim,
          letterSpacing: '0.16em',
        }}
      >
        <span>RA 14h 39m · DEC −60° 50′</span>
        <span>FIELD NO. 001 — INTRODUCTION</span>
        <span>EPOCH J2026.4</span>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 64,
          right: 64,
          top: 200,
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 60,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: aFonts.mono,
              fontSize: 12,
              color: A_PALETTE.amber,
              letterSpacing: '0.3em',
              marginBottom: 24,
            }}
          >
            ★ MAGNITUDE 1 · MIT DINAMO LAB · NDSEG FELLOW '26
          </div>
          <div
            style={{
              fontFamily: aFonts.display,
              fontSize: 132,
              lineHeight: 0.92,
              color: A_PALETTE.ink,
              letterSpacing: '-0.02em',
            }}
          >
            Ashwin
            <br />
            <span style={{ fontStyle: 'italic', color: A_PALETTE.amber }}>Murugan</span>
            <span style={{ color: A_PALETTE.amber }}>.</span>
          </div>
          <div
            style={{
              fontFamily: aFonts.body,
              fontStyle: 'italic',
              fontSize: 26,
              lineHeight: 1.45,
              color: A_PALETTE.ink,
              marginTop: 40,
              maxWidth: 640,
            }}
          >
            Aerospace researcher charting the small, fast, and unsteady — shock trains in
            scramjets, micron-scale flyers riding sound waves, and the propulsion machinery that
            gets things off the ground.
          </div>
          <div
            style={{
              marginTop: 44,
              display: 'flex',
              gap: 16,
              alignItems: 'center',
              fontFamily: aFonts.mono,
              fontSize: 12,
              letterSpacing: '0.18em',
              color: A_PALETTE.dim,
            }}
          >
            <button
              style={{
                background: A_PALETTE.amber,
                color: A_PALETTE.bg,
                padding: '14px 24px',
                border: 'none',
                fontFamily: aFonts.mono,
                fontSize: 12,
                letterSpacing: '0.22em',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              OPEN STAR CHART →
            </button>
            <span>or scroll for catalogue</span>
          </div>
        </div>

        {/* hero side: a "now observing" card */}
        <div
          style={{
            border: `1px solid ${A_PALETTE.line}`,
            background: 'rgba(12,17,32,0.6)',
            backdropFilter: 'blur(4px)',
            padding: 28,
            position: 'relative',
            alignSelf: 'start',
            marginTop: 30,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -8,
              left: 20,
              background: A_PALETTE.bg,
              padding: '0 10px',
              fontFamily: aFonts.mono,
              fontSize: 10,
              color: A_PALETTE.amber,
              letterSpacing: '0.3em',
            }}
          >
            ★ NOW OBSERVING
          </div>

          <div style={{ display: 'flex', gap: 14, marginTop: 4 }}>
            <AConstellation
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
              <div
                style={{
                  fontFamily: aFonts.mono,
                  fontSize: 10,
                  color: A_PALETTE.dim,
                  letterSpacing: '0.2em',
                }}
              >
                FIELD A · SCRAMJETS
              </div>
              <div
                style={{
                  fontFamily: aFonts.display,
                  fontSize: 22,
                  color: A_PALETTE.ink,
                  marginTop: 6,
                  lineHeight: 1.2,
                }}
              >
                Shock train stability under back-pressure noise
              </div>
              <div
                style={{
                  fontFamily: aFonts.body,
                  fontSize: 14,
                  color: A_PALETTE.dim,
                  marginTop: 10,
                  lineHeight: 1.5,
                }}
              >
                LES with OpenSBLI · in prep for <em>J. Fluid Mech.</em>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 24,
              paddingTop: 20,
              borderTop: `1px solid ${A_PALETTE.line}`,
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: 16,
              fontFamily: aFonts.mono,
              fontSize: 11,
              color: A_PALETTE.dim,
            }}
          >
            {[
              ['RANK', '1 / 75', 'Aero IITM'],
              ['JEE ADV', 'AIR 156', '150K+'],
              ['CGPA', '9.92', '/ 10'],
            ].map(([k, v, sub]) => (
              <div key={k}>
                <div style={{ letterSpacing: '0.18em' }}>{k}</div>
                <div
                  style={{
                    fontFamily: aFonts.display,
                    fontSize: 26,
                    color: A_PALETTE.amber,
                    marginTop: 6,
                  }}
                >
                  {v}
                </div>
                <div style={{ marginTop: 4 }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AAbout() {
  return (
    <section style={{ padding: '120px 64px 80px', position: 'relative', background: A_PALETTE.bg }}>
      <ASectionLabel index="01" label="Field I · About" />
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 80 }}>
        <div>
          <div
            style={{
              fontFamily: aFonts.display,
              fontSize: 56,
              lineHeight: 1.05,
              color: A_PALETTE.ink,
              letterSpacing: '-0.01em',
            }}
          >
            I grew up squinting at rockets and never quite{' '}
            <span style={{ fontStyle: 'italic', color: A_PALETTE.amber }}>stopped looking up.</span>
          </div>
          <div
            style={{
              fontFamily: aFonts.body,
              fontSize: 19,
              lineHeight: 1.65,
              color: A_PALETTE.ink,
              marginTop: 40,
              maxWidth: 720,
            }}
          >
            <p style={{ margin: 0 }}>
              I'm a first-year PhD student at MIT, joining the{' '}
              <span style={{ color: A_PALETTE.amber }}>DINAMO Lab</span> under the NDSEG
              Fellowship. Before that I finished my B.Tech in Aerospace Engineering at IIT Madras
              — first in the department, with detours through hypersonic wind tunnels in
              Bangalore, microflyer fabrication at EPFL, and a propulsion stint at Agnikul Cosmos.
            </p>
            <p style={{ marginTop: 18 }}>
              The thread through all of it: things that move <em>fast</em>, things that move
              <em> small</em>, and the unsteady fluid dynamics that decide whether either of those
              things actually fly. Lately I've been getting curious about what neural operators
              and reduced-order models can do for the kind of CFD I run on a daily basis.
            </p>
          </div>
        </div>

        <div
          style={{
            border: `1px solid ${A_PALETTE.line}`,
            padding: 28,
            fontFamily: aFonts.mono,
            fontSize: 13,
            color: A_PALETTE.dim,
            lineHeight: 1.9,
            alignSelf: 'start',
          }}
        >
          <div style={{ color: A_PALETTE.amber, letterSpacing: '0.22em', marginBottom: 14 }}>
            ☉ CURRENTLY
          </div>
          <div>→ Cambridge, MA</div>
          <div>→ Starting PhD · MIT AeroAstro</div>
          <div>→ Wrapping a manuscript on shock-train stability</div>
          <div>→ Re-reading Anderson's <em>Hypersonics</em></div>
          <div style={{ color: A_PALETTE.amber, letterSpacing: '0.22em', margin: '22px 0 14px' }}>
            ☉ ALWAYS THINKING ABOUT
          </div>
          <div>→ Why scramjets unstart</div>
          <div>→ Acoustic levitation</div>
          <div>→ Whether we can fly things on Titan</div>
          <div>→ The right loss for a Fourier neural operator</div>
        </div>
      </div>
    </section>
  );
}

function AResearch() {
  const items = [
    {
      tag: 'IN PREP · JFM',
      title: 'Shock Train Stability in Scramjet Isolators under Back-Pressure Fluctuations',
      authors: 'A. S. Murugan, T. M. Muruganandam',
      blurb:
        'Using LES with OpenSBLI to resolve unsteady shock-boundary layer coupling, then deriving an isolator design criterion that keeps the engine from unstarting when the combustor talks back.',
      year: '2025',
    },
    {
      tag: 'IN PREP · SCI. ADV.',
      title:
        'Characterization of Helmholtz Resonators for Acoustic Force Generation and Microflight',
      authors: 'J. Hwang, A. S. Murugan, Q. Angéloz',
      blurb:
        'One of the smallest artificial flyers ever built — a millimetre-scale resonator lifted by a 40 kHz transducer array. Fabricated with two-photon polymerization at EPFL.',
      year: '2025',
    },
    {
      tag: 'ONGOING · IIT MADRAS',
      title: 'Particle-Induced Erosion in Solid Rocket Motor Nozzles',
      authors: 'with Prof. P. A. Ramakrishna',
      blurb:
        'Multiphase CFD of SRM exhaust against full-scale firing data — building empirical deposition / erosion models that hold up at the throat.',
      year: '2025–',
    },
  ];

  return (
    <section style={{ padding: '80px 64px', background: A_PALETTE.bg }}>
      <ASectionLabel index="02" label="Field II · Research & Publications" />
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 50,
        }}
      >
        <div
          style={{
            fontFamily: aFonts.display,
            fontSize: 64,
            color: A_PALETTE.ink,
            letterSpacing: '-0.01em',
            lineHeight: 1,
          }}
        >
          What I'm <span style={{ fontStyle: 'italic', color: A_PALETTE.amber }}>looking at.</span>
        </div>
        <div
          style={{
            fontFamily: aFonts.mono,
            fontSize: 12,
            color: A_PALETTE.dim,
            letterSpacing: '0.2em',
          }}
        >
          [ 03 ENTRIES ]
        </div>
      </div>

      <div>
        {items.map((it, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '100px 1fr 220px',
              gap: 40,
              padding: '34px 0',
              borderTop: `1px solid ${A_PALETTE.line}`,
              alignItems: 'start',
            }}
          >
            <div
              style={{
                fontFamily: aFonts.display,
                fontSize: 44,
                color: A_PALETTE.amber,
                lineHeight: 1,
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>
            <div>
              <div
                style={{
                  fontFamily: aFonts.mono,
                  fontSize: 10,
                  color: A_PALETTE.amber,
                  letterSpacing: '0.26em',
                  marginBottom: 12,
                }}
              >
                ★ {it.tag}
              </div>
              <div
                style={{
                  fontFamily: aFonts.display,
                  fontSize: 30,
                  color: A_PALETTE.ink,
                  lineHeight: 1.2,
                  letterSpacing: '-0.005em',
                }}
              >
                {it.title}
              </div>
              <div
                style={{
                  fontFamily: aFonts.body,
                  fontStyle: 'italic',
                  fontSize: 15,
                  color: A_PALETTE.dim,
                  marginTop: 10,
                }}
              >
                {it.authors}
              </div>
              <div
                style={{
                  fontFamily: aFonts.body,
                  fontSize: 17,
                  color: A_PALETTE.ink,
                  lineHeight: 1.55,
                  marginTop: 14,
                  maxWidth: 700,
                }}
              >
                {it.blurb}
              </div>
            </div>
            <div
              style={{
                fontFamily: aFonts.mono,
                fontSize: 11,
                color: A_PALETTE.dim,
                letterSpacing: '0.18em',
                textAlign: 'right',
              }}
            >
              <div>{it.year}</div>
              <div style={{ marginTop: 14, color: A_PALETTE.amber }}>→ READ DRAFT</div>
            </div>
          </div>
        ))}
        <div style={{ borderTop: `1px solid ${A_PALETTE.line}` }} />
      </div>
    </section>
  );
}

function AProjects({ w }) {
  const projects = [
    {
      label: 'AstroSim',
      tag: 'Astronomy · C++',
      blurb:
        'N-body solver simulating the Andromeda–Milky Way collision with 100K+ bodies. Barnes-Hut octree + parallelism for an 8× speed-up.',
      points: [
        [40, 30],
        [110, 60],
        [70, 120],
        [180, 100],
        [150, 50],
        [200, 160],
      ],
    },
    {
      label: 'SUAS 2025',
      tag: 'Autonomy · UAV',
      blurb:
        'Autonomous quadcopter for the Student UAS competition — synthetic-Blender datasets, real-time ground marker detection, precision payload drop.',
      points: [
        [20, 100],
        [80, 60],
        [140, 90],
        [180, 40],
        [220, 130],
      ],
    },
    {
      label: 'HydroChurn',
      tag: 'Hardware · UN Millennium Fellow',
      blurb:
        'Portable, self-sustaining water bottle. Runner-up at the James Dyson Award 2024 (India). Now being scaled with the UN Millennium Fellowship.',
      points: [
        [60, 40],
        [120, 80],
        [60, 140],
        [180, 120],
        [200, 50],
      ],
    },
    {
      label: 'FNO Aerospace',
      tag: 'ML for CFD',
      blurb:
        'Fourier neural operator for transient flow over parameterized elliptical bodies + an ROM-based morphing-airfoil controller for constant-lift in turbulence.',
      points: [
        [30, 60],
        [80, 130],
        [140, 100],
        [200, 60],
        [220, 150],
      ],
    },
  ];

  return (
    <section style={{ padding: '80px 64px', background: A_PALETTE.bg2 }}>
      <ASectionLabel index="03" label="Field III · Projects & Side Quests" />
      <div
        style={{
          fontFamily: aFonts.display,
          fontSize: 64,
          color: A_PALETTE.ink,
          letterSpacing: '-0.01em',
          marginBottom: 50,
          lineHeight: 1,
        }}
      >
        Things I <span style={{ fontStyle: 'italic', color: A_PALETTE.amber }}>built</span> when
        nobody asked.
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
        }}
      >
        {projects.map((p, i) => (
          <div
            key={i}
            style={{
              border: `1px solid ${A_PALETTE.line}`,
              padding: 28,
              background: 'rgba(7,10,20,0.6)',
              position: 'relative',
              minHeight: 280,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 14,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: aFonts.mono,
                    fontSize: 10,
                    color: A_PALETTE.amber,
                    letterSpacing: '0.26em',
                  }}
                >
                  ★ {String(i + 1).padStart(2, '0')} · {p.tag}
                </div>
                <div
                  style={{
                    fontFamily: aFonts.display,
                    fontSize: 38,
                    color: A_PALETTE.ink,
                    marginTop: 4,
                  }}
                >
                  {p.label}
                </div>
              </div>
              <AConstellation w={240} h={180} points={p.points} />
            </div>
            <div
              style={{
                fontFamily: aFonts.body,
                fontSize: 17,
                color: A_PALETTE.ink,
                lineHeight: 1.55,
                marginTop: 'auto',
              }}
            >
              {p.blurb}
            </div>
            <div
              style={{
                fontFamily: aFonts.mono,
                fontSize: 11,
                color: A_PALETTE.dim,
                letterSpacing: '0.18em',
                marginTop: 22,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>[ photos + writeup soon ]</span>
              <span style={{ color: A_PALETTE.amber }}>→ TRACK</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AExperience() {
  const xp = [
    ['2026 —', 'MIT AeroAstro · DINAMO Lab', 'PhD student · NDSEG Fellow', 'Cambridge, MA'],
    ['2025', 'EPFL', 'E3 Summer Research — acoustic microflyers (Prof. Sakar)', 'Lausanne'],
    ['2024–25', 'Agnikul Cosmos', 'Propulsion Intern — LOX sub-cooling for booster testing', 'Chennai'],
    ['2024', 'IISc Bangalore', 'Hypersonic shock pulsations · Mach 6 RNHWT (Prof. Duvvuri)', 'Bangalore'],
    ['2023 — 2026', 'IIT Madras', 'B.Tech Aerospace · Dept. Rank 1/75 · CGPA 9.92', 'Chennai'],
    ['2023 — 2024', 'Shaastra Coding Vertical', 'Coordinator — 25K+ participants', 'IIT Madras'],
  ];
  return (
    <section style={{ padding: '80px 64px', background: A_PALETTE.bg }}>
      <ASectionLabel index="04" label="Field IV · Trajectory" />
      <div
        style={{
          fontFamily: aFonts.display,
          fontSize: 64,
          color: A_PALETTE.ink,
          marginBottom: 50,
          letterSpacing: '-0.01em',
          lineHeight: 1,
        }}
      >
        The <span style={{ fontStyle: 'italic', color: A_PALETTE.amber }}>orbit</span> so far.
      </div>
      <div style={{ position: 'relative', paddingLeft: 80 }}>
        <div
          style={{
            position: 'absolute',
            left: 60,
            top: 12,
            bottom: 12,
            width: 1,
            background: A_PALETTE.line,
          }}
        />
        {xp.map((row, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '140px 1fr 220px',
              gap: 32,
              padding: '22px 0',
              borderBottom: i < xp.length - 1 ? `1px solid ${A_PALETTE.line}` : 'none',
              position: 'relative',
              alignItems: 'baseline',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: -28,
                top: 28,
                width: 12,
                height: 12,
                borderRadius: 12,
                border: `2px solid ${A_PALETTE.amber}`,
                background: A_PALETTE.bg,
              }}
            />
            <div
              style={{
                fontFamily: aFonts.mono,
                fontSize: 13,
                color: A_PALETTE.amber,
                letterSpacing: '0.18em',
              }}
            >
              {row[0]}
            </div>
            <div>
              <div style={{ fontFamily: aFonts.display, fontSize: 26, color: A_PALETTE.ink }}>
                {row[1]}
              </div>
              <div
                style={{
                  fontFamily: aFonts.body,
                  fontSize: 16,
                  color: A_PALETTE.dim,
                  marginTop: 4,
                }}
              >
                {row[2]}
              </div>
            </div>
            <div
              style={{
                fontFamily: aFonts.mono,
                fontSize: 11,
                color: A_PALETTE.dim,
                letterSpacing: '0.18em',
                textAlign: 'right',
              }}
            >
              {row[3]}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AAwards() {
  const awards = [
    ['NDSEG Fellowship', '2026 · DoD'],
    ['Sri S Subramanian Prize', '2024 · top of class of 1500+'],
    ['Prof T K Varadan Prize', '2025 · best aerospace 2nd year'],
    ['UN Millennium Fellowship', '2025 · HydroChurn'],
    ['James Dyson Award · Runner-Up', '2024 · India National'],
    ['Airbus Flight Challenge · 1st RU', '2024 · Shaastra IITM'],
    ['IAS Summer Research Fellowship', '2024 · IISc'],
    ['KVPY Fellowship', '2021 · DST, GoI · AIR 239'],
  ];
  return (
    <section style={{ padding: '80px 64px', background: A_PALETTE.bg }}>
      <ASectionLabel index="05" label="Field V · Honours" />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 18,
        }}
      >
        {awards.map(([name, sub], i) => (
          <div
            key={i}
            style={{
              border: `1px solid ${A_PALETTE.line}`,
              padding: '22px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 24,
            }}
          >
            <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 36,
                  border: `1px solid ${A_PALETTE.amber}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: A_PALETTE.amber,
                  fontSize: 16,
                }}
              >
                ★
              </div>
              <div>
                <div
                  style={{
                    fontFamily: aFonts.display,
                    fontSize: 22,
                    color: A_PALETTE.ink,
                  }}
                >
                  {name}
                </div>
                <div
                  style={{
                    fontFamily: aFonts.mono,
                    fontSize: 11,
                    color: A_PALETTE.dim,
                    marginTop: 4,
                    letterSpacing: '0.18em',
                  }}
                >
                  {sub}
                </div>
              </div>
            </div>
            <div style={{ fontFamily: aFonts.mono, color: A_PALETTE.dim, fontSize: 11 }}>
              0{i + 1}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AWriting() {
  const posts = [
    {
      title: 'Why scramjets unstart, and what an isolator is really doing',
      meta: '12 min read · in draft',
      blurb:
        "A walking tour of pseudo-shock systems for people who don't already love them. Lots of pictures of pressure traces.",
    },
    {
      title: 'On flying things that weigh less than a grain of rice',
      meta: '8 min read · coming soon',
      blurb:
        'Fabricating millimetre-scale flyers on a two-photon polymerization printer, and what changes when your propeller is shorter than your eyelash.',
    },
    {
      title: 'Notes from re-reading Anderson, ten years later',
      meta: '5 min read · draft',
      blurb: 'Hypersonic and high-temperature gas dynamics, but as a series of journal entries.',
    },
  ];
  return (
    <section style={{ padding: '80px 64px', background: A_PALETTE.bg2 }}>
      <ASectionLabel index="06" label="Field VI · Writing" />
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 40,
        }}
      >
        <div
          style={{
            fontFamily: aFonts.display,
            fontSize: 64,
            color: A_PALETTE.ink,
            letterSpacing: '-0.01em',
            lineHeight: 1,
          }}
        >
          From the <span style={{ fontStyle: 'italic', color: A_PALETTE.amber }}>logbook.</span>
        </div>
        <div
          style={{
            fontFamily: aFonts.mono,
            fontSize: 12,
            color: A_PALETTE.dim,
            letterSpacing: '0.2em',
          }}
        >
          → ALL ENTRIES
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
        {posts.map((p, i) => (
          <div
            key={i}
            style={{
              border: `1px solid ${A_PALETTE.line}`,
              padding: 28,
              background: 'rgba(7,10,20,0.4)',
            }}
          >
            <div
              style={{
                fontFamily: aFonts.mono,
                fontSize: 10,
                color: A_PALETTE.amber,
                letterSpacing: '0.26em',
              }}
            >
              ★ ENTRY 0{i + 1}
            </div>
            <div
              style={{
                fontFamily: aFonts.display,
                fontSize: 24,
                color: A_PALETTE.ink,
                marginTop: 14,
                lineHeight: 1.2,
              }}
            >
              {p.title}
            </div>
            <div
              style={{
                fontFamily: aFonts.mono,
                fontSize: 11,
                color: A_PALETTE.dim,
                marginTop: 14,
                letterSpacing: '0.16em',
              }}
            >
              {p.meta}
            </div>
            <div
              style={{
                fontFamily: aFonts.body,
                fontSize: 15,
                color: A_PALETTE.dim,
                marginTop: 14,
                lineHeight: 1.55,
              }}
            >
              {p.blurb}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AContact({ w }) {
  return (
    <section
      style={{
        padding: '120px 64px 80px',
        background: A_PALETTE.bg,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <AStarfield width={w} height={500} seed={31} density={0.5} />
      <div style={{ position: 'relative' }}>
        <ASectionLabel index="07" label="Field VII · Signal" />
        <div
          style={{
            fontFamily: aFonts.display,
            fontSize: 96,
            color: A_PALETTE.ink,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            maxWidth: 1100,
          }}
        >
          Say{' '}
          <span style={{ fontStyle: 'italic', color: A_PALETTE.amber }}>hello</span> — or send me
          a paper to read.
        </div>
        <div
          style={{
            marginTop: 50,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 24,
            maxWidth: 1100,
          }}
        >
          {[
            ['EMAIL', 'ashwinsm [at] mit.edu'],
            ['SCHOLAR', '↗ scholar profile'],
            ['GITHUB', '↗ /ashwinsm'],
            ['LINKEDIN', '↗ /in/ashwin-murugan'],
            ['TWITTER', '↗ @ashwinflies'],
            ['CV', '↗ download pdf'],
          ].map(([k, v]) => (
            <div
              key={k}
              style={{
                borderTop: `1px solid ${A_PALETTE.amber}`,
                paddingTop: 18,
              }}
            >
              <div
                style={{
                  fontFamily: aFonts.mono,
                  fontSize: 11,
                  color: A_PALETTE.amber,
                  letterSpacing: '0.26em',
                }}
              >
                {k}
              </div>
              <div
                style={{
                  fontFamily: aFonts.display,
                  fontSize: 24,
                  color: A_PALETTE.ink,
                  marginTop: 8,
                }}
              >
                {v}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 100,
            paddingTop: 24,
            borderTop: `1px solid ${A_PALETTE.line}`,
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: aFonts.mono,
            fontSize: 11,
            color: A_PALETTE.dim,
            letterSpacing: '0.2em',
          }}
        >
          <span>© ASHWIN MURUGAN · 2026</span>
          <span>★ FIELD CATALOGUE v1.0 · COMPILED MIT</span>
          <span>END OF CHART</span>
        </div>
      </div>
    </section>
  );
}

function DirectionA() {
  const w = 1440;
  return (
    <div style={{ width: w, background: A_PALETTE.bg, color: A_PALETTE.ink, fontFamily: aFonts.body }}>
      <AHero w={w} />
      <AAbout />
      <AResearch />
      <AProjects w={w} />
      <AExperience />
      <AAwards />
      <AWriting />
      <AContact w={w} />
    </div>
  );
}

window.DirectionA = DirectionA;
