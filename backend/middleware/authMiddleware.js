const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware to protect routes that require authentication.
 * It checks for a valid JWT in the Authorization header.
 */
const protect = async (req, res, next) => {
  let token;

  // Check if the authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 1. Extract the token from the header (Format: "Bearer eyJhbGciOi...")
      token = req.headers.authorization.split(' ')[1];

      // 2. Verify the token using our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Find the user by the ID embedded in the token payload
      // We use .select('-password') to ensure we don't attach the hashed password to the request object!
      req.user = await User.findById(decoded.userId).select('-password');

      // 4. If the token is valid and user exists, move to the next middleware or controller
      next();
    } catch (error) {
      console.error('Token verification error:', error.message);
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized, token failed or expired' 
      });
    }
  }

  // If no token was found in the header at all
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Not authorized, no token provided' 
    });
  }
};

module.exports = { protect };
