const mongoose = require('mongoose');

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000;

let isConnected = false;

const connectDB = async (attempt = 1) => {
  if (!process.env.MONGO_URI) {
    console.warn('[db] MONGO_URI not set — skipping MongoDB connection. Set it in server/.env');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 8000,
    });
    isConnected = true;
    console.log('[db] MongoDB Connected');
  } catch (err) {
    isConnected = false;
    console.error(`[db] Connection attempt ${attempt} failed: ${err.message}`);

    if (attempt < MAX_RETRIES) {
      console.log(`[db] Retrying in ${RETRY_DELAY_MS / 1000}s...`);
      setTimeout(() => connectDB(attempt + 1), RETRY_DELAY_MS);
    } else {
      console.error(
        '[db] Max retries reached. Server will continue running, but DB-backed routes will fail until MongoDB is reachable. Check server/.env MONGO_URI.'
      );
    }
  }
};

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.warn('[db] MongoDB disconnected. Will attempt to reconnect.');
});

mongoose.connection.on('reconnected', () => {
  isConnected = true;
  console.log('[db] MongoDB reconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('[db] MongoDB error:', err.message);
});

const isDbConnected = () => isConnected;

module.exports = connectDB;
module.exports.isDbConnected = isDbConnected;
