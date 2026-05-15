require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing connection to:', process.env.MONGO_URI.replace(/:([^:@]+)@/, ':****@'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ TEST SUCCESS: Connected to MongoDB');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ TEST FAILED:', err.message);
    process.exit(1);
  });

setTimeout(() => {
  console.log('Test timed out after 10 seconds');
  process.exit(1);
}, 10000);
