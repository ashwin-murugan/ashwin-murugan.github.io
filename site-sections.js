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
              I'm Ashwin, a first-year graduate student in the AeroAstro department at MIT,
              working in the DINaMo Group led by{' '}
              <span className="accent">Prof. Hamsa Balakrishnan</span>. I’m supported by
              the 2026 NDSEG Fellowship from the U.S. Department of Defense. Before MIT, I
              completed my B.Tech in Aerospace Engineering at IIT Madras, graduating first in
              my department. My undergraduate research and internships spanned hypersonic
              wind-tunnel experiments at IISc Bangalore, acoustic microflyer fabrication at
              EPFL, scramjet isolator simulations at IIT Madras, and propulsion systems work
              at Agnikul Cosmos.
            </p>
            <p>
              As I begin my PhD, I’m exploring the intersection of aerospace systems, autonomy,
              and AI. I’m especially interested in drones and drone defense, AI for science and
              engineering, and how increasingly capable AI systems could change the way we
              design and test complex systems. Across these interests, I keep coming back to
              simulation, real-world testing, and the gap between what works in a model and
              what works in the air.
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
      tag: 'IN PREP · JFM',
      title: 'Scramjet Isolator Stability',
      blurb:
        'Large-eddy simulations of shock-train dynamics in scramjet isolators under fluctuating back-pressure, aimed at understanding stability limits and unstart prevention.',
      publication:
        'Ashwin Subramanian Murugan and T. M. Muruganandam, “Shock Train Stability in Scramjet Isolators under Back-Pressure Fluctuations.” Manuscript in preparation for JFM.',
      image: '1 (1).png',
      imageAlt: 'Numerical visualization of shock structures in a scramjet isolator',
      figureClass: 'wide light',
      year: '2026',
      status: 'IN PREP',
    },
    {
      tag: 'UNDER REVIEW · SCI. ADV.',
      title: 'Acoustically Actuated Microflyers',
      blurb:
        'Millimetre-scale acoustically actuated microflyers based on Helmholtz resonators, combining two-photon polymerization with experiments using a 40 kHz transducer array at EPFL.',
      publication:
        'J. Hwang, Q. Angéloz, Ashwin Subramanian Murugan, H. Lissek, and M. S. Sakar, “Acoustic Resonators as Wireless Actuators in Air for Small-Scale Robots.” Under review at Science Advances.',
      image: 'Screenshot 2026-05-29 003044.jpg',
      imageAlt: 'Acoustically actuated microflyer prototype from EPFL research',
      year: '2026',
      status: 'UNDER REVIEW',
    },
    {
      tag: 'POSTER · HEMCE 2026',
      title: 'Erosion and Slag Deposition in Solid Rocket Motor Nozzles',
      blurb:
        'Eulerian-Eulerian multiphase CFD study of alumina-driven erosion and slag deposition in solid rocket motor nozzles, with wall models compared against full-scale firing data.',
      publication:
        'Ashwin Subramanian Murugan, N. Srivastava, and P. A. Ramakrishna, “Numerical Investigation of Alumina-Induced Erosion and Slag Deposition in Solid Rocket Motors.” Poster presented at HEMCE 2026.',
      image: 'Picture1.png',
      imageAlt: 'Simulation result for alumina-induced erosion and deposition in a solid rocket motor nozzle',
      year: '2026',
      status: 'PRESENTED',
    },
  ];
  return (
    <section id="research" className="sect sect-bg fade-in">
      {!headless && (
        <>
          <SectionLabel index="02" label="Field II · Research Work" />
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
            <figure className={`research-figure ${it.figureClass || ''}`}>
              <img src={it.image} alt={it.imageAlt} />
            </figure>
            <div className="research-body">
              <div className="kicker accent">★ {it.tag}</div>
              <h3 className="research-title">{it.title}</h3>
              <p className="research-blurb">{it.blurb}</p>
              <div className="research-publication">
                <div className="research-publication-label">Publication</div>
                <p>{it.publication}</p>
              </div>
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
        'C++ N-body simulator for large-scale gravitational systems, using Barnes-Hut octrees, 3D inelastic collisions, and parallelization to simulate the Andromeda-Milky Way collision with 100K+ bodies.',
      image: '1 (2).png',
      imageAlt: 'AstroSim visualization of an N-body galaxy collision simulation',
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
      tag: 'Hardware · UN Fellow',
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
              {!p.image && (
                <div className="proj-constellation">
                  <Constellation w={240} h={180} points={p.points} />
                </div>
              )}
            </div>
            {p.image && (
              <div className="proj-media">
                <img src={p.image} alt={p.imageAlt} />
              </div>
            )}
            <p className="proj-blurb">{p.blurb}</p>
            <div className="proj-foot">
              <span>{p.image ? '[ image available ]' : '[ writeup soon ]'}</span>
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
    ['LINKEDIN', '↗ /in/ashwin-subramanian-m', 'https://www.linkedin.com/in/ashwin-subramanian-m/'],
    ['GITHUB', '↗ /ashwin-murugan', 'https://github.com/ashwin-murugan'],
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
