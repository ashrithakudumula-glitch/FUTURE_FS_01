import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiBriefcase, FiAward, FiLayers, FiServer, FiDatabase, FiTool } from 'react-icons/fi';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const SKILL_CATEGORIES = [
  {
    icon: <FiLayers />,
    label: 'Frontend',
    skills: [
      { name: 'HTML5 / CSS3', pct: 90 },
      { name: 'JavaScript', pct: 85 },
      { name: 'Angular', pct: 80 },
      { name: 'React', pct: 72 },
    ],
  },
  {
    icon: <FiServer />,
    label: 'Backend',
    skills: [
      { name: 'Node.js', pct: 78 },
      { name: 'TypeScript', pct: 75 },
      { name: 'REST API Design', pct: 72 },
      { name: 'C++', pct: 65 },
    ],
  },
  {
    icon: <FiDatabase />,
    label: 'Databases',
    skills: [
      { name: 'Firebase / Firestore', pct: 85 },
      { name: 'MySQL / SQL', pct: 75 },
      { name: 'MongoDB', pct: 72 },
      
    ],
  },
  {
    icon: <FiTool />,
    label: 'Tools & Dev',
    skills: [
      { name: 'VS Code', pct: 92 },
      { name: 'GitHub', pct: 70 },
      { name: 'XAMPP', pct: 65 },
      { name: 'DOM Manipulation', pct: 80 },
    ],
  },
];

const SKILL_FLASHCARDS = [
  { icon: '🌐', name: 'HTML5' },
  { icon: '🎨', name: 'CSS3' },
  { icon: '🟨', name: 'JavaScript' },
  { icon: '🔷', name: 'TypeScript' },
  { icon: '🔴', name: 'Angular' },
  { icon: '⚛️', name: 'React' },
  { icon: '🟢', name: 'Node.js' },
  { icon: '🔥', name: 'Firebase' },
  { icon: '🐬', name: 'MySQL' },
  { icon: '🗄️', name: 'SQL' },
  { icon: '🔀', name: 'GitHub' },
  { icon: '💻', name: 'C++' },
  { icon: '🧩', name: 'XAMPP' },
  { icon: '🔐', name: 'Firebase' },
];

// Only projects + certifications — no education entries
const JOURNEY = [
  {
    year: 'April 2026',
    type: 'work',
    icon: <FiBriefcase />,
    role: 'Full-Stack Web Developer',
    place: 'Future Interns',
    location: 'Remote',
    desc: 'Internship',
    tags: ['Internship', 'Full-Stack Development', 'Web Development'],
  },
    {
    year: 'Mar 2026',
    type: 'work',
    icon: <FiBriefcase />,
    role: 'GlobeStay — Full-Stack Reservation System',
    place: 'Personal Project',
    location: 'HTML · Angular · TypeScript · Firebase',
    desc: 'Built a responsive hotel reservation platform with multi-parameter search across 3+ filters (city, country, hotel name). Implemented real-time Firestore data sync, Firebase Authentication and an end-to-end booking workflow reducing manual input steps by 40–50%.',
    tags: ['Angular', 'TypeScript', 'Firebase', 'CSS3', 'JavaScript'],
  },
  {
    year: 'Feb 2026',
    type: 'work',
    icon: <FiBriefcase />,
    role: 'B-Vikas — Digital Identity Protocol',
    place: 'ECOTHON 2047 · PRITHVI 2026',
    location: 'HTML · CSS · JavaScript · Node.js',
    desc: 'Co-developed a 5-layer digital verification architecture simulating a scalable DPI model. Integrated Aadhaar VID-based auth with AI-driven biometric liveness checks, a ZKP framework for privacy compliance (DPDP Act) and Hyperledger Fabric blockchain for immutable audit trails.',
    tags: ['Node.js', 'Blockchain', 'ZKP', 'API Gateway', 'Hyperledger'],
  },
  {
    year: '2026',
    type: 'cert',
    icon: <FiAward />,
    role: 'HTML5, CSS3 and JavaScript',
    place: 'Infosys Springboard',
    location: 'Certification · 2026',
    desc: 'Completed professional certification in core web technologies covering modern HTML5 semantics, advanced CSS3 styling techniques and JavaScript fundamentals for interactive web development.',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    year: 'Feb 2026',
    type: 'cert',
    icon: <FiAward />,
    role: 'ECOTHON — Certificate of Participation',
    place: 'SDG Summit · CHRIST University, Bangalore',
    location: 'PRITHVI 2026 · Feb 2026',
    desc: 'Participated in ECOTHON, a national-level sustainability hackathon at CHRIST University. Presented B-Vikas, a digital identity solution addressing SDG goals through secure, privacy-preserving verification technology.',
    tags: ['Hackathon', 'SDG', 'Innovation'],
  },
];

