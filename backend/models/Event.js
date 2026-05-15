const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add an event title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    category: {
      type: String,
      required: [true, 'Please specify an event category'],
      // You can adjust these categories based on your hackathon needs
      enum: ['Academic', 'Social', 'Sports', 'Workshop', 'Cultural', 'Other'],
      default: 'Other'
    },
    date: {
      type: Date,
      required: [true, 'Please add an event date and time']
    },
    venue: {
      type: String,
      required: [true, 'Please add the event venue or location'],
      trim: true
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/600x400?text=Campus+Event' // Placeholder for MVP
    },
    organizer: {
      type: String,
      required: [true, 'Please specify the organizing group or person']
    },
    createdBy: {
      // This creates a relationship between an Event and the User who created it
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'An event must be tied to a creator (User)']
    }
  },
  {
    timestamps: true
  }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
