import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <Link to="/" className="nav-logo" style={{ fontSize: '1.5rem' }}>AK.</Link>
          <p className="footer-copy" style={{ marginTop: 8 }}>
            &copy; {new Date().getFullYear()} Ashritha Kudumula. Built with React & Firebase.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { icon: <FiGithub />, href: 'https://github.com/ashrithakudumula-glitch', label: 'GitHub' },
            { icon: <FiLinkedin />, href: 'http://www.linkedin.com/in/ashritha-kudumula-885bb73b4', label: 'LinkedIn' },
            { icon: <FiMail />, href: 'mailto:ashrithakudumula@gmail.com', label: 'Email' },
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
