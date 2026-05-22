// Direction B — Mission Telemetry
// Light technical blueprint feel. Monospace-heavy. Schematic lines. Signal orange.
// Reads like a flight test dashboard or aerospace technical sheet.

const B_PALETTE = {
  bg: '#f4f1ea',
  panel: '#ffffff',
  grid: 'rgba(40,38,30,0.06)',
  ink: '#1a1a1a',
  dim: '#6b6357',
  line: 'rgba(26,26,26,0.12)',
  hot: '#ff5722', // signal orange
  cold: '#1d6bd9', // schematic blue
  warn: '#d4a017',
  ok: '#2f9c5e',
};

const bFonts = {
  display: '"Space Grotesk", "Manrope", system-ui, sans-serif',
  mono: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace',
};

// Engineering grid background
function BGrid({ w, h, opacity = 1 }) {
  return (
    <svg
      width={w}
      height={h}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity }}
    >
      <defs>
        <pattern id="bgrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(26,26,26,0.06)" strokeWidth="0.5" />
        </pattern>
        <pattern id="bgrid2" width="200" height="200" patternUnits="userSpaceOnUse">
          <path d="M 200 0 L 0 0 0 200" fill="none" stroke="rgba(26,26,26,0.12)" strokeWidth="0.7" />
        </pattern>
      </defs>
      <rect width={w} height={h} fill="url(#bgrid)" />
      <rect width={w} height={h} fill="url(#bgrid2)" />
    </svg>
  );
}

// A small marker — like the ones you see on aerospace schematics
function BCornerMarks({ size = 12, color = B_PALETTE.ink }) {
  const m = (style) => (
    <span
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderColor: color,
        borderStyle: 'solid',
        ...style,
      }}
    />
  );
  return (
    <>
      {m({ top: -1, left: -1, borderWidth: '2px 0 0 2px' })}
      {m({ top: -1, right: -1, borderWidth: '2px 2px 0 0' })}
      {m({ bottom: -1, left: -1, borderWidth: '0 0 2px 2px' })}
      {m({ bottom: -1, right: -1, borderWidth: '0 2px 2px 0' })}
    </>
  );
}

function BPanel({ id, title, status, children, style }) {
  return (
    <div
      style={{
        position: 'relative',
        background: B_PALETTE.panel,
        border: `1px solid ${B_PALETTE.line}`,
        ...style,
      }}
    >
      <BCornerMarks />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          borderBottom: `1px solid ${B_PALETTE.line}`,
          fontFamily: bFonts.mono,
          fontSize: 11,
          letterSpacing: '0.16em',
          color: B_PALETTE.dim,
        }}
      >
        <span>
          <span style={{ color: B_PALETTE.ink, marginRight: 8 }}>◆ {id}</span>
          {title}
        </span>
        {status && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: status.color || B_PALETTE.ok,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 6,
                background: status.color || B_PALETTE.ok,
                boxShadow: `0 0 6px ${status.color || B_PALETTE.ok}`,
              }}
            />
            {status.text}
          </span>
        )}
      </div>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  );
}

