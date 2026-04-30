import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const SKILLS = [
  { icon: '🌐', name: 'HTML5' },
  { icon: '🎨', name: 'CSS3' },
  { icon: '🟨', name: 'JavaScript' },
  { icon: '🔷', name: 'TypeScript' },
  { icon: '🔴', name: 'Angular' },
  { icon: '⚛️', name: 'React' },
  { icon: '🟢', name: 'Node.js' },
  { icon: '🍃', name: 'MongoDB' },
  { icon: '🐬', name: 'MySQL' },
  { icon: '🔀', name: 'GitHub' },
  { icon: '💻', name: 'C++' },
  { icon: '🧩', name: 'XAMPP' },
];

const INTERESTS = [
  { emoji: '🌐', name: 'Web Dev' },
  { emoji: '🤖', name: 'AI / ML' },
  { emoji: '📷', name: 'Photography' },
  { emoji: '🎵', name: 'Music' },
  { emoji: '✈️', name: 'Travel' },
  { emoji: '🏋️', name: 'Fitness' },
  { emoji: '📚', name: 'Reading' },
  { emoji: '🌍', name: 'Open Source' },
];

const GOALS = [
  { icon: '🚀', title: 'Launch a Web Product', desc: 'Build and ship a full-stack product that solves real user pain points.' },
  { icon: '🧠', title: 'Master Backend Development', desc: 'Deepen expertise in Node.js, MongoDB, REST APIs and scalable architecture.' },
  { icon: '👥', title: 'Collaborate on Real Projects', desc: 'Work with experienced developers to build impactful, production-grade applications.' },
  { icon: '🌐', title: 'Contribute to Open Source', desc: 'Make meaningful contributions to open source projects in the JavaScript ecosystem.' },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About | Ashritha Kudumula</title>
        <meta name="description" content="Learn about Ashritha Kudumula — full-stack developer with experience in React, Angular, Node.js, MongoDB and modern web technologies." />
      </Helmet>

      <section className="section" style={{ paddingTop: 140 }}>
        <div className="container">
          <div style={{ maxWidth: 780 }}>
            <div className="section-label">About Me</div>
            <h1 className="section-title">
              Crafting Digital <span className="gradient-text">Experiences</span>
            </h1>
            <div className="about-text">
              <p>
                Hey! I'm Ashritha Kudumula, a passionate full-stack developer currently pursuing
                my Bachelor in Computer Applications at Christ (Deemed to be University), Bangalore.
                I love building products that are both functional and visually stunning.
              </p>
              <p>
                My journey into development started with curiosity — that curiosity quickly turned
                into building real projects like GlobeStay, a hotel reservation platform, and
                B-Vikas, a digital identity protocol presented at a national SDG summit.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, listening to music,
                or diving deep into whatever rabbit hole the internet has to offer that week.
              </p>
            </div>

            <Link to="/skills" className="btn-outline" style={{ marginTop: 32, display: 'inline-flex' }}>
              View My Skills &amp; Journey <FiArrowRight />
            </Link>
          </div>

          <div style={{ marginTop: 64 }}>
            <h3 style={{ marginBottom: 20, fontSize: '1rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              Tech I Love
            </h3>
            <div className="skills-flashcards">
              {SKILLS.map(({ icon, name }) => (
                <div className="skill-card" key={name}>
                  <div className="skill-icon">{icon}</div>
                  <div className="skill-name">{name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-label">Personal</div>
          <h2 className="section-title">Interests &amp; <span className="gradient-text">Hobbies</span></h2>
          <p className="section-subtitle">Life's too short to only code. Here's what keeps me inspired outside the terminal.</p>
          <div className="interests-grid">
            {INTERESTS.map(({ emoji, name }) => (
              <div className="interest-card" key={name}>
                <span className="interest-emoji">{emoji}</span>
                <div className="interest-name">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-label">Vision</div>
          <h2 className="section-title">Future <span className="gradient-text">Goals</span></h2>
          <p className="section-subtitle">Where I'm headed — the ambitions that drive me forward every day.</p>
          <div className="goals-list" style={{ maxWidth: 700 }}>
            {GOALS.map(({ icon, title, desc }) => (
              <div className="goal-item" key={title}>
                <div className="goal-icon">{icon}</div>
                <div>
                  <div className="goal-title">{title}</div>
                  <div className="goal-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
