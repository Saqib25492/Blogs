const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model
const dotenv = require('dotenv');
dotenv.config();

// Middleware to verify user authentication and check if they are active
const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token; // The token stored in the HTTP-only cookie
  // console.log("Token from cookie in auth middleware:", token); // Log the token for debugging
  if (!token) {
    return res.status(401).json({ success: false, message: 'Token is missing or expired' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.userId);

    if (!user || !user.isActive) {
      return res.status(403).json({ success: false, message: 'User is not active or does not exist' });
    }

    req.user = user; // Attach user info to request for later use
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(400).json({ success: false, message: 'Invalid token' });
  }
};

module.exports = authenticateUser;
