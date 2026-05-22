// site-shell.jsx — page-based Nav, Subpage Hero, Footer, theme application,
// shared App wrappers for the home page and section subpages.

const { useState: useState_S, useEffect: useEffect_S, useRef: useRef_S } = React;

// ─── theme tables (mirror what the user can tweak) ───────────────────────────
const SHELL_ACCENTS = {
  amber:    { accent: '#e8a04a', glow1: 'rgba(232,160,74,0.18)', glow2: 'rgba(232,160,74,0.04)' },
  ember:    { accent: '#ef5d4f', glow1: 'rgba(239,93,79,0.22)',  glow2: 'rgba(239,93,79,0.05)' },
  cobalt:   { accent: '#6aa4ff', glow1: 'rgba(106,164,255,0.22)',glow2: 'rgba(106,164,255,0.05)' },
  phosphor: { accent: '#7fe3a4', glow1: 'rgba(127,227,164,0.18)',glow2: 'rgba(127,227,164,0.04)' },
};
const SHELL_BACKGROUNDS = {
  cosmos:   { bg: '#070a14', bg2: '#0c1120', star: '#f4ecd0' },
  ink:      { bg: '#050507', bg2: '#0a0a0e', star: '#f6f1de' },
  twilight: { bg: '#0d091c', bg2: '#15102a', star: '#f1e7ff' },
};
const SHELL_DENSITY = {
  compact:  { y: 60,  x: 56, gap: 18 },
  standard: { y: 110, x: 64, gap: 26 },
  spacious: { y: 160, x: 88, gap: 36 },
};
const SHELL_FONTS = {
  serif: '"Source Serif Pro", "Crimson Text", Georgia, serif',
  sans:  '"Space Grotesk", "Manrope", system-ui, sans-serif',
};

function applyTheme(t) {
  const r = document.documentElement;
  const a = SHELL_ACCENTS[t.accent] || SHELL_ACCENTS.amber;
  const b = SHELL_BACKGROUNDS[t.bgScheme] || SHELL_BACKGROUNDS.cosmos;
  const d = SHELL_DENSITY[t.density] || SHELL_DENSITY.standard;
  r.style.setProperty('--accent', a.accent);
  r.style.setProperty('--accent-glow-1', a.glow1);
  r.style.setProperty('--accent-glow-2', a.glow2);
  r.style.setProperty('--bg', b.bg);
  r.style.setProperty('--bg2', b.bg2);
  r.style.setProperty('--star', b.star);
  r.style.setProperty('--sect-y', d.y + 'px');
  r.style.setProperty('--sect-x', d.x + 'px');
  r.style.setProperty('--gap', d.gap + 'px');
  r.style.setProperty('--font-body', SHELL_FONTS[t.bodyFont] || SHELL_FONTS.serif);
}

// ─── tweaks shared via localStorage across pages ────────────────────────────
const TWEAK_STORAGE_KEY = 'ashwin-tweaks-v1';

function useSyncedTweaks(defaults) {
  const [t, setTweak] = useTweaks(defaults);
  const hydrated = useRef_S(false);

  // Hydrate once from localStorage so all pages share state
  useEffect_S(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    try {
      const stored = localStorage.getItem(TWEAK_STORAGE_KEY);
      if (stored) {
        const obj = JSON.parse(stored);
        if (obj && typeof obj === 'object') setTweak(obj);
      }
    } catch (e) {}
  }, []);

  // Persist on every change
  useEffect_S(() => {
    try {
      localStorage.setItem(TWEAK_STORAGE_KEY, JSON.stringify(t));
    } catch (e) {}
  }, [t]);

  return [t, setTweak];
}

