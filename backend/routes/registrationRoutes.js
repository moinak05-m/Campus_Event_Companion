const express = require('express');
const router = express.Router();

// Import all the registration controller logic
const {
  registerForEvent,
  getMyEvents,
  markAttendance
} = require('../controllers/registrationController');

// Import Auth Middleware
const { protect } = require('../middleware/authMiddleware');


/**
 * @route   POST /api/registration/register/:eventId
 * @desc    Register a student for an event
 * @access  Private (Student)
 */
router.post('/register/:eventId', protect, registerForEvent);

/**
 * @route   GET /api/registration/my-events
 * @desc    Get all events a student is registered for
 * @access  Private (Student)
 */
router.get('/my-events', protect, getMyEvents);

/**
 * @route   POST /api/registration/attendance/:registrationId
 * @desc    Mark a student as attended (QR scan endpoint)
 * @access  Private (Admin)
 */
router.post('/attendance/:registrationId', protect, markAttendance);

module.exports = router;
