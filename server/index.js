const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// ─── MONGODB CONNECTION ───────────────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ─── MODELS ───────────────────────────────────────────────────────────────────

// Message Model
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true },
  subject: { type: String, default: '(No subject)' },
  message: { type: String, required: true, maxlength: 5000 },
  read: { type: Boolean, default: false },
  ip: String,
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

// Project Model
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  category: { type: String, default: 'Full-Stack' },
  emoji: { type: String, default: '💻' },
  github: String,
  live: String,
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

// Project Update Model
const projectUpdateSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  message: { type: String, required: true },
}, { timestamps: true });

const ProjectUpdate = mongoose.model('ProjectUpdate', projectUpdateSchema);

// Admin Model
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);

// ─── MIDDLEWARE ───────────────────────────────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: 'Too many contact form submissions. Please wait.' },
});

app.use('/api', limiter);

// ─── EMAIL TRANSPORT ──────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ─── AUTH MIDDLEWARE ──────────────────────────────────────────────────────────
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized.' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

// ─── ROUTES ───────────────────────────────────────────────────────────────────

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── ADMIN AUTH ────────────────────────────────────────────────────────────────

// POST /api/auth/register — create admin (run once)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, secret } = req.body;
    if (secret !== process.env.ADMIN_SECRET) {
      return res.status(403).json({ error: 'Invalid secret.' });
    }
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Admin already exists.' });
    const hashed = await bcrypt.hash(password, 12);
    await Admin.create({ email, password: hashed });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create admin.' });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ error: 'Invalid credentials.' });
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials.' });
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed.' });
  }
});

// ── CONTACT ───────────────────────────────────────────────────────────────────

// POST /api/contact
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are required.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    const msg = await Message.create({
      name, email,
      subject: subject || '(No subject)',
      message,
      ip: req.ip,
    });

    // Notify owner
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.OWNER_EMAIL || process.env.EMAIL_USER,
      subject: `📬 New message from ${name}: ${subject || 'Portfolio Contact'}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0f0f0f;color:#f5f5f5;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#cc0000,#ff2222);padding:32px;text-align:center;">
            <h1 style="margin:0;color:#fff;">New Portfolio Message</h1>
          </div>
          <div style="padding:32px;">
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color:#ff4444;">${email}</a></p>
            <p><strong>Subject:</strong> ${subject || '(No subject)'}</p>
            <div style="margin-top:16px;padding:16px;background:#1a1a1a;border-radius:8px;border-left:3px solid #ff2222;">
              <p style="white-space:pre-wrap;">${message}</p>
            </div>
            <a href="mailto:${email}" style="display:inline-block;margin-top:20px;background:#ff2222;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;">Reply to ${name}</a>
          </div>
        </div>
      `,
    });

    // Auto reply
    await transporter.sendMail({
      from: `"Ashritha Kudumula" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Got your message, ${name}! 👋`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0f0f0f;color:#f5f5f5;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#cc0000,#ff2222);padding:32px;text-align:center;">
            <h1 style="margin:0;color:#fff;">Thanks for reaching out!</h1>
          </div>
          <div style="padding:32px;line-height:1.8;">
            <p>Hey ${name},</p>
            <p>I've received your message and will get back to you within <strong style="color:#ff4444;">24 hours</strong>.</p>
            <p>Best,<br/><strong>Ashritha Kudumula</strong></p>
          </div>
        </div>
      `,
    });

    res.json({ success: true, id: msg._id });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

// GET /api/messages
app.get('/api/messages', verifyAdmin, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
});

// PATCH /api/messages/:id/read
app.patch('/api/messages/:id/read', verifyAdmin, async (req, res) => {
  try {
    await Message.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update message.' });
  }
});

// DELETE /api/messages/:id
app.delete('/api/messages/:id', verifyAdmin, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete message.' });
  }
});

// ── PROJECTS ──────────────────────────────────────────────────────────────────

// GET /api/projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects.' });
  }
});

// GET /api/projects/:id
app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found.' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch project.' });
  }
});

// POST /api/projects
app.post('/api/projects', verifyAdmin, async (req, res) => {
  try {
    const { title, description, tags, category, emoji, github, live } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description required.' });
    }
    const project = await Project.create({
      title, description,
      tags: tags || [],
      category: category || 'Full-Stack',
      emoji: emoji || '💻',
      github: github || '',
      live: live || '',
    });
    res.json({ success: true, id: project._id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create project.' });
  }
});

// PUT /api/projects/:id
app.put('/api/projects/:id', verifyAdmin, async (req, res) => {
  try {
    await Project.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update project.' });
  }
});

// DELETE /api/projects/:id
app.delete('/api/projects/:id', verifyAdmin, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project.' });
  }
});

// ── PROJECT UPDATES ───────────────────────────────────────────────────────────

// POST /api/projects/:id/updates
app.post('/api/projects/:id/updates', verifyAdmin, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message required.' });
    await ProjectUpdate.create({ projectId: req.params.id, message });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add update.' });
  }
});

// GET /api/projects/:id/updates
app.get('/api/projects/:id/updates', async (req, res) => {
  try {
    const updates = await ProjectUpdate.find({ projectId: req.params.id }).sort({ createdAt: -1 });
    res.json(updates);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch updates.' });
  }
});

// ─── 404 & ERROR ──────────────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ error: 'Route not found.' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}\n`);
});

module.exports = app;
