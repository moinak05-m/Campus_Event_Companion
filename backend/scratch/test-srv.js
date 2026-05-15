require('dotenv').config();
const mongoose = require('mongoose');

// Try to construct an SRV URI from the components of the existing one
// Existing: mongodb://shilansasmal602_db_user:aezSiL9AtmV1iTMQ@ac-fozpoxh-shard-00-00.rg1iian.mongodb.net:27017,ac-fozpoxh-shard-00-01.rg1iian.mongodb.net:27017,ac-fozpoxh-shard-00-02.rg1iian.mongodb.net:27017/campusEventDB?ssl=true&replicaSet=atlas-py5afv-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0
// Cluster part: ac-fozpoxh

const srvUri = "mongodb+srv://shilansasmal602_db_user:aezSiL9AtmV1iTMQ@fozpoxh.rg1iian.mongodb.net/campusEventDB?retryWrites=true&w=majority";

console.log('Testing SRV connection...');

mongoose.connect(srvUri)
  .then(() => {
    console.log('✅ SRV TEST SUCCESS: Connected to MongoDB');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ SRV TEST FAILED:', err.message);
    process.exit(1);
  });

setTimeout(() => {
  console.log('SRV Test timed out after 10 seconds');
  process.exit(1);
}, 10000);
