// Direction C — Aerospace Editorial
// Warm paper background, ink black, big bold display sans + mono metadata,
// magazine-style spreads. Playful trajectory illustrations and rocket motifs.
// One bold cobalt accent.

const C_PALETTE = {
  bg: '#f1ebde',
  paper: '#ebe3d3',
  ink: '#16161a',
  dim: '#5b554a',
  line: 'rgba(22,22,26,0.16)',
  cobalt: '#1d3fcf',
  ember: '#d63d2c',
};

const cFonts = {
  display: '"Bricolage Grotesque", "Space Grotesk", "Manrope", system-ui, sans-serif',
  serif: '"DM Serif Display", "Libre Caslon Text", Georgia, serif',
  mono: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace',
};

// A playful rocket trajectory arc for the hero
function CTrajectory({ w, h }) {
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      <defs>
        <marker id="cArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C_PALETTE.cobalt} />
        </marker>
      </defs>
      {/* dashed trajectory */}
      <path
        d={`M 40 ${h - 60} Q ${w * 0.35} ${-40} ${w - 80} 90`}
        fill="none"
        stroke={C_PALETTE.cobalt}
        strokeWidth="2"
        strokeDasharray="8 6"
        markerEnd="url(#cArrow)"
      />
      {/* annotation dots */}
      {[0.1, 0.3, 0.55, 0.78].map((t, i) => {
        const x = 40 + (w - 120) * t;
        const y = h - 60 - 4 * (w - 120) * t * (1 - t) * 1.8;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="4" fill={C_PALETTE.ember} />
            <text
              x={x + 10}
              y={y - 8}
              fontFamily="JetBrains Mono, monospace"
              fontSize="10"
              fill={C_PALETTE.dim}
              letterSpacing="1.5"
            >
              {['CHENNAI', 'BANGALORE', 'LAUSANNE', 'CAMBRIDGE'][i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// A little rocket vector mark — for ornament
function CRocketMark({ size = 40, color = C_PALETTE.cobalt }) {
  return (
    <svg viewBox="0 0 40 80" width={size} height={size * 2} style={{ display: 'block' }}>
      <path
        d="M 20 4 C 28 14 30 24 30 36 L 30 56 L 10 56 L 10 36 C 10 24 12 14 20 4 Z"
        fill="none"
        stroke={color}
        strokeWidth="1.6"
      />
      <circle cx="20" cy="28" r="4" fill="none" stroke={color} strokeWidth="1.4" />
      <path d="M 10 56 L 4 70 L 14 64 Z" fill={color} />
      <path d="M 30 56 L 36 70 L 26 64 Z" fill={color} />
      <path d="M 16 62 L 24 62 L 22 76 L 18 76 Z" fill={C_PALETTE.ember} />
    </svg>
  );
}

function CIssueMark({ label }) {
  return (
    <span
      style={{
        fontFamily: cFonts.mono,
        fontSize: 11,
        color: C_PALETTE.dim,
        letterSpacing: '0.24em',
        display: 'inline-flex',
        gap: 10,
        alignItems: 'center',
      }}
    >
      <span style={{ width: 18, height: 1, background: C_PALETTE.ink, display: 'inline-block' }} />
      {label}
    </span>
  );
}

function CMasthead() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        padding: '24px 56px',
        borderBottom: `2px solid ${C_PALETTE.ink}`,
        fontFamily: cFonts.mono,
        fontSize: 11,
        color: C_PALETTE.dim,
        letterSpacing: '0.2em',
        background: C_PALETTE.bg,
      }}
    >
      <span>VOL. 01 · ISS. 03 · MIT '26</span>
      <span
        style={{
          fontFamily: cFonts.serif,
          fontSize: 22,
          color: C_PALETTE.ink,
          letterSpacing: '0.08em',
        }}
      >
        THE ASHWIN MURUGAN <span style={{ fontStyle: 'italic' }}>Review</span>
      </span>
      <span>
        <span style={{ color: C_PALETTE.ember }}>●</span> WEEKLY · CAMBRIDGE, MA
      </span>
    </div>
  );
}

function CNav() {
  const items = ['INTRO', 'WORK', 'PROJECTS', 'LOG', 'AWARDS', 'WRITING', 'CONTACT'];
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 0,
        background: C_PALETTE.ink,
        color: C_PALETTE.bg,
        fontFamily: cFonts.mono,
        fontSize: 11,
        letterSpacing: '0.28em',
      }}
    >
      {items.map((x, i) => (
        <span
          key={x}
          style={{
            padding: '14px 22px',
            borderRight: i < items.length - 1 ? '1px solid rgba(255,255,255,0.15)' : 'none',
            color: i === 0 ? C_PALETTE.bg : 'rgba(241,235,222,0.7)',
          }}
        >
          {x}
        </span>
      ))}
    </div>
  );
}