const TYPE_COLORS = {
  work: { bg: 'rgba(255,34,34,0.12)', border: 'rgba(255,34,34,0.35)', text: 'var(--neon-primary)' },
  cert: { bg: 'rgba(234,179,8,0.12)', border: 'rgba(234,179,8,0.35)', text: '#facc15' },
};

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function SkillBar({ name, pct, animate }) {
  return (
    <div className="skill-bar-item">
      <div className="skill-bar-header">
        <span className="skill-bar-name">{name}</span>
        <span className="skill-bar-pct">{pct}%</span>
      </div>
      <div className="skill-bar-track">
        <div className="skill-bar-fill" style={{ width: animate ? `${pct}%` : '0%' }} />
      </div>
    </div>
  );
}

function CategoryCard({ icon, label, skills, animate }) {
  return (
    <div className="glass-card" style={{ padding: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 9,
          background: 'rgba(255,34,34,0.12)', border: '1px solid rgba(255,34,34,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--neon-primary)', fontSize: '1rem',
        }}>
          {icon}
        </div>
        <span style={{ fontWeight: 700, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-primary)' }}>
          {label}
        </span>
      </div>
      {skills.map(s => <SkillBar key={s.name} {...s} animate={animate} />)}
    </div>
  );
}

function JourneyContent({ item, colors, align }) {
  return (
    <div className="glass-card" style={{ padding: '24px', textAlign: align }}>
      <div style={{
        display: 'inline-block', marginBottom: 12,
        padding: '4px 12px', borderRadius: 100,
        background: colors.bg, border: `1px solid ${colors.border}`,
        fontSize: '0.78rem', fontWeight: 700,
        color: colors.text, letterSpacing: '0.08em',
      }}>
        {item.year}
      </div>
      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-primary)' }}>
        {item.role}
      </h3>
      <div style={{ fontSize: '0.88rem', color: colors.text, fontWeight: 600, marginBottom: 2 }}>
        {item.place}
      </div>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 12 }}>
        {item.location}
      </div>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 14 }}>
        {item.desc}
      </p>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: align === 'right' ? 'flex-end' : 'flex-start' }}>
        {item.tags.map(tag => <span key={tag} className="project-tag">{tag}</span>)}
      </div>
    </div>
  );
}

