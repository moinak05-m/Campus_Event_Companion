const Event = require('../models/Event');

/**
 * @desc    Get all events
 * @route   GET /api/events
 * @access  Public
 */
const getAllEvents = async (req, res, next) => {
  try {
    // Fetch all events and populate the createdBy field with the user's name and email
    const events = await Event.find().populate('createdBy', 'name email');
    
    res.status(200).json({ 
      success: true, 
      count: events.length, 
      data: events 
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single event by ID
 * @route   GET /api/events/:id
 * @access  Public
 */
const getSingleEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'name email');
    
    // If the ID format is correct but no event exists in the database
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.status(200).json({ success: true, data: event });
  } catch (error) {
    // This catches errors like malformed MongoDB IDs
    next(error);
  }
};

/**
 * @desc    Create a new event
 * @route   POST /api/events
 * @access  Private (Requires Token)
 */
const createEvent = async (req, res, next) => {
  try {
    // Automatically assign the logged-in user as the creator
    req.body.createdBy = req.user._id;
    
    const event = await Event.create(req.body);
    
    res.status(201).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an event
 * @route   PUT /api/events/:id
 * @access  Private (Requires Token)
 */
const updateEvent = async (req, res, next) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Update the event
    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Returns the newly updated document instead of the old one
      runValidators: true // Ensures Mongoose schema validations still run on update
    });

    res.status(200).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete an event
 * @route   DELETE /api/events/:id
 * @access  Private (Requires Token)
 */
const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Use deleteOne() instead of remove() as remove() is deprecated in newer Mongoose versions
    await event.deleteOne();

    res.status(200).json({ 
      success: true, 
      message: 'Event deleted successfully',
      data: {} 
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEvents,
  getSingleEvent,
  createEvent,
  updateEvent,
  deleteEvent
};
