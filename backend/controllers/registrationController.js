const Registration = require('../models/Registration');
const Event = require('../models/Event');
const QRCode = require('qrcode');

/**
 * @desc    Register a student for an event and generate QR code
 * @route   POST /api/registration/register/:eventId
 * @access  Private (Student)
 */
const registerForEvent = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user._id;

    // 1. Validate that the event actually exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // 2. Prevent Duplicate Registration
    const existingRegistration = await Registration.findOne({ eventId, userId });
    if (existingRegistration) {
      return res.status(400).json({ success: false, message: 'You are already registered for this event!' });
    }

    // 3. Create a new registration instance (not saved yet) to get the _id
    const registration = new Registration({
      userId,
      eventId
    });

    // 4. Prepare data for the QR Code - now including the unique registrationId!
    const qrPayload = JSON.stringify({
      registrationId: registration._id,
      userId,
      eventId
    });

    // 5. Generate the QR Code as a base64 Image string
    const qrCodeImage = await QRCode.toDataURL(qrPayload);
    
    // 6. Assign QR code and save
    registration.qrCode = qrCodeImage;
    await registration.save();

    // 7. Return success response
    res.status(201).json({
      success: true,
      message: 'Successfully registered for the event!',
      data: registration
    });

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all registered events for a student
 * @route   GET /api/registration/my-events
 * @access  Private (Student)
 */
const getMyEvents = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const registrations = await Registration.find({ userId })
      .populate({
        path: 'eventId',
        select: 'title date venue image category'
      })
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Mark a student as attended (QR Verification)
 * @route   POST /api/registration/attendance/:registrationId
 * @access  Private (Admin)
 */
const markAttendance = async (req, res, next) => {
  try {
    const { registrationId } = req.params;

    // 1. Find the registration record
    const registration = await Registration.findById(registrationId).populate('userId', 'name email');

    if (!registration) {
      return res.status(404).json({ success: false, message: 'Invalid ticket: Registration not found' });
    }

    // 2. Check if they already checked in
    if (registration.attended) {
      return res.status(400).json({ 
        success: false, 
        message: `${registration.userId.name} has already been marked as attended!` 
      });
    }

    // 3. Mark as attended and save
    registration.attended = true;
    await registration.save();

    res.status(200).json({
      success: true,
      message: `Check-in successful! Welcome, ${registration.userId.name}.`,
      data: registration
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerForEvent,
  getMyEvents,
  markAttendance
};