function BNav() {
  return (
    <div
      style={{
        height: 44,
        borderBottom: `1px solid ${B_PALETTE.line}`,
        display: 'grid',
        gridTemplateColumns: '300px 1fr 300px',
        alignItems: 'center',
        fontFamily: bFonts.mono,
        fontSize: 11,
        color: B_PALETTE.dim,
        letterSpacing: '0.16em',
        background: B_PALETTE.bg,
        position: 'relative',
        zIndex: 2,
        paddingLeft: 24,
        paddingRight: 24,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span
          style={{
            width: 22,
            height: 22,
            background: B_PALETTE.hot,
            color: '#fff',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          A
        </span>
        <span style={{ color: B_PALETTE.ink }}>ASHWIN.MURUGAN /MISSION-CTRL</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 0 }}>
        {['HOME', 'RES', 'PROJ', 'EXP', 'AWARDS', 'LOG', 'COMM'].map((x, i) => (
          <span
            key={x}
            style={{
              padding: '0 16px',
              borderLeft: i === 0 ? `1px solid ${B_PALETTE.line}` : 'none',
              borderRight: `1px solid ${B_PALETTE.line}`,
              height: 44,
              display: 'inline-flex',
              alignItems: 'center',
              color: i === 0 ? B_PALETTE.ink : B_PALETTE.dim,
              background: i === 0 ? 'rgba(255,87,34,0.06)' : 'transparent',
            }}
          >
            {x}
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 14 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: B_PALETTE.ok }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 6,
              background: B_PALETTE.ok,
              boxShadow: `0 0 6px ${B_PALETTE.ok}`,
            }}
          />
          ALL SYSTEMS NOMINAL
        </span>
        <span>T+ 0027:14:08</span>
      </div>
    </div>
  );
}

// Hero: telemetry dashboard
function BHero({ w }) {
  return (
    <div style={{ position: 'relative', padding: '32px 24px 56px', background: B_PALETTE.bg }}>
      <BGrid w={w} h={760} />
      <div
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 24,
        }}
      >
        {/* identity card */}
        <div>
          <div
            style={{
              fontFamily: bFonts.mono,
              fontSize: 11,
              color: B_PALETTE.dim,
              letterSpacing: '0.22em',
              marginBottom: 24,
              display: 'flex',
              gap: 16,
              alignItems: 'center',
            }}
          >
            <span style={{ color: B_PALETTE.hot }}>● FLIGHT 001</span>
            <span>—</span>
            <span>SUBJECT: A. S. MURUGAN</span>
            <span>—</span>
            <span>STATUS: PhD YR.1 / MIT</span>
          </div>
          <div
            style={{
              fontFamily: bFonts.display,
              fontWeight: 700,
              fontSize: 168,
              lineHeight: 0.84,
              color: B_PALETTE.ink,
              letterSpacing: '-0.05em',
            }}
          >
            ASHWIN
            <br />
            MURUGAN<span style={{ color: B_PALETTE.hot }}>_</span>
          </div>

          <div
            style={{
              marginTop: 36,
              display: 'grid',
              gridTemplateColumns: '24px 1fr',
              gap: 16,
              alignItems: 'start',
            }}
          >
            <div
              style={{
                fontFamily: bFonts.mono,
                fontSize: 11,
                color: B_PALETTE.hot,
                letterSpacing: '0.22em',
              }}
            >
              §01
            </div>
            <div
              style={{
                fontFamily: bFonts.display,
                fontSize: 24,
                lineHeight: 1.4,
                color: B_PALETTE.ink,
                maxWidth: 620,
              }}
            >
              Aerospace researcher. Currently flying shock trains, sound-powered microflyers and
              the occasional Fourier neural operator at <strong>MIT DINAMO Lab</strong> as an{' '}
              <strong>NDSEG Fellow</strong>.
            </div>
          </div>

          <div
            style={{
              marginTop: 36,
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              style={{
                background: B_PALETTE.ink,
                color: B_PALETTE.bg,
                border: 'none',
                padding: '14px 22px',
                fontFamily: bFonts.mono,
                fontSize: 12,
                letterSpacing: '0.2em',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              ▶ INITIATE BRIEFING
            </button>
            <button
              style={{
                background: 'transparent',
                color: B_PALETTE.ink,
                border: `1px solid ${B_PALETTE.ink}`,
                padding: '13px 22px',
                fontFamily: bFonts.mono,
                fontSize: 12,
                letterSpacing: '0.2em',
                cursor: 'pointer',
              }}
            >
              ↓ DOWNLOAD CV
            </button>
            <span
              style={{
                fontFamily: bFonts.mono,
                fontSize: 11,
                color: B_PALETTE.dim,
                letterSpacing: '0.18em',
                marginLeft: 8,
              }}
            >
              UPLINK · ashwinsm [at] mit.edu
            </span>
          </div>
        </div>

        {/* telemetry side panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <BPanel id="TLM-001" title="CAREER TELEMETRY" status={{ text: 'LIVE', color: B_PALETTE.hot }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              {[
                ['CGPA', '9.92 / 10', B_PALETTE.hot],
                ['DEPT RANK', '1 / 75', B_PALETTE.hot],
                ['JEE ADV', 'AIR 156', B_PALETTE.ink],
                ['KVPY', 'AIR 239', B_PALETTE.ink],
                ['PUBLICATIONS', '02 ↑', B_PALETTE.cold],
                ['FELLOWSHIPS', '04', B_PALETTE.cold],
              ].map(([k, v, c]) => (
                <div key={k}>
                  <div
                    style={{
                      fontFamily: bFonts.mono,
                      fontSize: 10,
                      color: B_PALETTE.dim,
                      letterSpacing: '0.22em',
                    }}
                  >
                    {k}
                  </div>
                  <div
                    style={{
                      fontFamily: bFonts.display,
                      fontWeight: 700,
                      fontSize: 32,
                      color: c,
                      marginTop: 2,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </BPanel>

          <BPanel
            id="TLM-002"
            title="VEHICLES TRACKED"
            status={{ text: 'NOMINAL', color: B_PALETTE.ok }}
          >
            {[
              ['SCRAMJET ISOLATOR', '92%', B_PALETTE.hot],
              ['µ-FLYER · HELMHOLTZ', '78%', B_PALETTE.cold],
              ['SRM NOZZLE EROSION', '34%', B_PALETTE.warn],
              ['SUAS QUADCOPTER', '100%', B_PALETTE.ok],
            ].map(([name, pct, c]) => (
              <div key={name} style={{ marginBottom: 14 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: bFonts.mono,
                    fontSize: 11,
                    color: B_PALETTE.dim,
                    letterSpacing: '0.14em',
                  }}
                >
                  <span style={{ color: B_PALETTE.ink }}>{name}</span>
                  <span style={{ color: c }}>{pct}</span>
                </div>
                <div
                  style={{
                    height: 4,
                    background: 'rgba(26,26,26,0.06)',
                    marginTop: 6,
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: pct,
                      background: c,
                    }}
                  />
                </div>
              </div>
            ))}
          </BPanel>
        </div>
      </div>
    </div>
  );
}

function BSectionHead({ id, eyebrow, title, count }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '160px 1fr 160px',
        alignItems: 'flex-end',
        padding: '60px 24px 28px',
        borderTop: `1px solid ${B_PALETTE.line}`,
      }}
    >
      <div
        style={{
          fontFamily: bFonts.mono,
          fontSize: 11,
          color: B_PALETTE.hot,
          letterSpacing: '0.22em',
        }}
      >
        {id}
      </div>
      <div>
        <div
          style={{
            fontFamily: bFonts.mono,
            fontSize: 11,
            color: B_PALETTE.dim,
            letterSpacing: '0.22em',
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            fontFamily: bFonts.display,
            fontWeight: 700,
            fontSize: 64,
            color: B_PALETTE.ink,
            letterSpacing: '-0.03em',
            marginTop: 6,
            lineHeight: 1,
          }}
        >
          {title}
        </div>
      </div>
      {count && (
        <div
          style={{
            fontFamily: bFonts.mono,
            fontSize: 11,
            color: B_PALETTE.dim,
            letterSpacing: '0.22em',
            textAlign: 'right',
          }}
        >
          [ {count} ]
        </div>
      )}
    </div>
  );
}

function BAbout() {
  return (
    <section style={{ background: B_PALETTE.bg, position: 'relative' }}>
      <BSectionHead id="§01 / ABOUT" eyebrow="SUBJECT DOSSIER" title="WHO ↘" count="01 OF 07" />
      <div
        style={{
          padding: '0 24px 60px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
        }}
      >
        <BPanel id="DOSSIER" title="BIOGRAPHICAL DATA">
          <div
            style={{
              fontFamily: bFonts.display,
              fontSize: 22,
              lineHeight: 1.5,
              color: B_PALETTE.ink,
            }}
          >
            <p style={{ margin: 0 }}>
              I'm a PhD student at <strong>MIT AeroAstro</strong>, joining the{' '}
              <span style={{ color: B_PALETTE.hot }}>DINAMO Lab</span> on the NDSEG Fellowship.
              Before MIT, I finished my B.Tech in Aerospace at IIT Madras — first in the department,
              with side missions through hypersonic wind tunnels at IISc, microflyer fabrication at
              EPFL, and propulsion work at Agnikul Cosmos.
            </p>
            <p style={{ marginTop: 18 }}>
              I'm drawn to things that move fast, things that move small, and the unsteady fluid
              dynamics that decide whether either of those actually flies. Recently I've been
              poking at what neural operators can do for CFD.
            </p>
          </div>
        </BPanel>

        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 16 }}>
          <BPanel id="LOC" title="LOCATION VECTOR">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                ['HOME BASE', 'Cambridge, MA'],
                ['BORN', 'Chennai, IN'],
                ['LAB', 'MIT DINAMO'],
                ['ADVISOR', 'TBD · F25'],
                ['ETA · DEFENSE', '~ 2031'],
                ['TIMEZONE', 'EST · −05:00'],
              ].map(([k, v]) => (
                <div key={k}>
                  <div
                    style={{
                      fontFamily: bFonts.mono,
                      fontSize: 10,
                      color: B_PALETTE.dim,
                      letterSpacing: '0.22em',
                    }}
                  >
                    {k}
                  </div>
                  <div
                    style={{
                      fontFamily: bFonts.display,
                      fontWeight: 600,
                      fontSize: 18,
                      color: B_PALETTE.ink,
                      marginTop: 4,
                    }}
                  >
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </BPanel>

          <BPanel id="INSTR" title="INSTRUMENT PANEL · TOOLS">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {[
                'Python',
                'MATLAB',
                'C++',
                'Ansys Fluent',
                'OpenSBLI',
                'GFSSP',
                'AFT Fathom',
                'COMSOL',
                'SolidWorks',
                'Blender',
                'LaTeX',
                'PyTorch',
              ].map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: bFonts.mono,
                    fontSize: 11,
                    padding: '5px 10px',
                    border: `1px solid ${B_PALETTE.line}`,
                    color: B_PALETTE.ink,
                    letterSpacing: '0.06em',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </BPanel>
        </div>
      </div>
    </section>
  );
}

// A simple schematic vehicle diagram — used in the research section
function BSchematic({ type }) {
  if (type === 'scramjet') {
    return (
      <svg viewBox="0 0 360 120" width="100%" height="120">
        <line x1="0" y1="60" x2="360" y2="60" stroke={B_PALETTE.line} strokeDasharray="2 4" />
        {/* duct */}
        <path
          d="M 30 40 L 110 40 L 150 30 L 240 30 L 280 50 L 340 50 L 340 70 L 280 70 L 240 90 L 150 90 L 110 80 L 30 80 Z"
          fill="none"
          stroke={B_PALETTE.ink}
          strokeWidth="1.4"
        />
        {/* shock train */}
        {[155, 175, 195, 215, 235].map((x, i) => (
          <line
            key={i}
            x1={x}
            y1="34"
            x2={x + 14}
            y2="86"
            stroke={B_PALETTE.hot}
            strokeWidth="1.4"
            opacity={0.4 + i * 0.1}
          />
        ))}
        <text
          x="60"
          y="22"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          fill={B_PALETTE.dim}
          letterSpacing="2"
        >
          INTAKE
        </text>
        <text
          x="175"
          y="22"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          fill={B_PALETTE.hot}
          letterSpacing="2"
        >
          SHOCK TRAIN
        </text>
        <text
          x="285"
          y="22"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          fill={B_PALETTE.dim}
          letterSpacing="2"
        >
          COMBUSTOR
        </text>
      </svg>
    );
  }
  if (type === 'microflyer') {
    return (
      <svg viewBox="0 0 360 120" width="100%" height="120">
        <circle cx="180" cy="60" r="36" fill="none" stroke={B_PALETTE.ink} strokeWidth="1.4" />
        <circle cx="180" cy="60" r="22" fill="none" stroke={B_PALETTE.cold} strokeWidth="1" />
        <circle cx="180" cy="60" r="3" fill={B_PALETTE.cold} />
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const r = (deg * Math.PI) / 180;
          const x1 = 180 + Math.cos(r) * 38;
          const y1 = 60 + Math.sin(r) * 38;
          const x2 = 180 + Math.cos(r) * 58;
          const y2 = 60 + Math.sin(r) * 58;
          return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke={B_PALETTE.ink} strokeWidth="1" />;
        })}
        {/* acoustic waves */}
        {[70, 90, 110].map((r) => (
          <circle
            key={r}
            cx="180"
            cy="60"
            r={r}
            fill="none"
            stroke={B_PALETTE.hot}
            strokeDasharray="2 5"
            opacity="0.35"
          />
        ))}
        <text
          x="20"
          y="20"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          fill={B_PALETTE.dim}
          letterSpacing="2"
        >
          40 kHz · TRANSDUCER ARRAY
        </text>
      </svg>
    );
  }
  // nozzle
  return (
    <svg viewBox="0 0 360 120" width="100%" height="120">
      <path
        d="M 30 30 L 130 30 L 170 50 L 170 70 L 130 90 L 30 90 Z"
        fill="none"
        stroke={B_PALETTE.ink}
        strokeWidth="1.4"
      />
      <path
        d="M 170 50 L 340 20 L 340 100 L 170 70 Z"
        fill="none"
        stroke={B_PALETTE.ink}
        strokeWidth="1.4"
      />
      {[180, 200, 220, 240, 260, 280, 300].map((x, i) => (
        <circle key={x} cx={x} cy={60 + (i % 2) * 6 - 3} r="1.4" fill={B_PALETTE.warn} />
      ))}
      <text
        x="50"
        y="22"
        fontFamily="JetBrains Mono, monospace"
        fontSize="9"
        fill={B_PALETTE.dim}
        letterSpacing="2"
      >
        CONVERGENT · DIVERGENT NOZZLE
      </text>
      <text
        x="180"
        y="116"
        fontFamily="JetBrains Mono, monospace"
        fontSize="9"
        fill={B_PALETTE.warn}
        letterSpacing="2"
      >
        Al₂O₃ PARTICLES
      </text>
    </svg>
  );
}

