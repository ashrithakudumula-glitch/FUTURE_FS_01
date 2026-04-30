import React, { useState, useEffect, useCallback } from 'react';
import {
  FiMail, FiTrash2, FiCheck, FiLogOut, FiPlus,
  FiEdit3, FiSave, FiX, FiEye, FiEyeOff,
  FiMessageSquare, FiFolder, FiActivity
} from 'react-icons/fi';
import {
  loginAdmin, logoutAdmin, isLoggedIn,
  getContactMessages, markMessageRead, deleteMessage,
  getProjects, addProject, updateProject, deleteProject,
} from '../api/services';

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await loginAdmin(email, password);
      onLogin();
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
      <div style={{ width: '100%', maxWidth: 420, padding: '48px 40px', background: 'var(--bg-card)', backdropFilter: 'blur(20px)', border: '1px solid var(--glass-border)', borderRadius: 20 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--neon-primary)', textShadow: '0 0 20px var(--neon-primary)', marginBottom: 8 }}>AK. Admin</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Portfolio Dashboard</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@example.com" required />
          </div>
          <div className="form-group" style={{ position: 'relative' }}>
            <label>Password</label>
            <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required style={{ paddingRight: 48 }} />
            <button type="button" onClick={() => setShowPw(p => !p)} style={{ position: 'absolute', right: 14, top: 38, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
              {showPw ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {error && (
            <div style={{ padding: '12px 16px', background: 'rgba(255,34,34,0.1)', border: '1px solid rgba(255,34,34,0.3)', borderRadius: 8, fontSize: '0.85rem', color: 'var(--neon-primary)', marginBottom: 20 }}>
              {error}
            </div>
          )}
          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value }) {
  return (
    <div style={{ padding: '24px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 16, backdropFilter: 'blur(20px)' }}>
      <div style={{ width: 44, height: 44, borderRadius: 10, marginBottom: 16, background: 'rgba(255,34,34,0.1)', border: '1px solid rgba(255,34,34,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: 'var(--neon-primary)' }}>
        {icon}
      </div>
      <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--neon-primary)', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
    </div>
  );
}

// ─── MESSAGES TAB ─────────────────────────────────────────────────────────────
function MessagesTab() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getContactMessages();
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  const handleRead = async (id) => {
    await markMessageRead(id);
    setMessages(prev => prev.map(m => m._id === id ? { ...m, read: true } : m));
    if (selected?._id === id) setSelected(prev => ({ ...prev, read: true }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    await deleteMessage(id);
    setMessages(prev => prev.filter(m => m._id !== id));
    if (selected?._id === id) setSelected(null);
  };

  const unread = messages.filter(m => !m.read).length;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 24, height: '70vh' }}>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 700 }}>Messages</span>
          {unread > 0 && <span style={{ background: 'var(--neon-primary)', color: '#fff', fontSize: '0.75rem', fontWeight: 700, borderRadius: 100, padding: '2px 8px' }}>{unread} new</span>}
        </div>
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {loading ? (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>
          ) : messages.length === 0 ? (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>No messages yet</div>
          ) : messages.map(m => (
            <div key={m._id} onClick={() => { setSelected(m); if (!m.read) handleRead(m._id); }}
              style={{ padding: '16px 20px', borderBottom: '1px solid var(--glass-border)', cursor: 'pointer', background: selected?._id === m._id ? 'var(--glass-hover)' : !m.read ? 'rgba(255,34,34,0.04)' : 'transparent', borderLeft: !m.read ? '3px solid var(--neon-primary)' : '3px solid transparent' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontWeight: m.read ? 400 : 700, fontSize: '0.95rem' }}>{m.name}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(m.createdAt).toLocaleDateString()}</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{m.subject}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 16, padding: selected ? 28 : 0, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {!selected ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
            <div style={{ textAlign: 'center' }}>
              <FiMail style={{ fontSize: '3rem', marginBottom: 12, opacity: 0.3 }} />
              <p>Select a message to read</p>
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 4 }}>{selected.subject}</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  From <strong style={{ color: 'var(--text-secondary)' }}>{selected.name}</strong> · <a href={`mailto:${selected.email}`} style={{ color: 'var(--neon-primary)' }}>{selected.email}</a>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>{new Date(selected.createdAt).toLocaleString()}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {!selected.read && (
                  <button onClick={() => handleRead(selected._id)} style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 8, padding: '8px', cursor: 'pointer', color: '#22c55e' }}><FiCheck /></button>
                )}
                <button onClick={() => handleDelete(selected._id)} style={{ background: 'rgba(255,34,34,0.1)', border: '1px solid rgba(255,34,34,0.3)', borderRadius: 8, padding: '8px', cursor: 'pointer', color: 'var(--neon-primary)' }}><FiTrash2 /></button>
              </div>
            </div>
            <div style={{ padding: 20, background: 'var(--bg-secondary)', borderRadius: 12, fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.8, whiteSpace: 'pre-wrap', flex: 1 }}>
              {selected.message}
            </div>
            <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="btn-primary" style={{ marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 8, width: 'fit-content' }}>
              <FiMail /> Reply
            </a>
          </>
        )}
      </div>
    </div>
  );
}

