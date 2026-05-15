const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Utility function to generate a JSON Web Token
 * The token payload includes the userId and role as requested.
 */
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token remains valid for 30 days
  });
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/signup
 * @access  Public
 */
const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
    }

    // 2. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // 3. Hash the password before saving
    // genSalt(10) determines how secure the hash is (10 is the standard sweet spot)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create the new user in the database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'student', // Fallback to student if no role is provided
    });

    // 5. Generate JWT token
    const token = generateToken(user._id, user.role);

    // 6. Return success response (excluding password)
    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    // Pass errors to our centralized error handler
    next(error);
  }
};

/**
 * @desc    Authenticate user & get token (Login)
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Validate that email & password were provided
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide an email and password' });
    }

    // 2. Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      // It's a best practice to return generic "Invalid credentials" 
      // rather than "User not found" to prevent email enumeration attacks
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // 3. Compare the provided password with the hashed password in the DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // 4. Generate JWT token
    const token = generateToken(user._id, user.role);

    // 5. Return success response (excluding password)
    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    // Pass errors to our centralized error handler
    next(error);
  }
};

module.exports = {
  signup,
  login,
};
