// Load environment variables
require('dotenv').config({ path: './.env' });

// Core packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Models & Middleware
const User = require('./models/User');
const verifyUser = require('./middleware/authenticateUser');

// App setup
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// MongoDB connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Basic test route
app.get('/', (req, res) => {
  res.send('Backend is running...');
});

// User registration
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  const user = new User({ name, email, password });
  user.generateActivationToken();
  await user.save();

  const activationLink = `http://localhost:5000/activate/${user.activationToken}`;
  await sendActivationEmail(user.email, activationLink);

  res.status(201).json({ success: true, message: 'User registered. Check email for activation.' });
});

// Send activation email
const sendActivationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Activate Your Account',
    html: `<p>Click to activate:</p><a href="${token}">Activate</a>`,
  });

  console.log(`Activation email sent to ${email}`);
};

// Account activation
app.get('/activate/:token', async (req, res) => {
  const user = await User.findOne({ activationToken: req.params.token });
  if (!user) return res.status(400).json({ success: false, message: 'Invalid or expired token' });

  user.isActive = true;
  user.activationToken = null;
  await user.save();

  res.redirect('http://localhost:3000/signin');
});

// Sign in
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ success: false, message: 'User not found' });
  if (!user.isActive) return res.status(403).json({ success: false, message: 'Inactive user' });
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(400).json({ success: false, message: 'Incorrect password' });

  const token = jwt.sign({ userId: user._id, email: user.email, active: user.isActive }, process.env.SECRET_KEY, { expiresIn: '7d' });

  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ success: true, message: 'Login successful', data: { userId: user._id, useremail: user.email, active: user.isActive } });
});

// Logout
app.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });
  res.json({ message: 'Logged out successfully' });
});

// Verify user from token
app.get('/verifyUser', verifyUser, (req, res) => {
  const user = req.user;
  res.json({
    success: true,
    message: 'User is verified',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isActive: user.isActive,
    },
  });
});

const blogRoutes = require('./routes/blog');
app.use('/blogs', blogRoutes);


// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