// ─── PROJECTS TAB ─────────────────────────────────────────────────────────────
function ProjectsTab() {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const emptyProject = { title: '', description: '', category: 'Full-Stack', emoji: '💻', tags: '', github: '', live: '' };

  const fetchProjects = useCallback(async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const save = async () => {
    const data = {
      ...editing,
      tags: typeof editing.tags === 'string' ? editing.tags.split(',').map(t => t.trim()).filter(Boolean) : editing.tags,
    };
    try {
      if (isNew) {
        const { _id, ...rest } = data;
        await addProject(rest);
      } else {
        await updateProject(editing._id, data);
      }
      setEditing(null); setIsNew(false);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    await deleteProject(id);
    fetchProjects();
  };

  if (editing) {
    return (
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 16, padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }}>
          <h3 style={{ fontWeight: 700, fontSize: '1.2rem' }}>{isNew ? 'Add New Project' : 'Edit Project'}</h3>
          <button onClick={() => { setEditing(null); setIsNew(false); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '1.2rem' }}><FiX /></button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            { key: 'title', label: 'Title', placeholder: 'Project name' },
            { key: 'emoji', label: 'Emoji', placeholder: '💻' },
            { key: 'category', label: 'Category', placeholder: 'Full-Stack' },
            { key: 'tags', label: 'Tags (comma-separated)', placeholder: 'React, Node.js' },
            { key: 'github', label: 'GitHub URL', placeholder: 'https://github.com/...' },
            { key: 'live', label: 'Live URL', placeholder: 'https://...' },
          ].map(({ key, label, placeholder }) => (
            <div className="form-group" key={key}>
              <label>{label}</label>
              <input value={typeof editing[key] === 'object' ? editing[key]?.join(', ') : editing[key] || ''} onChange={e => setEditing(prev => ({ ...prev, [key]: e.target.value }))} placeholder={placeholder} />
            </div>
          ))}
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea value={editing.description || ''} onChange={e => setEditing(prev => ({ ...prev, description: e.target.value }))} placeholder="Project description..." style={{ minHeight: 100 }} />
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button className="btn-primary" onClick={save}><FiSave /> Save Project</button>
          <button className="btn-outline" onClick={() => { setEditing(null); setIsNew(false); }}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <button className="btn-primary" onClick={() => { setEditing(emptyProject); setIsNew(true); }}><FiPlus /> Add Project</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {projects.map(p => (
          <div key={p._id} style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: 16, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: '2rem' }}>{p.emoji || '💻'}</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setEditing({ ...p, tags: Array.isArray(p.tags) ? p.tags.join(', ') : p.tags })} style={{ background: 'rgba(255,34,34,0.1)', border: '1px solid rgba(255,34,34,0.2)', borderRadius: 8, padding: '6px 8px', cursor: 'pointer', color: 'var(--neon-primary)' }}><FiEdit3 /></button>
                <button onClick={() => handleDelete(p._id)} style={{ background: 'rgba(255,34,34,0.1)', border: '1px solid rgba(255,34,34,0.2)', borderRadius: 8, padding: '6px 8px', cursor: 'pointer', color: 'var(--neon-primary)' }}><FiTrash2 /></button>
              </div>
            </div>
            <h3 style={{ fontWeight: 700, marginBottom: 6 }}>{p.title}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 12 }}>{p.description?.slice(0, 100)}...</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {(Array.isArray(p.tags) ? p.tags : []).slice(0, 3).map(tag => <span key={tag} className="project-tag">{tag}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN ADMIN ───────────────────────────────────────────────────────────────
export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [activeTab, setActiveTab] = useState('messages');
  const [stats, setStats] = useState({ messages: 0, unread: 0, projects: 0 });

  useEffect(() => {
    if (!loggedIn) return;
    const fetchStats = async () => {
      try {
        const [msgs, projs] = await Promise.all([getContactMessages(), getProjects()]);
        setStats({ messages: msgs.length, unread: msgs.filter(m => !m.read).length, projects: projs.length });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, [loggedIn]);

  const handleLogout = () => {
    logoutAdmin();
    setLoggedIn(false);
  };

  if (!loggedIn) return <LoginForm onLogin={() => setLoggedIn(true)} />;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: 80 }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(8,8,8,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--glass-border)', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--neon-primary)', textShadow: '0 0 15px var(--neon-primary)' }}>AK. Admin</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', padding: '4px 10px', background: 'rgba(255,34,34,0.1)', border: '1px solid rgba(255,34,34,0.2)', borderRadius: 100 }}>Dashboard</span>
        </div>
        <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'rgba(255,34,34,0.1)', border: '1px solid rgba(255,34,34,0.2)', borderRadius: 8, cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>
          <FiLogOut /> Sign Out
        </button>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20, marginBottom: 40 }}>
          <StatCard icon={<FiMessageSquare />} label="Total Messages" value={stats.messages} />
          <StatCard icon={<FiMail />} label="Unread" value={stats.unread} />
          <StatCard icon={<FiFolder />} label="Projects" value={stats.projects} />
          <StatCard icon={<FiActivity />} label="Status" value="Live" />
        </div>

        <div style={{ display: 'flex', gap: 4, background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: 4, width: 'fit-content', marginBottom: 32 }}>
          {[
            { id: 'messages', label: 'Messages', icon: <FiMail /> },
            { id: 'projects', label: 'Projects', icon: <FiFolder /> },
          ].map(({ id, label, icon }) => (
            <button key={id} className={`resume-tab ${activeTab === id ? 'active' : ''}`} onClick={() => setActiveTab(id)}>
              {icon} {label}
              {id === 'messages' && stats.unread > 0 && (
                <span style={{ marginLeft: 6, background: '#fff', color: 'var(--neon-dark)', borderRadius: 100, fontSize: '0.7rem', fontWeight: 700, padding: '1px 6px' }}>{stats.unread}</span>
              )}
            </button>
          ))}
        </div>

        {activeTab === 'messages' && <MessagesTab />}
        {activeTab === 'projects' && <ProjectsTab />}
      </div>
    </div>
  );
}
