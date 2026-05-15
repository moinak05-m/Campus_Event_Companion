/**
 * Campus Event Companion App - Backend Entry Point
 * This file initializes the Express server, connects to MongoDB,
 * and sets up all necessary middleware and routes.
 */

// 1. Load Environment Variables
require('dotenv').config();

// 2. Import Dependencies
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// 3. Import Custom Modules (Database & Middleware)
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');

// 4. Connect to MongoDB
connectDB();

// 5. Initialize Express App
const app = express();

// 6. Apply Global Middleware
app.use(helmet()); // Basic HTTP header security
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    // Allow any localhost port for development
    if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true
})); // Allow cross-origin requests from frontend

// Basic Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, 
  legacyHeaders: false, 
});
app.use('/api', limiter);

app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// 7. Define Routes
// A simple health check route directly in server.js for quick validation
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Server is up and running!', 
    timestamp: new Date().toISOString() 
  });
});

// Import and mount other specific routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const eventRoutes = require('./routes/eventRoutes');
app.use('/api/events', eventRoutes);

const registrationRoutes = require('./routes/registrationRoutes');
app.use('/api/registration', registrationRoutes);

// 8. Catch-All Route for 404 Errors
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'API Route Not Found' });
});

// 9. Apply Global Error Handler
// This must be the last middleware so it can catch errors from all routes
app.use(errorHandler);

// 10. Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