function BResearch() {
  const research = [
    {
      id: 'R-001',
      tag: 'IN PREP · JFM',
      title: 'Shock Train Stability in Scramjet Isolators',
      authors: 'A. S. Murugan, T. M. Muruganandam',
      blurb:
        'High-fidelity LES with OpenSBLI of pseudo-shock systems under back-pressure noise, leading to an isolator design criterion that resists unstart.',
      sch: 'scramjet',
      color: B_PALETTE.hot,
    },
    {
      id: 'R-002',
      tag: 'IN PREP · SCI. ADV.',
      title: 'Acoustically-Actuated Microflyers',
      authors: 'J. Hwang, A. S. Murugan, Q. Angéloz · EPFL',
      blurb:
        'Millimetre-scale resonators lifted by a 40 kHz transducer array, fabricated with two-photon polymerization. One of the smallest artificial flyers ever made.',
      sch: 'microflyer',
      color: B_PALETTE.cold,
    },
    {
      id: 'R-003',
      tag: 'ONGOING',
      title: 'Particle Erosion in SRM Nozzles',
      authors: 'with Prof. P. A. Ramakrishna · IIT Madras',
      blurb:
        'Multiphase CFD of solid rocket motor exhaust against full-scale firing data — empirical erosion / deposition models that survive the throat.',
      sch: 'nozzle',
      color: B_PALETTE.warn,
    },
  ];
  return (
    <section style={{ background: B_PALETTE.bg }}>
      <BSectionHead
        id="§02 / RESEARCH"
        eyebrow="ACTIVE FLIGHT TESTS"
        title="WHAT'S RUNNING ↘"
        count="03 OF 07"
      />
      <div style={{ padding: '0 24px 60px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {research.map((r) => (
          <BPanel key={r.id} id={r.id} title={r.tag} status={{ text: 'TRACKING', color: r.color }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32 }}>
              <div>
                <div
                  style={{
                    fontFamily: bFonts.display,
                    fontWeight: 700,
                    fontSize: 38,
                    color: B_PALETTE.ink,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.05,
                  }}
                >
                  {r.title}
                </div>
                <div
                  style={{
                    fontFamily: bFonts.mono,
                    fontSize: 12,
                    color: B_PALETTE.dim,
                    marginTop: 12,
                    letterSpacing: '0.1em',
                  }}
                >
                  {r.authors}
                </div>
                <div
                  style={{
                    fontFamily: bFonts.display,
                    fontSize: 18,
                    color: B_PALETTE.ink,
                    marginTop: 16,
                    lineHeight: 1.55,
                    maxWidth: 620,
                  }}
                >
                  {r.blurb}
                </div>
                <div
                  style={{
                    marginTop: 18,
                    display: 'flex',
                    gap: 12,
                    fontFamily: bFonts.mono,
                    fontSize: 11,
                    letterSpacing: '0.2em',
                  }}
                >
                  <span style={{ color: r.color }}>→ READ DRAFT</span>
                  <span style={{ color: B_PALETTE.dim }}>→ FIGURES</span>
                  <span style={{ color: B_PALETTE.dim }}>→ DATA</span>
                </div>
              </div>
              <div
                style={{
                  border: `1px dashed ${B_PALETTE.line}`,
                  padding: 16,
                  background: 'rgba(26,26,26,0.02)',
                  alignSelf: 'center',
                }}
              >
                <BSchematic type={r.sch} />
              </div>
            </div>
          </BPanel>
        ))}
      </div>
    </section>
  );
}

