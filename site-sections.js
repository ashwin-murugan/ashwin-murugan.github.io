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

function About() {
  return (
    <section id="about" className="sect sect-bg fade-in">
      <SectionLabel index="01" label="Field I · About" />
      <div className="about-grid">
        <div>
          <div className="prose">
            <p>
              I'm a first-year PhD student in MIT AeroAstro, working with{' '}
              <span className="accent">Prof. Hamsa Balakrishnan</span> in the DINaMo Group.
              I’m supported by the 2026 NDSEG Fellowship from the U.S. Department of Defense.
              Before MIT, I completed my B.Tech in Aerospace Engineering at IIT Madras,
              graduating first in my department. My undergraduate research and internships took
              me through hypersonic wind-tunnel experiments in Bangalore, acoustic microflyer
              fabrication at EPFL, scramjet isolator simulations at IIT Madras, and propulsion
              work at Agnikul Cosmos.
            </p>
            <p>
              I’m still figuring out the exact direction of my PhD. At the moment, I’m drawn to
              drones and autonomous flight, drone defense, AI for science, and the ways
              increasingly capable AI systems could change engineering research. I also keep
              coming back to simulation, real-world testing, and the gap between what works in
              a model and what works in the air.
            </p>
          </div>
        </div>

        <aside className="now-card">
          <div className="now-head accent">☉ CURRENTLY</div>
          <div className="now-row">→ MIT AeroAstro · S.M./Ph.D. track</div>
          <div className="now-row">→ Graduate researcher · DINaMo Group</div>
          <div className="now-row">→ 2026 NDSEG Fellow</div>
          <div className="now-row">→ Writing up scramjet and microflyer manuscripts</div>
          <div className="now-head accent" style={{ marginTop: '1.2em' }}>☉ INTERESTS</div>
          <div className="now-row">→ High-speed flows, CFD, and propulsion</div>
          <div className="now-row">→ Drones, autonomy, and defense systems</div>
          <div className="now-row">→ AI for science and engineering design</div>
          <div className="now-row">→ Simulation, testing, and real-world deployment</div>
        </aside>
      </div>
    </section>
  );
}

