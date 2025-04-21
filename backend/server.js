const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' })



const nodemailer = require("nodemailer");
const app = express(); // This line MUST be present
const User = require('./models/User');
const multer = require('multer');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Blog = require('./models/Blogs'); // Import the Blog model
const path = require('path');
const authenticateUser = require('./middleware/auth');
const { useReducedMotion } = require('framer-motion');




app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


console.log(process.env.DATABASE_URL);
// MongoDB Connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// User Route
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});


app.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Basic validation
      if (!name || !email || !password) {
        return res.status(400).json({ 
          success: false,
          message: 'Please provide name, email, and password' 
        });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User already exists with this email'
        });
      }
  
      // Create new user
      const user = new User({ name, email, password });
      user.generateActivationToken(); // Generate activation token
      await user.save();

      
      res.status(201).json({
        success: true,
        message: "User registered. Please check your email",
      });   


      const activationLink = `http://localhost:5000/activate/${user.activationToken}`;
      sendActivationEmail(user.email, activationLink);
      

  
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Error creating user',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });


const sendActivationEmail = async (email, token) => {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER, // Your email
          pass: process.env.EMAIL_PASS, // Your email password
        },
      });
  
  
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Activate Your Account",
        html: `<p>Click the link below to activate your account:</p>
               <a href="${token}">Click Here</a>`,
      });
  
      console.log(`Activation email sent to ${email}`);
    } catch (error) {
      console.error("Error sending activation email:", error);
    }
};


  
app.get("/activate/:token", async (req, res) => {
    try {
      const user = await User.findOne({ activationToken: req.params.token });
  
      if (!user) {
        return res.status(400).json({ success: false, message: "Invalid or expired token" });
      }
  
      user.isActive = true;
      user.activationToken = null; // Remove token after activation
      await user.save();
  
      // Redirect to login page after activation
      res.redirect("http://localhost:3000/signin"); // Change to your frontend URL
  
    } catch (error) {
      console.error("Activation error:", error);
      res.status(500).json({ success: false, message: "Error activating account" });
    }
  });



app.post("/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ success: false, message: "User not found" });
      }
  
      // Check if user is active
      if (!user.isActive) {
        return res.status(403).json({ success: false, message: "Inactive user" });
      }
  
      // Compare hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Incorrect password" });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email, active: user.isActive },
        process.env.SECRET_KEY, // Uses the environment variable
        { expiresIn: "7d" }
      );

          // Set the token in an HTTP-only cookie (adjust for local dev)
      res.cookie("token", token, {
      httpOnly: true, // Prevents client-side JS access to the cookie
      secure: false, // Don't use HTTPS in local development
      sameSite: "Strict", // Helps protect from CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      });
  
      res.json({ success: true, message: "Login successful", data: { userId: user._id, useremail: user.email, active: user.isActive } });
      
    } catch (error) {
      console.error("Signin error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });;
  

// Route to create a blog post
app.post('/createBlog', upload.single('image'), (req, res) => {
  const { title, content, category, author } = req.body;
  console.log("Received data:", req.body);
  // If no image path is provided, default image will be used
  const imagePath = req.file ? `/uploads/${req.file.filename}` : '/uploads/default.png';
  console.log("Image path:", req.file);

  const newBlog = new Blog({
    title,
    content,
    image: imagePath,
    category,
    author
  });

  newBlog.save()
    .then(blog => res.status(201).json(blog))
    .catch(error => res.status(400).json({ error: error.message }));
});

app.get('/myBlogs', authenticateUser, async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.userId });
    res.json({ success: true, blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}); 


// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
