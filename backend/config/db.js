const mongoose = require('mongoose');

/**
 * Asynchronous function to connect to the MongoDB database.
 * Relies on the MONGO_URI environment variable.
 */
const connectDB = async () => {
  try {
    // Attempt to connect to the database with robust options
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      family: 4, // Force IPv4 to avoid common DNS SRV issues with IPv6
      serverSelectionTimeoutMS: 15000, // Wait up to 15s for server selection
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    
    // Log success message with the host to verify which database we're connected to
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    // Log the exact error message if the connection fails
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    
    if (error.message.includes('IP not whitelisted') || error.message.includes('Could not connect to any servers')) {
      console.log('\n💡 TROUBLESHOOTING TIP:');
      console.log('1. Go to MongoDB Atlas: https://cloud.mongodb.com/');
      console.log('2. Navigate to "Network Access" under the "Security" tab.');
      console.log('3. Add your current IP or use "0.0.0.0/0" to allow access from everywhere (recommended for hackathons).');
    }

    // Exit the Node process with a failure code (1)
    process.exit(1);
  }
};

module.exports = connectDB;