function CHero({ w }) {
  return (
    <section
      style={{
        padding: '60px 56px 40px',
        position: 'relative',
        background: C_PALETTE.bg,
        borderBottom: `1px solid ${C_PALETTE.line}`,
      }}
    >
      {/* cover layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '0.6fr 2fr 0.6fr',
          gap: 36,
          alignItems: 'flex-start',
        }}
      >
        {/* left column — issue ornament */}
        <div style={{ paddingTop: 18 }}>
          <CIssueMark label="COVER FEATURE" />
          <div
            style={{
              fontFamily: cFonts.mono,
              fontSize: 11,
              color: C_PALETTE.dim,
              letterSpacing: '0.22em',
              marginTop: 70,
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
            }}
          >
            "A FIRST-IN-DEPARTMENT AEROSPACE ENGINEER WALKS INTO MIT…"
          </div>
        </div>

        {/* center column — giant name */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              fontFamily: cFonts.serif,
              fontStyle: 'italic',
              fontSize: 28,
              color: C_PALETTE.ink,
              marginBottom: 12,
            }}
          >
            Issue 03 — Spring 2026
          </div>
          <div
            style={{
              fontFamily: cFonts.display,
              fontWeight: 800,
              fontSize: 240,
              lineHeight: 0.84,
              letterSpacing: '-0.06em',
              color: C_PALETTE.ink,
            }}
          >
            ASHWIN
            <br />
            <span style={{ color: C_PALETTE.cobalt }}>MURUGAN</span>
          </div>
          <div
            style={{
              marginTop: 32,
              fontFamily: cFonts.serif,
              fontSize: 32,
              fontStyle: 'italic',
              color: C_PALETTE.ink,
              maxWidth: 880,
              lineHeight: 1.35,
            }}
          >
            On flying things, very fast and very small — a propulsion researcher's brief field
            guide to <span style={{ color: C_PALETTE.ember }}>shock trains</span>,{' '}
            <span style={{ color: C_PALETTE.ember }}>sound-powered flyers</span>, and{' '}
            <span style={{ color: C_PALETTE.ember }}>rockets that don't explode</span>.
          </div>

          {/* tag row */}
          <div
            style={{
              marginTop: 36,
              display: 'flex',
              gap: 0,
              alignItems: 'stretch',
              borderTop: `1px solid ${C_PALETTE.ink}`,
              borderBottom: `1px solid ${C_PALETTE.ink}`,
            }}
          >
            {[
              ['MIT', 'PhD · AeroAstro'],
              ['DINAMO', 'lab'],
              ['NDSEG', 'fellow · 2026'],
              ['IIT-M', 'B.Tech · Rank 1'],
              ['EPFL', 'E3 · 2% accept'],
            ].map(([k, v], i, arr) => (
              <div
                key={k}
                style={{
                  flex: 1,
                  padding: '18px 16px',
                  borderRight: i < arr.length - 1 ? `1px solid ${C_PALETTE.line}` : 'none',
                }}
              >
                <div
                  style={{
                    fontFamily: cFonts.display,
                    fontWeight: 800,
                    fontSize: 22,
                    color: C_PALETTE.ink,
                  }}
                >
                  {k}
                </div>
                <div
                  style={{
                    fontFamily: cFonts.mono,
                    fontSize: 10,
                    color: C_PALETTE.dim,
                    letterSpacing: '0.16em',
                    marginTop: 4,
                  }}
                >
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* right column — small rocket + barcode-ish */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CRocketMark size={48} color={C_PALETTE.cobalt} />
            <div
              style={{
                fontFamily: cFonts.mono,
                fontSize: 10,
                color: C_PALETTE.dim,
                letterSpacing: '0.2em',
                marginTop: 8,
                textAlign: 'center',
              }}
            >
              fig. A — self
            </div>
          </div>
          <div
            style={{
              fontFamily: cFonts.mono,
              fontSize: 10,
              color: C_PALETTE.ink,
              letterSpacing: '0.18em',
              textAlign: 'right',
              lineHeight: 1.8,
            }}
          >
            ↳ FIRST IN DEPT
            <br />
            ↳ CGPA 9.92/10
            <br />
            ↳ KVPY · NDSEG
            <br />
            ↳ 2 PAPERS · 1 PATENT-ish
            <br />
            ↳ JEE ADV AIR 156
          </div>
          <div
            style={{
              display: 'flex',
              gap: 2,
              marginTop: 12,
              padding: 8,
              border: `1px solid ${C_PALETTE.line}`,
            }}
          >
            {[2, 4, 1, 3, 2, 5, 1, 3, 4, 2, 1, 3, 2, 4].map((h, i) => (
              <div
                key={i}
                style={{
                  width: 2,
                  height: 36,
                  background: i % 3 === 0 ? C_PALETTE.cobalt : C_PALETTE.ink,
                  opacity: h * 0.18 + 0.3,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* trajectory illustration */}
      <div style={{ marginTop: 40, position: 'relative', height: 140 }}>
        <CTrajectory w={w - 112} h={140} />
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: -2,
            fontFamily: cFonts.mono,
            fontSize: 10,
            color: C_PALETTE.dim,
            letterSpacing: '0.22em',
          }}
        >
          fig. B — TRAJECTORY 2022—2026
        </div>
      </div>
    </section>
  );
}

function CSectionBreak({ num, label, sublabel }) {
  return (
    <div
      style={{
        background: C_PALETTE.ink,
        color: C_PALETTE.bg,
        padding: '32px 56px',
        display: 'grid',
        gridTemplateColumns: '120px 1fr 240px',
        alignItems: 'center',
        gap: 24,
        marginTop: 0,
      }}
    >
      <div
        style={{
          fontFamily: cFonts.serif,
          fontStyle: 'italic',
          fontSize: 70,
          color: C_PALETTE.ember,
          lineHeight: 0.9,
        }}
      >
        §{num}
      </div>
      <div>
        <div
          style={{
            fontFamily: cFonts.mono,
            fontSize: 11,
            letterSpacing: '0.3em',
            color: 'rgba(241,235,222,0.6)',
          }}
        >
          {sublabel}
        </div>
        <div
          style={{
            fontFamily: cFonts.display,
            fontWeight: 800,
            fontSize: 56,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginTop: 8,
          }}
        >
          {label}
        </div>
      </div>
      <div
        style={{
          fontFamily: cFonts.mono,
          fontSize: 11,
          color: 'rgba(241,235,222,0.7)',
          letterSpacing: '0.22em',
          textAlign: 'right',
        }}
      >
        TURN THE PAGE →
      </div>
    </div>
  );
}

function CAbout() {
  return (
    <>
      <CSectionBreak num="01" label="ABOUT THE SUBJECT" sublabel="OPENING REMARKS" />
      <section style={{ background: C_PALETTE.bg, padding: '60px 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 48 }}>
          <div>
            <div
              style={{
                fontFamily: cFonts.serif,
                fontStyle: 'italic',
                fontSize: 20,
                color: C_PALETTE.dim,
                marginBottom: 8,
              }}
            >
              By A. Murugan, on himself
            </div>
            <div
              style={{
                columnCount: 2,
                columnGap: 40,
                fontFamily: cFonts.serif,
                fontSize: 19,
                lineHeight: 1.55,
                color: C_PALETTE.ink,
              }}
            >
              <p style={{ margin: 0 }}>
                <span
                  style={{
                    float: 'left',
                    fontSize: 84,
                    lineHeight: 0.78,
                    paddingRight: 10,
                    paddingTop: 6,
                    color: C_PALETTE.cobalt,
                    fontWeight: 800,
                    fontFamily: cFonts.display,
                  }}
                >
                  I
                </span>
                spent a lot of my childhood watching rockets on grainy YouTube streams and then
                going outside to point at the sky. I'm a first-year PhD student at MIT now,
                joining the <strong>DINAMO Lab</strong> on the <strong>NDSEG Fellowship</strong>.
                Before that I did my B.Tech in Aerospace Engineering at IIT Madras — first in
                the department, with detours through hypersonic wind tunnels at IISc Bangalore,
                two-photon polymerization labs at EPFL, and a propulsion stint at Agnikul.
              </p>
              <p style={{ marginTop: 16 }}>
                I'm most interested in things that move <em>fast</em> (scramjets, shock waves,
                hypersonic flow) and things that move <em>small</em> (acoustic microflyers,
                resonator-driven actuation). The fluid dynamics that decides whether either of
                those works tends to be unsteady, nonlinear, and a little uncooperative — which
                is the fun part. Lately I've been pulling on the thread of what neural operators
                and reduced-order models can do for the kind of CFD I run every day.
              </p>
              <p style={{ marginTop: 16 }}>
                Outside the lab I run on long N-body simulations, sketch propulsion cycles on
                napkins, and occasionally write things down here.
              </p>
            </div>
          </div>

          {/* sidebar */}
          <div
            style={{
              borderLeft: `2px solid ${C_PALETTE.ink}`,
              paddingLeft: 24,
              alignSelf: 'flex-start',
            }}
          >
            <div
              style={{
                fontFamily: cFonts.mono,
                fontSize: 11,
                color: C_PALETTE.dim,
                letterSpacing: '0.24em',
                marginBottom: 16,
              }}
            >
              ✦ DOSSIER
            </div>
            <div style={{ fontFamily: cFonts.serif, fontSize: 16, lineHeight: 1.85 }}>
              <div>
                <strong>Now:</strong> Cambridge, MA
              </div>
              <div>
                <strong>Lab:</strong> MIT DINAMO
              </div>
              <div>
                <strong>Born:</strong> Chennai, IN
              </div>
              <div>
                <strong>Coffee:</strong> filter, two sugars
              </div>
              <div>
                <strong>On loop:</strong> Anderson, ch. 14
              </div>
              <div>
                <strong>Watching:</strong> SN30+, IFT-9
              </div>
            </div>

            <div
              style={{
                marginTop: 28,
                padding: 20,
                background: C_PALETTE.paper,
                borderLeft: `4px solid ${C_PALETTE.ember}`,
                fontFamily: cFonts.serif,
                fontStyle: 'italic',
                fontSize: 17,
                lineHeight: 1.5,
                color: C_PALETTE.ink,
              }}
            >
              "Fluid dynamics is just nature's way of telling you your simulation is wrong."
              <div
                style={{
                  marginTop: 10,
                  fontFamily: cFonts.mono,
                  fontStyle: 'normal',
                  fontSize: 11,
                  letterSpacing: '0.2em',
                  color: C_PALETTE.dim,
                }}
              >
                — A. M., overheard at 2am
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function CResearch() {
  const items = [
    {
      no: '01',
      tag: 'COVER STORY',
      title: 'Shock trains, and the engines they unstart',
      where: 'IIT Madras · in prep for J. Fluid Mech.',
      blurb:
        'High-fidelity LES of pseudo-shock systems inside a scramjet isolator, run with OpenSBLI. The output: a design criterion that keeps scramjets from choking when the combustor changes its mind.',
      pull: 'Mach 2.4 in, supersonic out, decided in a few millimetres of duct.',
    },
    {
      no: '02',
      tag: 'FROM EPFL',
      title: 'Sound-powered flight, at the millimetre',
      where: 'EPFL · in prep for Science Advances',
      blurb:
        'A millimetre-scale flyer lifted by a 40 kHz transducer array, built in resin on a two-photon printer. Some of the smallest controllable artificial flight ever demonstrated.',
      pull: '"One of the smallest artificial flyers you can hold up to a strong overhead light."',
    },
    {
      no: '03',
      tag: 'NEW WORK',
      title: 'Solid rocket nozzles, eaten by their own exhaust',
      where: 'IIT Madras · ongoing',
      blurb:
        'Multiphase CFD of solid rocket motor exhaust against full-scale firing tests — modelling the throat erosion and deposition that engines suffer in the first second of flight.',
      pull: 'How a rocket nozzle eats itself between T-0 and T+2.',
    },
  ];
  return (
    <>
      <CSectionBreak num="02" label="THE WORK" sublabel="FIELD NOTES · ACTIVE RESEARCH" />
      <section style={{ background: C_PALETTE.bg, padding: '60px 56px' }}>
        {items.map((it, i) => (
          <article
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 1.4fr 1fr',
              gap: 36,
              padding: '36px 0',
              borderTop: `1px solid ${C_PALETTE.line}`,
              borderBottom: i === items.length - 1 ? `1px solid ${C_PALETTE.line}` : 'none',
              alignItems: 'flex-start',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: cFonts.serif,
                  fontStyle: 'italic',
                  fontSize: 96,
                  color: C_PALETTE.cobalt,
                  lineHeight: 0.85,
                }}
              >
                {it.no}
              </div>
              <div
                style={{
                  fontFamily: cFonts.mono,
                  fontSize: 10,
                  color: C_PALETTE.ember,
                  letterSpacing: '0.26em',
                  marginTop: 8,
                }}
              >
                ✦ {it.tag}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: cFonts.display,
                  fontWeight: 800,
                  fontSize: 44,
                  lineHeight: 1.05,
                  letterSpacing: '-0.025em',
                  color: C_PALETTE.ink,
                }}
              >
                {it.title}
              </div>
              <div
                style={{
                  fontFamily: cFonts.mono,
                  fontSize: 11,
                  color: C_PALETTE.dim,
                  letterSpacing: '0.18em',
                  marginTop: 14,
                }}
              >
                {it.where}
              </div>
              <div
                style={{
                  fontFamily: cFonts.serif,
                  fontSize: 17,
                  color: C_PALETTE.ink,
                  lineHeight: 1.55,
                  marginTop: 18,
                  maxWidth: 540,
                }}
              >
                {it.blurb}
              </div>
            </div>
            <div
              style={{
                borderLeft: `3px solid ${C_PALETTE.ember}`,
                paddingLeft: 20,
                fontFamily: cFonts.serif,
                fontStyle: 'italic',
                fontSize: 22,
                lineHeight: 1.35,
                color: C_PALETTE.ink,
              }}
            >
              {it.pull}
              <div
                style={{
                  marginTop: 24,
                  fontFamily: cFonts.mono,
                  fontStyle: 'normal',
                  fontSize: 11,
                  color: C_PALETTE.cobalt,
                  letterSpacing: '0.2em',
                }}
              >
                → READ THE DRAFT
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

// A simple sketch placeholder — for project "photos coming"
function CSketchPlaceholder({ kind, h = 200 }) {
  if (kind === 'sat') {
    return (
      <svg viewBox="0 0 300 200" width="100%" height={h} style={{ display: 'block' }}>
        <rect width="300" height="200" fill={C_PALETTE.paper} />
        <line x1="0" y1="170" x2="300" y2="170" stroke={C_PALETTE.line} />
        <circle cx="80" cy="100" r="38" fill="none" stroke={C_PALETTE.ink} strokeWidth="1.6" />
        <ellipse cx="80" cy="100" rx="78" ry="14" fill="none" stroke={C_PALETTE.cobalt} strokeWidth="1.4" strokeDasharray="4 4" />
        <rect x="155" y="76" width="80" height="48" fill="none" stroke={C_PALETTE.ink} strokeWidth="1.4" />
        <rect x="235" y="90" width="40" height="20" fill={C_PALETTE.cobalt} />
        <text x="14" y="194" fontFamily="JetBrains Mono, monospace" fontSize="10" fill={C_PALETTE.dim} letterSpacing="2">
          fig — N-body, 100K particles
        </text>
      </svg>
    );
  }
  if (kind === 'drone') {
    return (
      <svg viewBox="0 0 300 200" width="100%" height={h} style={{ display: 'block' }}>
        <rect width="300" height="200" fill={C_PALETTE.paper} />
        {[0, 1].map((i) =>
          [0, 1].map((j) => (
            <g key={`${i}-${j}`}>
              <circle cx={80 + i * 140} cy={70 + j * 70} r="22" fill="none" stroke={C_PALETTE.ink} strokeWidth="1.4" />
              <line x1={80 + i * 140} y1={48 + j * 70} x2={80 + i * 140} y2={92 + j * 70} stroke={C_PALETTE.cobalt} strokeWidth="1" />
              <line x1={58 + i * 140} y1={70 + j * 70} x2={102 + i * 140} y2={70 + j * 70} stroke={C_PALETTE.cobalt} strokeWidth="1" />
            </g>
          ))
        )}
        <rect x="120" y="80" width="60" height="50" fill="none" stroke={C_PALETTE.ink} strokeWidth="1.6" />
        <text x="14" y="194" fontFamily="JetBrains Mono, monospace" fontSize="10" fill={C_PALETTE.dim} letterSpacing="2">
          fig — quadcopter top view
        </text>
      </svg>
    );
  }
  if (kind === 'bottle') {
    return (
      <svg viewBox="0 0 300 200" width="100%" height={h} style={{ display: 'block' }}>
        <rect width="300" height="200" fill={C_PALETTE.paper} />
        <path d="M 130 30 L 170 30 L 175 56 L 175 170 L 125 170 L 125 56 Z" fill="none" stroke={C_PALETTE.ink} strokeWidth="1.6" />
        <rect x="135" y="20" width="30" height="14" fill={C_PALETTE.ember} />
        {[80, 100, 120, 140].map((y) => (
          <line key={y} x1="125" y1={y} x2="175" y2={y} stroke={C_PALETTE.cobalt} strokeWidth="1" strokeDasharray="3 3" />
        ))}
        <text x="14" y="194" fontFamily="JetBrains Mono, monospace" fontSize="10" fill={C_PALETTE.dim} letterSpacing="2">
          fig — self-sustaining bottle
        </text>
      </svg>
    );
  }
  // network / FNO
  return (
    <svg viewBox="0 0 300 200" width="100%" height={h} style={{ display: 'block' }}>
      <rect width="300" height="200" fill={C_PALETTE.paper} />
      {[40, 110, 180, 250].map((cx) =>
        [50, 100, 150].map((cy) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill={C_PALETTE.cobalt} />)
      )}
      {[40, 110, 180].map((cx) =>
        [50, 100, 150].map((cy1) =>
          [50, 100, 150].map((cy2) => (
            <line key={`${cx}-${cy1}-${cy2}`} x1={cx} y1={cy1} x2={cx + 70} y2={cy2} stroke={C_PALETTE.ink} strokeWidth="0.5" opacity="0.4" />
          ))
        )
      )}
      <text x="14" y="194" fontFamily="JetBrains Mono, monospace" fontSize="10" fill={C_PALETTE.dim} letterSpacing="2">
        fig — Fourier Neural Operator
      </text>
    </svg>
  );
}

function CProjects() {
  const projects = [
    {
      tag: 'ASTRONOMY',
      title: 'AstroSim',
      blurb:
        'C++ N-body solver — Andromeda × Milky Way collision with 100K bodies, Barnes-Hut octree, 3D inelastic collisions, 8× parallel speed-up.',
      kind: 'sat',
      accent: C_PALETTE.cobalt,
    },
    {
      tag: 'AUTONOMY',
      title: 'SUAS Quadcopter',
      blurb:
        '15-member team, autonomous UAV — synthetic Blender datasets, ground-marker detection from 75 ft, precision payload delivery.',
      kind: 'drone',
      accent: C_PALETTE.ember,
    },
    {
      tag: 'HARDWARE · UN MILLENNIUM',
      title: 'HydroChurn',
      blurb:
        'Portable, self-sustaining water bottle. James Dyson Award India Runner-Up 2024, now scaling with the UN Millennium Fellowship.',
      kind: 'bottle',
      accent: C_PALETTE.ember,
    },
    {
      tag: 'ML × CFD',
      title: 'FNO-Aero',
      blurb:
        'Fourier Neural Operator for transient flow over parametric ellipses + an ROM-based morphing-airfoil controller for constant lift in turbulence.',
      kind: 'fno',
      accent: C_PALETTE.cobalt,
    },
  ];
  return (
    <>
      <CSectionBreak num="03" label="PROJECTS &amp; SIDE QUESTS" sublabel="WORKBENCH · A SELECTION" />
      <section style={{ background: C_PALETTE.bg, padding: '60px 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
          {projects.map((p, i) => (
            <article
              key={i}
              style={{
                background: C_PALETTE.paper,
                border: `1px solid ${C_PALETTE.line}`,
                padding: 28,
                position: 'relative',
                minHeight: 460,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    fontFamily: cFonts.mono,
                    fontSize: 10,
                    color: p.accent,
                    letterSpacing: '0.26em',
                  }}
                >
                  ✦ № {String(i + 1).padStart(2, '0')} · {p.tag}
                </div>
                <div
                  style={{
                    fontFamily: cFonts.serif,
                    fontStyle: 'italic',
                    fontSize: 16,
                    color: C_PALETTE.dim,
                  }}
                >
                  fig. {i + 1}
                </div>
              </div>
              <CSketchPlaceholder kind={p.kind} h={220} />
              <div
                style={{
                  fontFamily: cFonts.display,
                  fontWeight: 800,
                  fontSize: 44,
                  letterSpacing: '-0.03em',
                  color: C_PALETTE.ink,
                  marginTop: 20,
                  lineHeight: 1,
                }}
              >
                {p.title}
              </div>
              <div
                style={{
                  fontFamily: cFonts.serif,
                  fontSize: 17,
                  color: C_PALETTE.ink,
                  lineHeight: 1.5,
                  marginTop: 14,
                  flex: 1,
                }}
              >
                {p.blurb}
              </div>
              <div
                style={{
                  marginTop: 18,
                  paddingTop: 16,
                  borderTop: `1px solid ${C_PALETTE.line}`,
                  fontFamily: cFonts.mono,
                  fontSize: 11,
                  color: p.accent,
                  letterSpacing: '0.22em',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ color: C_PALETTE.dim }}>[ photos / writeup soon ]</span>
                <span>→ READ MORE</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function CTimeline() {
  const xp = [
    ['2026', 'MIT AeroAstro', 'PhD · DINAMO Lab · NDSEG Fellow', 'Cambridge'],
    ['2025', 'EPFL', 'Acoustic microflyers · Prof. Sakar · E3 program', 'Lausanne'],
    ['2024', 'Agnikul Cosmos', 'Propulsion intern — LOX subcooling for booster testing', 'Chennai'],
    ['2024', 'IISc Bangalore', 'Hypersonic shock pulsations · Mach 6 RNHWT', 'Bangalore'],
    ['2023', 'IIT Madras', 'Scramjet shock train · Prof. Muruganandam', 'Chennai'],
    ['2022', 'IIT Madras', 'B.Tech Aerospace · Dept rank 1 · CGPA 9.92', 'Chennai'],
  ];
  return (
    <>
      <CSectionBreak num="04" label="A SHORT BIOGRAPHY" sublabel="TIMELINE · 2022 → 2026" />
      <section style={{ background: C_PALETTE.bg, padding: '60px 56px' }}>
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              left: 110,
              top: 12,
              bottom: 12,
              width: 2,
              background: C_PALETTE.ink,
            }}
          />
          {xp.map((row, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '100px 40px 1fr 200px',
                gap: 24,
                padding: '26px 0',
                borderBottom: i < xp.length - 1 ? `1px solid ${C_PALETTE.line}` : 'none',
                alignItems: 'baseline',
                position: 'relative',
              }}
            >
              <div
                style={{
                  fontFamily: cFonts.display,
                  fontWeight: 800,
                  fontSize: 36,
                  color: C_PALETTE.cobalt,
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                {row[0]}
              </div>
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 14,
                  background: i === 0 ? C_PALETTE.ember : C_PALETTE.bg,
                  border: `2px solid ${C_PALETTE.ink}`,
                  alignSelf: 'center',
                  marginLeft: -7,
                }}
              />
              <div>
                <div
                  style={{
                    fontFamily: cFonts.display,
                    fontWeight: 700,
                    fontSize: 26,
                    color: C_PALETTE.ink,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {row[1]}
                </div>
                <div
                  style={{
                    fontFamily: cFonts.serif,
                    fontSize: 17,
                    color: C_PALETTE.dim,
                    marginTop: 4,
                  }}
                >
                  {row[2]}
                </div>
              </div>
              <div
                style={{
                  fontFamily: cFonts.mono,
                  fontSize: 11,
                  color: C_PALETTE.dim,
                  letterSpacing: '0.22em',
                  textAlign: 'right',
                }}
              >
                {row[3]}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function CAwards() {
  const awards = [
    ['NDSEG Fellowship', '2026', 'DoD', C_PALETTE.ember],
    ['Sri S Subramanian Prize', '2024', 'top of 1500+ at IIT Madras', C_PALETTE.cobalt],
    ['Prof T K Varadan Prize', '2025', 'top aero 2nd-yr', C_PALETTE.cobalt],
    ['UN Millennium Fellowship', '2025', 'HydroChurn', C_PALETTE.ember],
    ['James Dyson Award · Runner-Up', '2024', 'India National', C_PALETTE.ember],
    ['Airbus Flight Challenge · 1st RU', '2024', 'Shaastra IITM', C_PALETTE.cobalt],
    ['IAS Summer Research Fellowship', '2024', 'IISc Bangalore', C_PALETTE.cobalt],
    ['KVPY Fellowship', '2021', 'DST, GoI · AIR 239', C_PALETTE.cobalt],
  ];
  return (
    <>
      <CSectionBreak num="05" label="ACCOLADES" sublabel="HONOURS &amp; AWARDS" />
      <section style={{ background: C_PALETTE.bg, padding: '60px 56px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 0,
            border: `2px solid ${C_PALETTE.ink}`,
          }}
        >
          {awards.map(([name, year, sub, c], i) => (
            <div
              key={i}
              style={{
                padding: '24px 28px',
                borderRight: i % 2 === 0 ? `1px solid ${C_PALETTE.ink}` : 'none',
                borderBottom: i < awards.length - 2 ? `1px solid ${C_PALETTE.ink}` : 'none',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: 18,
                alignItems: 'center',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: cFonts.mono,
                    fontSize: 10,
                    color: c,
                    letterSpacing: '0.26em',
                  }}
                >
                  ✦ {String(i + 1).padStart(2, '0')}
                </div>
                <div
                  style={{
                    fontFamily: cFonts.display,
                    fontWeight: 700,
                    fontSize: 24,
                    color: C_PALETTE.ink,
                    letterSpacing: '-0.01em',
                    marginTop: 6,
                  }}
                >
                  {name}
                </div>
                <div
                  style={{
                    fontFamily: cFonts.serif,
                    fontStyle: 'italic',
                    fontSize: 15,
                    color: C_PALETTE.dim,
                    marginTop: 4,
                  }}
                >
                  {sub}
                </div>
              </div>
              <div
                style={{
                  fontFamily: cFonts.serif,
                  fontStyle: 'italic',
                  fontSize: 48,
                  color: c,
                  lineHeight: 1,
                }}
              >
                {year}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function CWriting() {
  const posts = [
    {
      title: 'Why scramjets unstart',
      meta: '12 MIN · IN DRAFT',
      blurb:
        'A walking tour of pseudo-shock systems for people who don\'t already love them. Lots of pictures of pressure traces.',
      kicker: 'PROPULSION',
    },
    {
      title: 'On flying things that weigh less than a grain of rice',
      meta: '8 MIN · COMING',
      blurb:
        'Fabricating millimetre-scale flyers on a two-photon polymerization printer — what changes when your propeller is shorter than your eyelash.',
      kicker: 'MICROFLIGHT',
    },
    {
      title: 'Re-reading Anderson, ten years later',
      meta: '5 MIN · DRAFT',
      blurb:
        'Hypersonic and high-temperature gas dynamics, but as a series of journal entries.',
      kicker: 'NOTEBOOK',
    },
  ];
  return (
    <>
      <CSectionBreak num="06" label="WRITING" sublabel="LOGBOOK · ESSAYS &amp; NOTES" />
      <section style={{ background: C_PALETTE.bg, padding: '60px 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 28 }}>
          {posts.map((p, i) => (
            <article
              key={i}
              style={{
                background: i === 0 ? C_PALETTE.ink : 'transparent',
                color: i === 0 ? C_PALETTE.bg : C_PALETTE.ink,
                padding: i === 0 ? '36px 32px' : '0',
                borderTop: i > 0 ? `2px solid ${C_PALETTE.ink}` : 'none',
                paddingTop: i > 0 ? 20 : 36,
              }}
            >
              <div
                style={{
                  fontFamily: cFonts.mono,
                  fontSize: 11,
                  color: i === 0 ? C_PALETTE.ember : C_PALETTE.ember,
                  letterSpacing: '0.26em',
                }}
              >
                ✦ {p.kicker}
              </div>
              <div
                style={{
                  fontFamily: cFonts.display,
                  fontWeight: 800,
                  fontSize: i === 0 ? 46 : 28,
                  lineHeight: 1.05,
                  letterSpacing: '-0.025em',
                  marginTop: 14,
                }}
              >
                {p.title}
              </div>
              <div
                style={{
                  fontFamily: cFonts.mono,
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  color: i === 0 ? 'rgba(241,235,222,0.6)' : C_PALETTE.dim,
                  marginTop: 16,
                }}
              >
                {p.meta}
              </div>
              <div
                style={{
                  fontFamily: cFonts.serif,
                  fontSize: 16,
                  lineHeight: 1.55,
                  marginTop: 14,
                  color: i === 0 ? 'rgba(241,235,222,0.85)' : C_PALETTE.ink,
                }}
              >
                {p.blurb}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function CContact() {
  return (
    <>
      <CSectionBreak num="07" label="LETTERS TO THE EDITOR" sublabel="GET IN TOUCH" />
      <section style={{ background: C_PALETTE.bg, padding: '60px 56px 30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'flex-start' }}>
          <div>
            <div
              style={{
                fontFamily: cFonts.serif,
                fontStyle: 'italic',
                fontSize: 28,
                color: C_PALETTE.dim,
                marginBottom: 12,
              }}
            >
              Mail the cover subject —
            </div>
            <div
              style={{
                fontFamily: cFonts.display,
                fontWeight: 800,
                fontSize: 92,
                letterSpacing: '-0.03em',
                color: C_PALETTE.ink,
                lineHeight: 0.95,
              }}
            >
              ashwinsm
              <br />
              <span style={{ color: C_PALETTE.cobalt }}>@mit.edu</span>
            </div>
            <div
              style={{
                fontFamily: cFonts.serif,
                fontSize: 19,
                color: C_PALETTE.ink,
                lineHeight: 1.55,
                marginTop: 36,
                maxWidth: 540,
              }}
            >
              I'm always up to read a paper, talk propulsion, or argue about whether neural
              networks should be allowed in the loop. Especially interested in collabs around
              hypersonic propulsion, acoustic actuation, and ML for CFD.
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateRows: 'repeat(5, auto)', gap: 0 }}>
            {[
              ['SCHOLAR', 'scholar.google.com/…'],
              ['GITHUB', '/ashwinsm'],
              ['LINKEDIN', '/in/ashwin-murugan'],
              ['TWITTER · X', '@ashwinflies'],
              ['CV', '↓ ASHWIN-MURUGAN.pdf'],
            ].map(([k, v], i, arr) => (
              <div
                key={k}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr',
                  padding: '18px 0',
                  borderBottom: i < arr.length - 1 ? `1px solid ${C_PALETTE.line}` : 'none',
                  alignItems: 'baseline',
                }}
              >
                <div
                  style={{
                    fontFamily: cFonts.mono,
                    fontSize: 11,
                    color: C_PALETTE.ember,
                    letterSpacing: '0.26em',
                  }}
                >
                  {k}
                </div>
                <div
                  style={{
                    fontFamily: cFonts.display,
                    fontWeight: 700,
                    fontSize: 22,
                    color: C_PALETTE.ink,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer
        style={{
          background: C_PALETTE.ink,
          color: C_PALETTE.bg,
          padding: '32px 56px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: cFonts.mono,
          fontSize: 11,
          letterSpacing: '0.22em',
        }}
      >
        <span>© THE ASHWIN MURUGAN REVIEW · 2026</span>
        <span style={{ fontFamily: cFonts.serif, fontStyle: 'italic', fontSize: 22, letterSpacing: '0.06em' }}>
          End of Issue 03
        </span>
        <span>SET IN BRICOLAGE &amp; DM SERIF · MIT</span>
      </footer>
    </>
  );
}

function DirectionC() {
  const w = 1440;
  return (
    <div
      style={{
        width: w,
        background: C_PALETTE.bg,
        color: C_PALETTE.ink,
        fontFamily: cFonts.display,
      }}
    >
      <CMasthead />
      <CNav />
      <CHero w={w} />
      <CAbout />
      <CResearch />
      <CProjects />
      <CTimeline />
      <CAwards />
      <CWriting />
      <CContact />
    </div>
  );
}

window.DirectionC = DirectionC;
