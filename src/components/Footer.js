import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <Link to="/" className="nav-logo" style={{ fontSize: '1.5rem' }}>AJ.</Link>
          <p className="footer-copy" style={{ marginTop: 8 }}>
            &copy; {new Date().getFullYear()} Ashritha Kudumula. Built with React &amp; MongoDB.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { icon: <FiGithub />, href: 'https://github.com', label: 'GitHub' },
            { icon: <FiLinkedin />, href: 'https://linkedin.com', label: 'LinkedIn' },
            { icon: <FiTwitter />, href: 'https://twitter.com', label: 'Twitter' },
            { icon: <FiMail />, href: 'mailto:alex@example.com', label: 'Email' },
          ].map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label={label}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