// ─── reveal observer ────────────────────────────────────────────────────────
function useReveal() {
  useEffect_S(() => {
    const els = Array.from(document.querySelectorAll('.fade-in'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

// ─── nav (page-based) ────────────────────────────────────────────────────────
const NAV_ITEMS = [
  ['Personal Website.html', 'Home',       'home'],
  ['about.html',            'About',      'about'],
  ['research.html',         'Research',   'research'],
  ['projects.html',         'Projects',   'projects'],
  ['experience.html',       'Experience', 'experience'],
  ['awards.html',           'Awards',     'awards'],
  ['writing.html',          'Writing',    'writing'],
  ['contact.html',          'Contact',    'contact'],
];

function SiteNav({ active }) {
  const [scrolled, setScrolled] = useState_S(false);
  useEffect_S(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a className="nav-brand" href="Personal Website.html">
          <span className="nav-brand-mark">a</span>
          <span className="nav-brand-text">
            <strong>ASHWIN · MURUGAN</strong>
            <span className="nav-brand-sub">— STAR CHART</span>
          </span>
        </a>
        <div className="nav-links">
          {NAV_ITEMS.filter((x) => x[2] !== 'home').map(([href, label, id]) => (
            <a key={id} href={href} className={`nav-link ${active === id ? 'active' : ''}`}>
              {label}
            </a>
          ))}
        </div>
        <div className="nav-status">
          <span className="nav-dot" />
          <span>OBSERVING · MIT '30</span>
        </div>
      </div>
    </nav>
  );
}

// ─── subpage hero (slim banner above section content) ───────────────────────
function SubpageHero({ index, eyebrow, title, subtitle, meta }) {
  return (
    <header className="subhero">
      <div className="subhero-stars">
        <Starfield width={1600} height={360} density={0.7} seed={42} parallaxX={0} parallaxY={0} />
      </div>
      <div className="subhero-inner">
        <a href="Personal Website.html" className="subhero-back">
          ← Back to Star Chart
        </a>
        <div className="subhero-kicker accent">★ FIELD {index} · {eyebrow}</div>
        <h1 className="subhero-title">
          {title}
        </h1>
        {subtitle && <p className="subhero-sub">{subtitle}</p>}
        {meta && <div className="subhero-meta">{meta}</div>}
      </div>
    </header>
  );
}

// ─── footer ─────────────────────────────────────────────────────────────────
function SiteFooter({ note }) {
  return (
    <footer className="site-footer">
      <span>© ASHWIN MURUGAN · 2026</span>
      <span>★ FIELD CATALOGUE v1.0 · COMPILED MIT</span>
      <span>{note || 'END OF CHART'}</span>
    </footer>
  );
}

// ─── tweaks panel content (used by both Home & Subpage apps) ─────────────────
function ShellTweaks({ t, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Theme" />
      <TweakColor
        label="Accent"
        value={SHELL_ACCENTS[t.accent].accent}
        options={Object.values(SHELL_ACCENTS).map((x) => x.accent)}
        onChange={(v) => {
          const key = Object.keys(SHELL_ACCENTS).find((k) => SHELL_ACCENTS[k].accent === v);
          if (key) setTweak('accent', key);
        }}
      />
      <TweakColor
        label="Background"
        value={SHELL_BACKGROUNDS[t.bgScheme].bg}
        options={Object.values(SHELL_BACKGROUNDS).map((x) => x.bg)}
        onChange={(v) => {
          const key = Object.keys(SHELL_BACKGROUNDS).find((k) => SHELL_BACKGROUNDS[k].bg === v);
          if (key) setTweak('bgScheme', key);
        }}
      />

      <TweakSection label="Layout" />
      <TweakRadio
        label="Hero"
        value={t.hero}
        options={['typographic', 'constellation']}
        onChange={(v) => setTweak('hero', v)}
      />
      <TweakRadio
        label="Body type"
        value={t.bodyFont}
        options={['serif', 'sans']}
        onChange={(v) => setTweak('bodyFont', v)}
      />
      <TweakRadio
        label="Density"
        value={t.density}
        options={['compact', 'standard', 'spacious']}
        onChange={(v) => setTweak('density', v)}
      />

      <TweakSection label="Sky" />
      <TweakSlider
        label="Star density"
        value={t.starfield}
        min={0.4}
        max={2.6}
        step={0.1}
        unit="×"
        onChange={(v) => setTweak('starfield', v)}
      />
      <TweakToggle
        label="Shooting stars"
        value={t.shooting}
        onChange={(v) => setTweak('shooting', v)}
      />
    </TweaksPanel>
  );
}

// ─── home "catalogue" grid (replaces inline sections) ───────────────────────
const CATALOGUE = [
  {
    href: 'about.html',
    num: 'I',
    eyebrow: 'About',
    title: 'About me',
    teaser: 'A PhD student who never stopped looking up. The short version.',
    points: [[40, 30], [110, 60], [70, 120], [180, 100], [150, 50]],
  },
  {
    href: 'research.html',
    num: 'II',
    eyebrow: 'Research',
    title: 'What I\'m looking at',
    teaser: 'Scramjet shock trains, micron-scale flyers, SRM nozzle erosion.',
    points: [[20, 100], [80, 60], [140, 90], [180, 40], [220, 130]],
  },
  {
    href: 'projects.html',
    num: 'III',
    eyebrow: 'Projects',
    title: 'Things I built',
    teaser: 'AstroSim, SUAS, HydroChurn, FNO for aerospace — side quests.',
    points: [[60, 40], [120, 80], [60, 140], [180, 120], [200, 50]],
  },
  {
    href: 'experience.html',
    num: 'IV',
    eyebrow: 'Trajectory',
    title: 'The orbit so far',
    teaser: 'IIT Madras → IISc → Agnikul → EPFL → MIT DINAMO.',
    points: [[30, 60], [80, 130], [140, 100], [200, 60], [220, 150]],
  },
  {
    href: 'awards.html',
    num: 'V',
    eyebrow: 'Honours',
    title: 'Hardware on the shelf',
    teaser: 'NDSEG, UN Millennium, James Dyson Award, Subramanian Prize, KVPY.',
    points: [[50, 40], [120, 60], [90, 130], [180, 80], [220, 140]],
  },
  {
    href: 'writing.html',
    num: 'VI',
    eyebrow: 'Writing',
    title: 'From the logbook',
    teaser: 'Essays on propulsion, microflight, and re-reading Anderson.',
    points: [[20, 50], [90, 90], [160, 50], [220, 110], [180, 160]],
  },
  {
    href: 'contact.html',
    num: 'VII',
    eyebrow: 'Signal',
    title: 'Say hello',
    teaser: 'Email, GitHub, Scholar, LinkedIn, X, and the CV.',
    points: [[40, 80], [120, 40], [180, 90], [220, 50], [80, 140]],
  },
];

function Catalogue() {
  return (
    <section className="sect sect-bg catalogue-sect fade-in">
      <div className="section-label">
        <span className="accent">★</span>
        <span className="section-rule" />
        <span>Star Chart · Field Catalogue</span>
      </div>
      <div className="title-row">
        <h2 className="section-title">
          Pick a <em className="accent">field</em> to observe.
        </h2>
        <div className="meta">[ 07 FIELDS ]</div>
      </div>
      <div className="catalogue-grid">
        {CATALOGUE.map((c, i) => (
          <a key={c.href} href={c.href} className="cat-card hover-card">
            <div className="cat-card-head">
              <div className="cat-num accent">{c.num}</div>
              <Constellation w={120} h={90} points={c.points} scale={0.55} />
            </div>
            <div className="cat-eyebrow accent">★ {c.eyebrow}</div>
            <h3 className="cat-title">{c.title}</h3>
            <p className="cat-teaser">{c.teaser}</p>
            <div className="cat-foot">
              <span>FIELD {c.num}</span>
              <span className="link-arrow accent">→ OBSERVE</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ─── App wrappers ────────────────────────────────────────────────────────────
function HomeApp() {
  const [t, setTweak] = useSyncedTweaks(window.TWEAK_DEFAULTS);
  useEffect_S(() => applyTheme(t), [t.accent, t.bgScheme, t.density, t.bodyFont]);
  useReveal();

  return (
    <>
      <SiteNav active="home" />
      <main>
        <Hero
          density={t.starfield}
          variant={t.hero}
          shootingStars={t.shooting}
          onJump={() => {
            const el = document.querySelector('.catalogue-sect');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
        <Catalogue />
      </main>
      <SiteFooter />
      <ShellTweaks t={t} setTweak={setTweak} />
    </>
  );
}

function SubpageApp({ active, hero, children, footerNote }) {
  const [t, setTweak] = useSyncedTweaks(window.TWEAK_DEFAULTS);
  useEffect_S(() => applyTheme(t), [t.accent, t.bgScheme, t.density, t.bodyFont]);
  useReveal();
  return (
    <>
      <SiteNav active={active} />
      <main>
        <SubpageHero {...hero} />
        {children}
      </main>
      <SiteFooter note={footerNote} />
      <ShellTweaks t={t} setTweak={setTweak} />
    </>
  );
}

Object.assign(window, {
  HomeApp, SubpageApp, SiteNav, SubpageHero, SiteFooter, Catalogue,
  applyTheme, useSyncedTweaks, useReveal,
});
