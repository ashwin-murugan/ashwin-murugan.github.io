// site-sections.jsx — all the body sections for Ashwin's site

function SectionLabel({ index, label }) {
  return (
    <div className="section-label">
      <span className="accent">★ {index}</span>
      <span className="section-rule" />
      <span>{label}</span>
    </div>
  );
}

function SectionTitle({ children }) {
  return <h2 className="section-title">{children}</h2>;
}

function About({ headless = false }) {
  return (
    <section id="about" className="sect sect-bg fade-in">
      {!headless && <SectionLabel index="01" label="Field I · About" />}
      <div className="about-grid">
        <div>
          {!headless && (
            <h2 className="huge">
              I grew up squinting at rockets and never quite{' '}
              <em className="accent">stopped looking up.</em>
            </h2>
          )}
          <div className="prose">
            <p>
              I'm a first-year PhD student at MIT, joining the{' '}
              <span className="accent">DINAMO Lab</span> on the NDSEG Fellowship. Before that I
              finished my B.Tech in Aerospace Engineering at IIT Madras — first in the department —
              with detours through hypersonic wind tunnels in Bangalore, microflyer fabrication at
              EPFL, and a propulsion stint at Agnikul Cosmos.
            </p>
            <p>
              The thread through all of it: things that move <em>fast</em>, things that move{' '}
              <em>small</em>, and the unsteady fluid dynamics that decides whether either of those
              things actually flies. Lately I've been curious about what neural operators and
              reduced-order models can do for the kind of CFD I run on a daily basis.
            </p>
          </div>
        </div>

        <aside className="now-card">
          <div className="now-head accent">☉ CURRENTLY</div>
          <div className="now-row">→ Cambridge, MA</div>
          <div className="now-row">→ Starting PhD · MIT AeroAstro</div>
          <div className="now-row">→ Wrapping a manuscript on shock-train stability</div>
          <div className="now-row">→ Re-reading Anderson's <em>Hypersonics</em></div>
          <div className="now-head accent">☉ ALWAYS THINKING ABOUT</div>
          <div className="now-row">→ Why scramjets unstart</div>
          <div className="now-row">→ Acoustic levitation</div>
          <div className="now-row">→ Whether we can fly things on Titan</div>
          <div className="now-row">→ The right loss for a Fourier neural operator</div>
        </aside>
      </div>
    </section>
  );
}

