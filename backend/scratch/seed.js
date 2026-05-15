require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Event = require('../models/Event');
const User = require('../models/User');
const connectDB = require('../config/db');

const seedEvents = async () => {
  try {
    await connectDB();
    
    // Check if events exist
    const count = await Event.countDocuments();
    if (count > 0) {
      console.log(`Database already has ${count} events. Skipping seed.`);
      process.exit(0);
    }

    // Create a dummy user first
    let adminUser = await User.findOne({ email: 'admin@campus.edu' });
    if (!adminUser) {
      adminUser = await User.create({
        name: 'Campus Admin',
        email: 'admin@campus.edu',
        password: 'password123',
        role: 'admin'
      });
    }

    const events = [
      {
        title: "Global AI Hackathon 2026",
        description: "Join the largest AI hackathon in the world. Build the future with Generative AI and ML models.",
        category: "Academic",
        date: new Date("2026-05-24T10:00:00Z"),
        venue: "Main Auditorium",
        organizer: "Computer Science Dept",
        createdBy: adminUser._id
      },
      {
        title: "Neon Beats Music Fest",
        description: "The ultimate cultural fest of the year. Featuring top artists and neon-themed EDM night.",
        category: "Cultural",
        date: new Date("2026-05-28T18:00:00Z"),
        venue: "Campus Grounds",
        organizer: "Student Council",
        createdBy: adminUser._id
      },
      {
        title: "Future of Web Workshops",
        description: "Deep dive into React 19, Server Components, and the future of web development.",
        category: "Workshop",
        date: new Date("2026-06-02T14:00:00Z"),
        venue: "IT Block Room 402",
        organizer: "Web Dev Club",
        createdBy: adminUser._id
      },
      {
        title: "Robo-Race Challenge",
        description: "Build, code, and race your autonomous robots against the best teams on campus.",
        category: "Academic",
        date: new Date("2026-06-18T09:00:00Z"),
        venue: "Robotics Lab",
        organizer: "Robotics Society",
        createdBy: adminUser._id
      }
    ];

    await Event.insertMany(events);
    console.log("Successfully seeded database with beautiful mock events!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedEvents();
