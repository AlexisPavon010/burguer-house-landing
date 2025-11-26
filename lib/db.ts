import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';
let isConnected = false;

export async function connect() {
  if (isConnected) {
    return mongoose.connection;
  }
  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('Connected to MongoDB');
    return mongoose.connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export async function disconnect() {
  if (!isConnected) {
    return;
  }
  await mongoose.disconnect();
  isConnected = false;
  console.log('Disconnected from MongoDB');
}