function Research({ headless = false }) {
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
      title: 'Characterization of Helmholtz Resonators for Acoustic Force Generation and Microflight',
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
    <section id="research" className="sect sect-bg fade-in">
      {!headless && (
        <>
          <SectionLabel index="02" label="Field II · Research & Publications" />
          <div className="title-row">
            <SectionTitle>
              What I'm <em className="accent">looking at.</em>
            </SectionTitle>
            <div className="meta">[ 03 ENTRIES ]</div>
          </div>
        </>
      )}

      <div className="research-list">
        {items.map((it, i) => (
          <article key={i} className="research-row hover-row">
            <div className="research-num">{String(i + 1).padStart(2, '0')}</div>
            <div className="research-body">
              <div className="kicker accent">★ {it.tag}</div>
              <h3 className="research-title">{it.title}</h3>
              <div className="research-authors">{it.authors}</div>
              <p className="research-blurb">{it.blurb}</p>
            </div>
            <div className="research-meta">
              <div>{it.year}</div>
              <span className="accent link-arrow">DRAFT IN PREP</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Projects({ headless = false }) {
  const projects = [
    {
      label: 'AstroSim',
      tag: 'Astronomy · C++',
      blurb:
        'N-body solver simulating the Andromeda–Milky Way collision with 100K+ bodies. Barnes-Hut octree + parallelism for an 8× speed-up.',
      points: [[40, 30], [110, 60], [70, 120], [180, 100], [150, 50], [200, 160]],
    },
    {
      label: 'SUAS 2025',
      tag: 'Autonomy · UAV',
      blurb:
        'Autonomous quadcopter for the Student UAS competition — synthetic Blender datasets, real-time ground marker detection, precision payload drop.',
      points: [[20, 100], [80, 60], [140, 90], [180, 40], [220, 130]],
    },
    {
      label: 'HydroChurn',
      tag: 'Hardware · UN Millennium Fellow',
      blurb:
        'Portable, self-sustaining water bottle. Runner-up at the James Dyson Award 2024 (India). Now scaling with the UN Millennium Fellowship.',
      points: [[60, 40], [120, 80], [60, 140], [180, 120], [200, 50]],
    },
    {
      label: 'FNO Aerospace',
      tag: 'ML for CFD',
      blurb:
        'Fourier neural operator for transient flow over parameterized elliptical bodies + an ROM-based morphing-airfoil controller for constant-lift in turbulence.',
      points: [[30, 60], [80, 130], [140, 100], [200, 60], [220, 150]],
    },
  ];
  return (
    <section id="projects" className="sect sect-bg2 fade-in">
      {!headless && (
        <>
          <SectionLabel index="03" label="Field III · Projects & Side Quests" />
          <SectionTitle>
            Things I <em className="accent">built</em> when nobody asked.
          </SectionTitle>
        </>
      )}

      <div className="proj-grid">
        {projects.map((p, i) => (
          <article key={i} className="proj-card hover-card">
            <div className="proj-card-head">
              <div>
                <div className="kicker accent">★ {String(i + 1).padStart(2, '0')} · {p.tag}</div>
                <h3 className="proj-title">{p.label}</h3>
              </div>
              <div className="proj-constellation">
                <Constellation w={240} h={180} points={p.points} />
              </div>
            </div>
            <p className="proj-blurb">{p.blurb}</p>
            <div className="proj-foot">
              <span>[ photos + writeup soon ]</span>
              <span className="accent link-arrow">IN PROGRESS</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience({ headless = false }) {
  const xp = [
    ['2026 —', 'MIT AeroAstro · DINAMO Lab', 'PhD student · NDSEG Fellow', 'Cambridge, MA'],
    ['2025', 'EPFL', 'E3 Summer Research — acoustic microflyers (Prof. Sakar)', 'Lausanne'],
    ['2024–25', 'Agnikul Cosmos', 'Propulsion Intern — LOX sub-cooling for booster testing', 'Chennai'],
    ['2024', 'IISc Bangalore', 'Hypersonic shock pulsations · Mach 6 RNHWT (Prof. Duvvuri)', 'Bangalore'],
    ['2023 — 2026', 'IIT Madras', 'B.Tech Aerospace · Dept. Rank 1/75 · CGPA 9.92', 'Chennai'],
    ['2023 — 2024', 'Shaastra Coding Vertical', 'Coordinator — 25K+ participants', 'IIT Madras'],
  ];
  return (
    <section id="experience" className="sect sect-bg fade-in">
      {!headless && (
        <>
          <SectionLabel index="04" label="Field IV · Trajectory" />
          <SectionTitle>
            The <em className="accent">orbit</em> so far.
          </SectionTitle>
        </>
      )}
      <div className="xp-wrap">
        <div className="xp-line" />
        {xp.map((row, i) => (
          <div key={i} className="xp-row">
            <div className="xp-dot" />
            <div className="xp-date">{row[0]}</div>
            <div>
              <div className="xp-org">{row[1]}</div>
              <div className="xp-role">{row[2]}</div>
            </div>
            <div className="xp-loc">{row[3]}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Awards({ headless = false }) {
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
    <section id="awards" className="sect sect-bg fade-in">
      {!headless && <SectionLabel index="05" label="Field V · Honours" />}
      <div className="awards-grid">
        {awards.map(([name, sub], i) => (
          <div key={i} className="award hover-card">
            <div className="award-badge accent">★</div>
            <div>
              <div className="award-name">{name}</div>
              <div className="award-sub">{sub}</div>
            </div>
            <div className="award-num">0{i + 1}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Writing({ headless = false }) {
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
    <section id="writing" className="sect sect-bg2 fade-in">
      {!headless && (
        <>
          <SectionLabel index="06" label="Field VI · Writing" />
          <div className="title-row">
            <SectionTitle>
              From the <em className="accent">logbook.</em>
            </SectionTitle>
            <span className="meta accent">ALL ENTRIES</span>
          </div>
        </>
      )}
      <div className="writing-grid">
        {posts.map((p, i) => (
          <article key={i} className="post hover-card">
            <div className="kicker accent">★ ENTRY 0{i + 1}</div>
            <h3 className="post-title">{p.title}</h3>
            <div className="post-meta">{p.meta}</div>
            <p className="post-blurb">{p.blurb}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact({ headless = false }) {
  const channels = [
    ['EMAIL', 'ashwinsm [at] mit.edu', 'mailto:ashwinsm@mit.edu'],
    ['SCHOLAR', 'scholar profile', null],
    ['GITHUB', '↗ /Ashwin2174', 'https://github.com/Ashwin2174'],
    ['LINKEDIN', '↗ /in/ashwin-murugan', 'https://www.linkedin.com/in/ashwin-murugan'],
    ['TWITTER', '↗ @ashwinflies', 'https://x.com/ashwinflies'],
    ['CV', '↗ download pdf', 'uploads/Ashwin_Research_CV.pdf'],
  ];
  return (
    <section id="contact" className="sect sect-bg contact-sect fade-in">
      <div className="contact-stars">
        <Starfield width={1600} height={500} density={0.5} seed={31} parallaxX={0} parallaxY={0} />
      </div>
      <div className="contact-inner">
        {!headless && (
          <>
            <SectionLabel index="07" label="Field VII · Signal" />
            <h2 className="hero-name hero-name-contact">
              Say <em className="accent">hello</em>
              <br />— or send me a paper to read.
            </h2>
          </>
        )}
        <div className="contact-grid">
          {channels.map(([k, v, href]) => {
            const content = (
              <>
                <div className="contact-key accent">{k}</div>
                <div className="contact-val">{v}</div>
              </>
            );
            return href ? (
              <a key={k} className="contact-cell hover-row" href={href}>
                {content}
              </a>
            ) : (
              <div key={k} className="contact-cell hover-row">
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { About, Research, Projects, Experience, Awards, Writing, Contact });
