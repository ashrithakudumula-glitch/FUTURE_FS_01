import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const SKILLS = [
  { icon: '⚛️', name: 'React' },
  { icon: '🟢', name: 'Node.js' },
  { icon: '🔷', name: 'TypeScript' },
  { icon: '🔥', name: 'Firebase' },
  { icon: '🎨', name: 'HTML/CSS' },
  { icon: '☁️', name: 'MySQL' },
  { icon: '🔀', name: 'GitHub' },
];

const INTERESTS = [
  { emoji: '🎮', name: 'Game Dev' },
  { emoji: '🏀', name: 'Basketball' },
  { emoji: '📷', name: 'Photography' },
  { emoji: '🎵', name: 'Dance' },
  { emoji: '✈️', name: 'Travel' },
  { emoji: '🏋️', name: 'Fitness' },
  { emoji: '📚', name: 'Reading' },
  { emoji: '🎤', name: 'Event Management Volunteer' },
];

const GOALS = [
  { icon: '🚀', title: 'Build Scalable Full-Stack Applications', desc: 'Design and develop real-world applications focusing on performance, responsiveness and seamless user experience across devices.' },
  { icon: '🧠', title: 'Advance in AI & Smart Systems', desc: 'Explore AI-powered solutions by integrating intelligent features such as automation, data-driven insights and real-time processing into applications.' },
  { icon: '🔐', title: 'Work on Secure & Decentralized Systems', desc: 'Build on my experience by working with concepts like blockchain, authentication systems and privacy-focused architectures.' },
  { icon: '🌐', title: 'Contribute to Real-World Projects', desc: 'Collaborate on impactful projects and continuously improve my skills through internships, open-source contributions and hands-on development.' },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About | Ashritha Kudumula</title>
        <meta name="description" content="Learn about Ashritha Kudumula — full-stack developer with experience in React, Node.js, Firebase and modern web technologies." />
      </Helmet>

      {/* About Hero */}
      <section className="section" style={{ paddingTop: 140 }}>
        <div className="container">
          <div style={{ maxWidth: 780 }}>
            <div className="section-label">About Me</div>
            <h1 className="section-title">
              Crafting Digital <span className="gradient-text">Experiences</span>
            </h1>
            <div className="about-text">
              <p>
                I am a first-year BCA student with a strong interest in web development and emerging technologies. 
                I started exploring development through hands-on projects, where I learned how to build responsive interfaces and integrate real-time data.
                I have gained practical experience in creating functional applications and working with modern frameworks.
              </p>
              <p>
                I am particularly interested in building full-stack web applications and exploring how AI can be integrated into real-world solutions. 
                I enjoy working on projects that combine clean UI design with practical functionality. 
                I am also curious about system design concepts like authentication, data flow and I actively learn by building and experimenting.
              </p>
              <p>
                My goal is to continuously grow as a developer by building impactful and user-focused applications. 
                I aim to strengthen my skills in full-stack development and expand into AI-driven solutions. 
                I am currently focused on improving my problem-solving skills, gaining hands-on experience and preparing myself for real-world development opportunities.
              </p>
            </div>

            {/* CTA to Skills & Journey */}
            <Link
              to="/skills"
              className="btn-outline"
              style={{ marginTop: 32, display: 'inline-flex' }}
            >
              View My Skills &amp; Journey <FiArrowRight />
            </Link>
          </div>

          {/* Skill Flashcards */}
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

      {/* Interests */}
      <section className="section">
        <div className="container">
          <div className="section-label">Personal</div>
          <h2 className="section-title">Interests &amp; <span className="gradient-text">Hobbies</span></h2>
          <p className="section-subtitle">
            Life's too short to only code. Here's what keeps me inspired outside the terminal.
          </p>
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

      {/* Goals */}
      <section className="section">
        <div className="container">
          <div className="section-label">Vision</div>
          <h2 className="section-title">Future <span className="gradient-text">Goals</span></h2>
          <p className="section-subtitle">
            Where I'm headed — the ambitions that drive me forward every day.
          </p>
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
