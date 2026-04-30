import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiDownload, FiCode, FiLayout, FiServer, FiDatabase } from 'react-icons/fi';

const TYPED_STRINGS = [
  'Full-Stack Developer',
  'Angular Enthusiast',
  'React Developer',
  'Node.js Builder',
  'Problem Solver',
];

const STATS = [
  { num: '2+', label: 'Projects Shipped' },
  { num: '16+', label: 'Technologies' },
  { num: '2', label: 'Certifications' },
  { num: '92%', label: '12th Boards' },
];

const ORBIT_ICONS = [
  { icon: <FiCode />, label: 'Code' },
  { icon: <FiLayout />, label: 'UI' },
  { icon: <FiServer />, label: 'Backend' },
  { icon: <FiDatabase />, label: 'DB' },
];

const TECH_PREVIEW = [
  { emoji: '🔴', name: 'Angular' },
  { emoji: '⚛️', name: 'React' },
  { emoji: '🟢', name: 'Node.js' },
  { emoji: '🍃', name: 'MongoDB' },
  { emoji: '🔷', name: 'TypeScript' },
  { emoji: '🔥', name: 'Express.js' },
];

export default function Home() {
  const [typedIdx, setTypedIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState('typing');

  useEffect(() => {
    const current = TYPED_STRINGS[typedIdx];
    let timeout;
    if (phase === 'typing') {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
      } else {
        timeout = setTimeout(() => setPhase('waiting'), 1500);
      }
    } else if (phase === 'waiting') {
      timeout = setTimeout(() => setPhase('erasing'), 500);
    } else if (phase === 'erasing') {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setTypedIdx((typedIdx + 1) % TYPED_STRINGS.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, phase, typedIdx]);

  return (
    <>
      <Helmet>
        <title>Ashritha Kudumula | Full-Stack Developer Portfolio</title>
        <meta name="description" content="Ashritha Kudumula — Full-Stack Developer specializing in React, Angular, Node.js, and MongoDB. Building fast, beautiful, scalable applications." />
        <meta name="keywords" content="full-stack developer, react developer, angular, node.js, mongodb, web development, portfolio, Ashritha Kudumula" />
        <meta property="og:title" content="Ashritha Kudumula | Full-Stack Developer" />
        <meta property="og:description" content="Building fast, beautiful, scalable applications." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero */}
      <section className="hero section">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                Open to Internships &amp; Projects
              </div>

              <h1 className="hero-title">
                Hi, I'm <span className="gradient-text">Ashritha</span>
                <br />
                <span className="neon-text">Kudumula</span>
              </h1>

              <div className="hero-typed">
                <span style={{ color: 'var(--text-secondary)' }}>
                  {displayed}
                  <span style={{ color: 'var(--neon-primary)' }}>|</span>
                </span>
              </div>

              <p className="hero-desc">
                A passionate full-stack developer building high-performance, visually stunning
                web experiences with Angular, React, Node.js and MongoDB.
              </p>

              <div className="hero-cta">
                <Link to="/projects" className="btn-primary">
                  View My Work <FiArrowRight />
                </Link>
                <a href="/resume.pdf" download className="btn-outline">
                  Download CV <FiDownload />
                </a>
              </div>

              <div className="hero-stats">
                {STATS.map(({ num, label }) => (
                  <div className="hero-stat" key={label}>
                    <span>{num}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-avatar-ring">
                <div className="ring" />
                <div className="ring" />
                <div className="ring" />
                <div className="avatar-container">AK</div>
                {ORBIT_ICONS.map(({ icon, label }, i) => (
                  <div className="orbit-icon" key={label} style={{ animationDelay: `${i * 0.5}s` }}>
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Preview */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 32 }}>
            Tech I work with
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            {TECH_PREVIEW.map(({ emoji, name }) => (
              <div key={name} className="glass-card" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'default' }}>
                <span>{emoji}</span>
                <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 20, padding: '60px 48px', textAlign: 'center', backdropFilter: 'blur(20px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 300, height: 300, background: 'radial-gradient(circle, rgba(255,34,34,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div className="section-label" style={{ justifyContent: 'center' }}>Let's work together</div>
            <h2 className="section-title">Have a project in mind?</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.7 }}>
              I'm always open to new opportunities, collaborations, and exciting challenges.
            </p>
            <Link to="/contact" className="btn-primary">
              Get in Touch <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