function BProjects() {
  const projects = [
    {
      id: 'P-001',
      label: 'AstroSim',
      tag: 'N-BODY · C++',
      blurb:
        'Andromeda × Milky Way collision sim, 100K bodies. Barnes-Hut octree + 3D inelastic collisions + parallelism for an 8× speed-up.',
      stat: '100K BODIES',
    },
    {
      id: 'P-002',
      label: 'SUAS 2025',
      tag: 'AUTONOMY · UAV',
      blurb:
        'Autonomous quadcopter for the Student UAS competition — synthetic Blender datasets, real-time object detection, precision payload drop.',
      stat: '75 ft ALT',
    },
    {
      id: 'P-003',
      label: 'HydroChurn',
      tag: 'HARDWARE · UN MILLENNIUM',
      blurb:
        'Portable, self-sustaining water bottle. James Dyson Award India Runner-Up 2024. Scaling under the UN Millennium Fellowship.',
      stat: 'AWARD-2024',
    },
    {
      id: 'P-004',
      label: 'FNO-Aero',
      tag: 'ML × CFD',
      blurb:
        'Fourier Neural Operator for transient flow over parametric elliptical bodies + a reduced-order morphing-airfoil controller for constant-lift in turbulence.',
      stat: 'ROM · FNO',
    },
    {
      id: 'P-005',
      label: 'LOX Subcooler',
      tag: 'AGNIKUL · PROPULSION',
      blurb:
        'AFT Fathom + GFSSP models of liquid oxygen subcooling, pumping and fill for the booster stage test facility. Transient thermal stratification analysis.',
      stat: 'BOOSTER TST',
    },
    {
      id: 'P-006',
      label: 'Shaastra CodeChef',
      tag: 'COMPETITIVE PROG.',
      blurb:
        "Coordinated IIT Madras' first rated CodeChef contest. 25K+ participants worldwide. Curated problems for prelims + finals.",
      stat: '25K+ DEVS',
    },
  ];
  return (
    <section style={{ background: B_PALETTE.bg }}>
      <BSectionHead
        id="§03 / PROJECTS"
        eyebrow="DEPLOYED VEHICLES"
        title="WHAT I'VE BUILT ↘"
        count="03 OF 07"
      />
      <div
        style={{
          padding: '0 24px 60px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }}
      >
        {projects.map((p) => (
          <BPanel
            key={p.id}
            id={p.id}
            title={p.tag}
            status={{ text: p.stat, color: B_PALETTE.cold }}
          >
            <div style={{ minHeight: 200, display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  fontFamily: bFonts.display,
                  fontWeight: 700,
                  fontSize: 30,
                  color: B_PALETTE.ink,
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                {p.label}
              </div>
              <div
                style={{
                  fontFamily: bFonts.display,
                  fontSize: 15,
                  color: B_PALETTE.dim,
                  lineHeight: 1.55,
                  marginTop: 14,
                  flex: 1,
                }}
              >
                {p.blurb}
              </div>
              <div
                style={{
                  marginTop: 16,
                  borderTop: `1px solid ${B_PALETTE.line}`,
                  paddingTop: 12,
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: bFonts.mono,
                  fontSize: 11,
                  color: B_PALETTE.dim,
                  letterSpacing: '0.18em',
                }}
              >
                <span>[ photos soon ]</span>
                <span style={{ color: B_PALETTE.hot }}>→ DOSSIER</span>
              </div>
            </div>
          </BPanel>
        ))}
      </div>
    </section>
  );
}

function BExperience() {
  const xp = [
    ['2026.06', 'MIT AEROASTRO', 'PhD student · DINAMO Lab · NDSEG Fellow', 'Cambridge, MA', B_PALETTE.hot],
    ['2025.07', 'IIT MADRAS', 'SRM nozzle erosion · Prof. Ramakrishna', 'Chennai', B_PALETTE.ink],
    ['2025.05', 'EPFL', 'Acoustic microflyers · Prof. Sakar · E3 (2% accept)', 'Lausanne', B_PALETTE.cold],
    ['2024.11', 'AGNIKUL COSMOS', 'Propulsion intern · LOX subcooling system', 'Chennai', B_PALETTE.ink],
    ['2024.05', 'IISc BANGALORE', 'Hypersonic shock pulsations · Mach 6 RNHWT', 'Bangalore', B_PALETTE.ink],
    ['2023.07', 'IIT MADRAS', 'Scramjet shock train research · Prof. Muruganandam', 'Chennai', B_PALETTE.ink],
    ['2022.07', 'IIT MADRAS', 'B.Tech Aerospace · Dept rank 1 · CGPA 9.92', 'Chennai', B_PALETTE.ink],
  ];
  return (
    <section style={{ background: B_PALETTE.bg }}>
      <BSectionHead
        id="§04 / EXPERIENCE"
        eyebrow="MISSION LOG"
        title="WHERE I'VE FLOWN ↘"
        count="04 OF 07"
      />
      <div style={{ padding: '0 24px 60px' }}>
        <BPanel id="LOG-MAIN" title="FLIGHT LOG · CHRONOLOGICAL">
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: bFonts.mono,
              fontSize: 13,
              color: B_PALETTE.ink,
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: `1px solid ${B_PALETTE.line}`,
                  fontSize: 10,
                  color: B_PALETTE.dim,
                  letterSpacing: '0.22em',
                }}
              >
                <th style={{ textAlign: 'left', padding: '0 0 12px 0', width: 100 }}>T-STAMP</th>
                <th style={{ textAlign: 'left', padding: '0 16px 12px', width: 200 }}>VEHICLE</th>
                <th style={{ textAlign: 'left', padding: '0 16px 12px' }}>OPERATION</th>
                <th style={{ textAlign: 'right', padding: '0 0 12px 0', width: 160 }}>LOC</th>
              </tr>
            </thead>
            <tbody>
              {xp.map((row, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${B_PALETTE.line}` }}>
                  <td style={{ padding: '18px 0', color: row[4] }}>{row[0]}</td>
                  <td
                    style={{
                      padding: '18px 16px',
                      fontFamily: bFonts.display,
                      fontWeight: 700,
                      fontSize: 16,
                      letterSpacing: '0.04em',
                    }}
                  >
                    <span style={{ color: row[4], marginRight: 8 }}>◆</span>
                    {row[1]}
                  </td>
                  <td
                    style={{
                      padding: '18px 16px',
                      fontFamily: bFonts.display,
                      fontWeight: 400,
                      fontSize: 16,
                      color: B_PALETTE.ink,
                    }}
                  >
                    {row[2]}
                  </td>
                  <td style={{ padding: '18px 0', textAlign: 'right', color: B_PALETTE.dim }}>
                    {row[3]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </BPanel>
      </div>
    </section>
  );
}

function BAwards() {
  const awards = [
    ['NDSEG FELLOWSHIP', '2026', 'DoD'],
    ['SRI S SUBRAMANIAN PRIZE', '2024', 'top of 1500+ at IITM'],
    ['PROF T K VARADAN PRIZE', '2025', 'top aero 2nd-yr'],
    ['UN MILLENNIUM FELLOWSHIP', '2025', 'HydroChurn'],
    ['JAMES DYSON AWARD · RU', '2024', 'India National'],
    ['AIRBUS FLIGHT CHALLENGE · 1RU', '2024', 'Shaastra IITM'],
    ['IAS SUMMER RESEARCH FELLOWSHIP', '2024', 'IISc Bangalore'],
    ['KVPY FELLOWSHIP', '2021', 'DST · GoI'],
  ];
  return (
    <section style={{ background: B_PALETTE.bg }}>
      <BSectionHead
        id="§05 / AWARDS"
        eyebrow="DECORATIONS"
        title="HARDWARE ON THE SHELF ↘"
        count="05 OF 07"
      />
      <div
        style={{
          padding: '0 24px 60px',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 12,
        }}
      >
        {awards.map(([name, year, sub], i) => (
          <div
            key={i}
            style={{
              position: 'relative',
              background: B_PALETTE.panel,
              border: `1px solid ${B_PALETTE.line}`,
              padding: '18px 20px',
              display: 'grid',
              gridTemplateColumns: '50px 1fr 80px',
              alignItems: 'center',
              gap: 18,
            }}
          >
            <div
              style={{
                fontFamily: bFonts.mono,
                fontSize: 11,
                color: B_PALETTE.hot,
                letterSpacing: '0.22em',
              }}
            >
              ★{String(i + 1).padStart(2, '0')}
            </div>
            <div>
              <div
                style={{
                  fontFamily: bFonts.display,
                  fontWeight: 700,
                  fontSize: 17,
                  color: B_PALETTE.ink,
                  letterSpacing: '0.02em',
                }}
              >
                {name}
              </div>
              <div
                style={{
                  fontFamily: bFonts.mono,
                  fontSize: 11,
                  color: B_PALETTE.dim,
                  letterSpacing: '0.16em',
                  marginTop: 4,
                }}
              >
                {sub}
              </div>
            </div>
            <div
              style={{
                fontFamily: bFonts.display,
                fontWeight: 700,
                fontSize: 26,
                color: B_PALETTE.ink,
                textAlign: 'right',
                letterSpacing: '-0.02em',
              }}
            >
              {year}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BWriting() {
  const posts = [
    {
      id: 'LOG-001',
      title: 'Why scramjets unstart — a walking tour of isolators',
      meta: '12 MIN · DRAFT',
      blurb:
        'Pseudo-shock systems for people who don\'t already love them. Lots of pictures of pressure traces.',
    },
    {
      id: 'LOG-002',
      title: 'On flying things that weigh less than a grain of rice',
      meta: '8 MIN · SOON',
      blurb:
        'Fabricating millimetre-scale flyers on a two-photon polymerization printer. What changes when the propeller is shorter than your eyelash.',
    },
    {
      id: 'LOG-003',
      title: 'Notes from re-reading Anderson, ten years later',
      meta: '5 MIN · DRAFT',
      blurb:
        'Hypersonic and high-temperature gas dynamics, but as a series of journal entries.',
    },
  ];
  return (
    <section style={{ background: B_PALETTE.bg }}>
      <BSectionHead
        id="§06 / LOG"
        eyebrow="OPEN COMMS"
        title="WHAT I'VE WRITTEN ↘"
        count="06 OF 07"
      />
      <div
        style={{
          padding: '0 24px 60px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }}
      >
        {posts.map((p) => (
          <BPanel
            key={p.id}
            id={p.id}
            title={p.meta}
            status={{ text: 'DRAFT', color: B_PALETTE.warn }}
          >
            <div
              style={{
                fontFamily: bFonts.display,
                fontWeight: 700,
                fontSize: 22,
                color: B_PALETTE.ink,
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
              }}
            >
              {p.title}
            </div>
            <div
              style={{
                fontFamily: bFonts.display,
                fontSize: 15,
                color: B_PALETTE.dim,
                lineHeight: 1.55,
                marginTop: 14,
              }}
            >
              {p.blurb}
            </div>
            <div
              style={{
                fontFamily: bFonts.mono,
                fontSize: 11,
                color: B_PALETTE.hot,
                letterSpacing: '0.2em',
                marginTop: 18,
              }}
            >
              → READ ENTRY
            </div>
          </BPanel>
        ))}
      </div>
    </section>
  );
}

function BContact() {
  return (
    <section style={{ background: B_PALETTE.bg }}>
      <BSectionHead
        id="§07 / COMMS"
        eyebrow="DOWNLINK"
        title="OPEN CHANNEL ↘"
        count="07 OF 07"
      />
      <div style={{ padding: '0 24px 60px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>
        <BPanel id="UPLINK" title="PRIMARY COMMS" status={{ text: 'OPEN', color: B_PALETTE.ok }}>
          <div
            style={{
              fontFamily: bFonts.display,
              fontWeight: 700,
              fontSize: 64,
              color: B_PALETTE.ink,
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            ashwinsm
            <br />
            <span style={{ color: B_PALETTE.dim }}>[at] mit [dot] edu</span>
          </div>
          <div
            style={{
              marginTop: 28,
              fontFamily: bFonts.display,
              fontSize: 19,
              color: B_PALETTE.ink,
              maxWidth: 580,
              lineHeight: 1.5,
            }}
          >
            Best for: research collabs, papers you think I'd like, propulsion questions, rocket
            footage, podcast invitations.
          </div>
        </BPanel>

        <BPanel id="ALT-CHAN" title="ALTERNATE CHANNELS">
          <div style={{ display: 'grid', gridTemplateRows: 'repeat(5, 1fr)' }}>
            {[
              ['SCHOLAR', 'scholar.google.com/...'],
              ['GITHUB', '/ashwinsm'],
              ['LINKEDIN', '/in/ashwin-murugan'],
              ['TWITTER / X', '@ashwinflies'],
              ['CV.pdf', '↓ DOWNLOAD'],
            ].map(([k, v], i) => (
              <div
                key={k}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px 0',
                  borderBottom: i < 4 ? `1px dashed ${B_PALETTE.line}` : 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: bFonts.mono,
                    fontSize: 11,
                    color: B_PALETTE.dim,
                    letterSpacing: '0.22em',
                  }}
                >
                  {k}
                </span>
                <span
                  style={{
                    fontFamily: bFonts.display,
                    fontWeight: 600,
                    fontSize: 16,
                    color: B_PALETTE.ink,
                  }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>
        </BPanel>
      </div>
      <div
        style={{
          padding: '24px',
          borderTop: `1px solid ${B_PALETTE.line}`,
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: bFonts.mono,
          fontSize: 11,
          color: B_PALETTE.dim,
          letterSpacing: '0.22em',
        }}
      >
        <span>© ASHWIN MURUGAN · MIT 2026</span>
        <span>BUILD v1.0 · COMMIT 7f3a91</span>
        <span>END OF TRANSMISSION ◆</span>
      </div>
    </section>
  );
}

function DirectionB() {
  const w = 1440;
  return (
    <div
      style={{
        width: w,
        background: B_PALETTE.bg,
        color: B_PALETTE.ink,
        fontFamily: bFonts.display,
      }}
    >
      <BNav />
      <BHero w={w} />
      <BAbout />
      <BResearch />
      <BProjects />
      <BExperience />
      <BAwards />
      <BWriting />
      <BContact />
    </div>
  );
}

window.DirectionB = DirectionB;
