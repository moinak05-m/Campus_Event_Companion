const express = require('express');
const router = express.Router();

// Import all the controller logic we just created
const {
  getAllEvents,
  getSingleEvent,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');

// Import Auth Middleware
const { protect } = require('../middleware/authMiddleware');


/**
 * Route structuring in Express can be made incredibly clean using router.route()
 * This allows us to chain different HTTP methods (GET, POST) to the exact same URL path.
 */

// @route   /api/events
router.route('/')
  .get(getAllEvents)    // Public: Get all events
  .post(protect, createEvent);   // Private: Create a new event

// @route   /api/events/:id
router.route('/:id')
  .get(getSingleEvent)  // Public: Get a single event details
  .put(protect, updateEvent)     // Private: Update an event
  .delete(protect, deleteEvent); // Private: Delete an event

module.exports = router;