function JourneyCard({ item, index }) {
  const colors = TYPE_COLORS[item.type];
  const isLeft = index % 2 === 0;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', alignItems: 'start', marginBottom: 40 }}>
      <div style={{ padding: '0 24px 0 0', textAlign: 'right' }}>
        {isLeft ? <JourneyContent item={item} colors={colors} align="right" /> : null}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: colors.bg, border: `2px solid ${colors.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: colors.text, fontSize: '1rem',
          boxShadow: `0 0 16px ${colors.bg}`,
          zIndex: 1, flexShrink: 0,
        }}>
          {item.icon}
        </div>
        <div style={{ width: 1, flex: 1, minHeight: 40, background: 'linear-gradient(to bottom, var(--glass-border), transparent)' }} />
      </div>
      <div style={{ padding: '0 0 0 24px' }}>
        {!isLeft ? <JourneyContent item={item} colors={colors} align="left" /> : null}
      </div>
    </div>
  );
}

function JourneyCardMobile({ item }) {
  const colors = TYPE_COLORS[item.type];
  return (
    <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: colors.bg, border: `2px solid ${colors.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: colors.text, fontSize: '0.9rem',
        }}>
          {item.icon}
        </div>
        <div style={{ width: 1, flex: 1, minHeight: 20, background: 'var(--glass-border)', marginTop: 8 }} />
      </div>
      <div className="glass-card" style={{ padding: '20px', flex: 1 }}>
        <div style={{
          display: 'inline-block', marginBottom: 10,
          padding: '3px 10px', borderRadius: 100,
          background: colors.bg, border: `1px solid ${colors.border}`,
          fontSize: '0.75rem', fontWeight: 700, color: colors.text,
        }}>
          {item.year}
        </div>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 3 }}>{item.role}</h3>
        <div style={{ fontSize: '0.85rem', color: colors.text, fontWeight: 600, marginBottom: 2 }}>{item.place}</div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 10 }}>{item.location}</div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>{item.desc}</p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {item.tags.map(tag => <span key={tag} className="project-tag">{tag}</span>)}
        </div>
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function SkillsJourney() {
  const [barsVisible, setBarsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const barsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setBarsVisible(true); },
      { threshold: 0.2 }
    );
    if (barsRef.current) observer.observe(barsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filters = ['All', 'Projects', 'Certifications'];
  const typeMap = { Projects: 'work', Certifications: 'cert' };
  const filteredJourney = activeFilter === 'All'
    ? JOURNEY
    : JOURNEY.filter(j => j.type === typeMap[activeFilter]);

  return (
    <>
      <Helmet>
        <title>Skills & Journey | Ashritha Kudumula</title>
        <meta name="description" content="Explore Ashritha Kudumula's technical skills, proficiency levels, and project journey — building real-world full-stack applications." />
      </Helmet>

      {/* ── HERO ── */}
      <section className="section" style={{ paddingTop: 140 }}>
        <div className="container">
          <div className="section-label">Who I Am</div>
          <h1 className="section-title">
            Skills &amp; <span className="gradient-text">Journey</span>
          </h1>
          <p className="section-subtitle">
            A deep dive into my technical toolkit and the path that shaped me as a developer —
            every project, every certification, every milestone.
          </p>
        </div>
      </section>

      {/* ── SKILL FLASHCARDS ── */}
      <section style={{ paddingBottom: 80 }}>
        <div className="container">
          <div className="section-label">Tech Stack</div>
          <h2 className="section-title" style={{ marginBottom: 12 }}>
            Tools I <span className="gradient-text">Work With</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 40, fontSize: '1rem' }}>
            Hover over each card to see it light up.
          </p>
          <div className="skills-flashcards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))' }}>
            {SKILL_FLASHCARDS.map(({ icon, name }) => (
              <div className="skill-card" key={name}>
                <div className="skill-icon">{icon}</div>
                <div className="skill-name">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFICIENCY BARS ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-label">Proficiency</div>
          <h2 className="section-title">
            Skill <span className="gradient-text">Levels</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 48, fontSize: '1rem', maxWidth: 560 }}>
            Self-assessed proficiency across my stack — honest, current, and always growing.
          </p>
          <div
            ref={barsRef}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}
          >
            {SKILL_CATEGORIES.map(cat => (
              <CategoryCard key={cat.label} {...cat} animate={barsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* ── JOURNEY TIMELINE ── */}
      <section className="section">
        <div className="container">
          <div className="section-label">My Story</div>
          <h2 className="section-title">
            The <span className="gradient-text">Journey</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 40, fontSize: '1rem', maxWidth: 560 }}>
            Projects built and certifications earned — every step that got me here.
          </p>

          {/* Filter tabs */}
          <div className="projects-filter" style={{ marginBottom: 48 }}>
            {filters.map(f => (
              <button
                key={f}
                className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 48 }}>
            {[
              { type: 'work', label: 'Projects' },
              { type: 'cert', label: 'Certifications' },
            ].map(({ type, label }) => {
              const c = TYPE_COLORS[type];
              return (
                <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: c.text, boxShadow: `0 0 8px ${c.text}` }} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{label}</span>
                </div>
              );
            })}
          </div>

          {/* Timeline */}
          {isMobile ? (
            <div>
              {filteredJourney.map((item, i) => (
                <JourneyCardMobile key={i} item={item} />
              ))}
            </div>
          ) : (
            <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
              <div style={{
                position: 'absolute',
                left: '50%', top: 0, bottom: 0, width: 1,
                background: 'linear-gradient(to bottom, var(--neon-primary), var(--glass-border), transparent)',
                transform: 'translateX(-50%)',
                zIndex: 0,
              }} />
              {filteredJourney.map((item, i) => (
                <JourneyCard key={i} item={item} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section style={{ paddingBottom: 100 }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 20, padding: '48px',
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: 20,
            backdropFilter: 'blur(20px)',
            textAlign: 'center',
          }}>
            {[
              { num: '2+', label: 'Projects Shipped' },
              { num: '16+', label: 'Technologies' },
              { num: '2',   label: 'Certifications' },
            ].map(({ num, label }) => (
              <div key={label}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: '2.8rem',
                  color: 'var(--neon-primary)',
                  textShadow: '0 0 20px var(--neon-primary)',
                  lineHeight: 1,
                }}>
                  {num}
                </div>
                <div style={{
                  fontSize: '0.82rem', color: 'var(--text-muted)',
                  textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 8,
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}