function Research({ headless = false }) {
  const items = [
    {
      tag: 'UNDER REVIEW · SCI. ADV.',
      title: 'Acoustic Resonators as Wireless Actuators in Air for Small-Scale Robots',
      authors: 'J. Hwang, Q. Angéloz, A. S. Murugan, H. Lissek, M. S. Sakar',
      blurb:
        'One of the smallest artificial flying robots ever built — a millimetre-scale acoustically actuated microflyer using Helmholtz resonators, fabricated with two-photon polymerization at EPFL.',
      year: '2026',
      status: 'UNDER REVIEW',
    },
    {
      tag: 'IN PREP · JFM',
      title: 'Shock Train Stability in Scramjet Isolators under Back-Pressure Fluctuations',
      authors: 'A. S. Murugan, T. M. Muruganandam',
      blurb:
        'Using LES with OpenSBLI to resolve unsteady shock-boundary layer coupling, then deriving an isolator design criterion that keeps the engine from unstarting when the combustor talks back.',
      year: '2026',
      status: 'IN PREP',
    },
    {
      tag: 'POSTER · HEMCE 2026',
      title: 'Numerical Investigation of Alumina-Induced Erosion and Slag Deposition in Solid Rocket Motors',
      authors: 'A. S. Murugan, N. Srivastava, P. A. Ramakrishna',
      blurb:
        'Multiphase CFD of SRM nozzles using a Eulerian–Eulerian approach — building empirical deposition and erosion models validated against full-scale firing data.',
      year: '2026',
      status: 'PRESENTED',
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
              <span className="accent link-arrow">{it.status}</span>
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
    {
      label: 'DNS Solver',
      tag: 'CFD · C++',
      blurb:
        '3D compressible curvilinear finite-difference DNS solver for high-fidelity flow simulation — Navier–Stokes on curvilinear grids, validated on canonical benchmarks.',
      points: [[50, 20], [100, 50], [160, 30], [200, 80], [130, 120], [60, 140]],
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

function Awards({ headless = false }) {
  const awards = [
    ['2026', 'NDSEG Fellowship', 'U.S. Department of Defense graduate research fellowship', 'USA'],
    ['2026', 'Prof E G Tulapurkara Prize', 'Best academic performance in third-year aerospace engineering', 'IIT Madras'],
    ['2026', 'Jane Street Poker Bots · 3rd Place', 'Designed and developed a bot for a custom poker variant', 'IIT Madras'],
    ['2025', 'UN Millennium Fellowship', 'Selected to further develop HydroChurn as a sustainability project', 'Global'],
    ['2025', 'Prof T K Varadan Prize', 'Best academic performance in second-year aerospace engineering', 'IIT Madras'],
    ['2024', 'Sri S Subramanian Prize', 'Highest first-year CGPA among 1500+ B.Tech students', 'IIT Madras'],
    ['2024', 'James Dyson Award · Runner-Up', 'National runner-up in India for HydroChurn, a self-sustaining water bottle', 'India'],
    ['2024', 'Airbus Flight Challenge · First Runner-Up', 'Shaastra competition on aircraft braking dynamics and prediction', 'IIT Madras'],
    ['2024', 'IAS Summer Research Fellowship', 'Fully funded summer research fellowship at IISc Bangalore', 'Bangalore'],
    ['2021', 'KVPY Fellowship', 'Department of Science and Technology fellowship · AIR 239', 'India'],
  ];
  return (
    <section id="awards" className="sect sect-bg fade-in">
      {!headless && (
        <>
          <SectionLabel index="04" label="Field IV · Honours" />
          <SectionTitle>
            Hardware on <em className="accent">the shelf.</em>
          </SectionTitle>
        </>
      )}
      <div className="xp-wrap awards-timeline">
        <div className="xp-line" />
        {awards.map((row, i) => (
          <div key={i} className="xp-row award-row">
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

function Contact({ headless = false }) {
  const channels = [
    ['EMAIL', 'ashwinm [at] mit.edu', 'mailto:ashwinm@mit.edu'],
    ['GITHUB', '↗ /ashwin-murugan', 'https://github.com/ashwin-murugan'],
    ['LINKEDIN', '↗ /in/ashwin-murugan', 'https://www.linkedin.com/in/ashwin-murugan'],
    ['CV', '↗ download pdf', 'uploads/Ashwin___Research_CV___MIT.pdf'],
  ];
  return (
    <section id="contact" className="sect sect-bg contact-sect fade-in">
      <div className="contact-stars">
        <Starfield width={1600} height={500} density={0.5} seed={31} parallaxX={0} parallaxY={0} />
      </div>
      <div className="contact-inner">
        {!headless && (
          <>
            <SectionLabel index="05" label="Field V · Signal" />
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

function CV() {
  const pdf = 'uploads/Ashwin___Research_CV___MIT.pdf';
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container || !window.pdfjsLib) return;

    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    window.pdfjsLib.getDocument(pdf).promise.then(doc => {
      container.innerHTML = '';
      const renderPage = (n) => {
        if (n > doc.numPages) return;
        doc.getPage(n).then(page => {
          const vp = page.getViewport({ scale: 1.8 });
          const canvas = document.createElement('canvas');
          canvas.width = vp.width;
          canvas.height = vp.height;
          canvas.style.cssText = 'width:100%;display:block;margin-bottom:6px;border-radius:4px;';
          container.appendChild(canvas);
          page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise.then(
            () => renderPage(n + 1)
          );
        });
      };
      renderPage(1);
    });
  }, []);

  return (
    <section id="cv" className="sect sect-bg2 fade-in">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--gap)' }}>
        <a href={pdf} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none' }}>
          OPEN PDF ↗
        </a>
      </div>
      <div ref={containerRef} style={{ background: '#fff', borderRadius: 6, padding: 8 }}>
        <p style={{ textAlign: 'center', padding: 24, color: '#888' }}>Loading…</p>
      </div>
    </section>
  );
}

Object.assign(window, { About, Research, Projects, Awards, Contact, CV });
