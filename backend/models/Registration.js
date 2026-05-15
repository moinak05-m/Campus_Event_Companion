const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A registration must be tied to a User']
    },
    eventId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Event',
      required: [true, 'A registration must be tied to an Event']
    },
    qrCode: {
      type: String,
      // This will store either the raw text encoded in the QR or a base64 image string
      required: [true, 'A QR code must be generated for this registration']
    },
    attended: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Prevent a user from registering for the exact same event more than once!
registrationSchema.index({ userId: 1, eventId: 1 }, { unique: true });

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
