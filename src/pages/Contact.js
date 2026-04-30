import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiMail, FiMapPin, FiPhone, FiSend, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { sendContactMessage } from '../api/services';

const CONTACT_INFO = [
  { icon: <FiMail />, label: 'Email', value: 'ashrithakudumula@gmail.com' },
  { icon: <FiMapPin />, label: 'Location', value: 'Bangalore, India' },
];

const SOCIALS = [
  { icon: <FiGithub />, href: 'https://github.com/ashrithakudumula-glitch', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'http://www.linkedin.com/in/ashritha-kudumula-885bb73b4', label: 'LinkedIn' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('loading');
    try {
      await sendContactMessage(form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact | Ashritha Kudumula</title>
        <meta name="description" content="Get in touch with Ashritha Kudumula — full-stack developer available for internships, projects, and collaborations." />
      </Helmet>

      <section className="section" style={{ paddingTop: 140 }}>
        <div className="container">
          <div className="section-label">Say Hello</div>
          <h1 className="section-title">
            Let's <span className="gradient-text">Connect</span>
          </h1>
          <p className="section-subtitle">
            Have a project you'd like to work on together? Want to collaborate?
            I'd love to hear from you.
          </p>

          <div className="contact-grid">
            {/* Left: Info */}
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 8 }}>Get in touch</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 32 }}>
                I'm currently open to internship opportunities and exciting projects.
                Response time is usually within 24 hours.
              </p>

              <div className="contact-info-list">
                {CONTACT_INFO.map(({ icon, label, value }) => (
                  <div key={label} className="contact-info-item">
                    <div className="contact-icon">{icon}</div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>{label}</div>
                      <span>{value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="social-links">
                {SOCIALS.map(({ icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-link" aria-label={label}>
                    {icon}
                  </a>
                ))}
              </div>

              {/* Availability badge */}
              <div style={{ marginTop: 40, padding: '20px', background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ width: 10, height: 10, background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 8px #22c55e', display: 'inline-block', animation: 'blink 1.5s ease infinite' }} />
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Open to Opportunities</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Currently looking for internships and freelance projects.
                  Let's build something amazing together!
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="contact-form">
              {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <div style={{ fontSize: '4rem', marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 12 }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>Thanks for reaching out! I'll get back to you within 24 hours.</p>
                  <button className="btn-outline" style={{ marginTop: 24 }} onClick={() => setStatus('idle')}>Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 28 }}>Send a Message</h3>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Name *</label>
                      <input id="name" name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input id="email" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input id="subject" name="subject" type="text" placeholder="What's this about?" value={form.subject} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea id="message" name="message" placeholder="Tell me about your project or just say hi..." value={form.message} onChange={handleChange} required />
                  </div>

                  {status === 'error' && (
                    <div style={{ padding: '12px 16px', background: 'rgba(255,34,34,0.1)', border: '1px solid rgba(255,34,34,0.3)', borderRadius: 8, fontSize: '0.9rem', color: 'var(--neon-primary)', marginBottom: 20 }}>
                      Something went wrong. Please try again or email directly.
                    </div>
                  )}

                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={status === 'loading'}>
                    {status === 'loading' ? 'Sending...' : <><FiSend /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
