import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import { CustomCursor, ScrollProgress } from './components/Effects';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import SkillsJourney from './pages/SkillsJourney';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import './styles/global.css';

function Loader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="loader">
      <div className="loader-logo">AK.</div>
      <div className="loader-bar">
        <div className="loader-fill" />
      </div>
      <p style={{
        marginTop: 20,
        fontSize: '0.8rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-heading)',
      }}>
        Initializing...
      </p>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function AppInner() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdmin && (
        <>
          <div className="bg-grid" />
          <ParticleBackground />
          <div className="scan-lines" />
        </>
      )}
      <ScrollProgress />
      <CustomCursor />
      <div className="page-wrapper">
        {!isAdmin && <Navbar />}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<SkillsJourney />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        {!isAdmin && <Footer />}
      </div>
    </>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          {!loaded && <Loader onDone={() => setLoaded(true)} />}
          <AppInner />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}
