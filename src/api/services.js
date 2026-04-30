// ─── API BASE URL ─────────────────────────────────────────────────────────────
const API = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const getToken = () => localStorage.getItem('admin_token');

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

// ─── CONTACT MESSAGES ─────────────────────────────────────────────────────────

export const sendContactMessage = async (data) => {
  const res = await fetch(`${API}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to send message');
  return res.json();
};

export const getContactMessages = async () => {
  const res = await fetch(`${API}/messages`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to fetch messages');
  return res.json();
};

export const markMessageRead = async (id) => {
  const res = await fetch(`${API}/messages/${id}/read`, {
    method: 'PATCH',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to mark message read');
  return res.json();
};

export const deleteMessage = async (id) => {
  const res = await fetch(`${API}/messages/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete message');
  return res.json();
};

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

export const getProjects = async () => {
  const res = await fetch(`${API}/projects`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
};

export const getProject = async (id) => {
  const res = await fetch(`${API}/projects/${id}`);
  if (!res.ok) throw new Error('Failed to fetch project');
  return res.json();
};

export const addProject = async (data) => {
  const res = await fetch(`${API}/projects`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to add project');
  return res.json();
};

export const updateProject = async (id, data) => {
  const res = await fetch(`${API}/projects/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update project');
  return res.json();
};

export const deleteProject = async (id) => {
  const res = await fetch(`${API}/projects/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete project');
  return res.json();
};

// ─── PROJECT UPDATES ──────────────────────────────────────────────────────────

export const addProjectUpdate = async (projectId, message) => {
  const res = await fetch(`${API}/projects/${projectId}/updates`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error('Failed to add update');
  return res.json();
};

export const getProjectUpdates = async (projectId) => {
  const res = await fetch(`${API}/projects/${projectId}/updates`);
  if (!res.ok) throw new Error('Failed to fetch updates');
  return res.json();
};

// ─── AUTH ─────────────────────────────────────────────────────────────────────

export const loginAdmin = async (email, password) => {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Invalid credentials');
  const data = await res.json();
  localStorage.setItem('admin_token', data.token);
  return data;
};

export const logoutAdmin = () => {
  localStorage.removeItem('admin_token');
};

export const isLoggedIn = () => !!localStorage.getItem('admin_token');
