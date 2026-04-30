import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/skills', label: 'Skills' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { isDark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <Link to="/" className="nav-logo">AK.</Link>

          <ul className="nav-links">
            {NAV_LINKS.map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={location.pathname === path ? 'active' : ''}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
              {isDark ? <FiSun /> : <FiMoon />}
            </button>
            <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile */}
      <div className={`overlay ${mobileOpen ? 'show' : ''}`} onClick={() => setMobileOpen(false)} />
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <button
          onClick={() => setMobileOpen(false)}
          style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', color: 'var(--neon-primary)', fontSize: '1.5rem', cursor: 'pointer' }}
        >
          <FiX />
        </button>
        {NAV_LINKS.map(({ path, label }) => (
          <Link key={path} to={path}>{label}</Link>
        ))}
        <button className="theme-toggle" onClick={toggle}>{isDark ? <FiSun /> : <FiMoon />}</button>
      </div>
    </>
  );
}
