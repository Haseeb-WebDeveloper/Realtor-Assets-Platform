import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

// Validate MongoDB URI format
if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
  throw new Error('Invalid MongoDB URI format. URI must start with "mongodb://" or "mongodb+srv://"');
}

const options = {
  bufferCommands: true,
  autoIndex: true,
  autoCreate: true,
};

interface GlobalWithMongoose {
  mongoose: {
    conn: null | typeof mongoose;
    promise: null | Promise<typeof mongoose>;
  };
}

// Add mongoose to the global type
declare const global: GlobalWithMongoose;

// Initialize global mongoose connection state
if (!global.mongoose) {
  global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectToDatabase() {
  try {
    if (global.mongoose.conn) {
      // Use existing database connection
      console.log('Using existing connection');
      return global.mongoose.conn;
    }

    if (!global.mongoose.promise) {
      // Create new connection
      console.log('Creating new connection');
      global.mongoose.promise = mongoose.connect(uri, options);
    }

    try {
      global.mongoose.conn = await global.mongoose.promise;
      
      // Log successful connection
      console.log('MongoDB connected successfully');
    } catch (e) {
      global.mongoose.promise = null;
      throw e;
    }

    return global.mongoose.conn;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export default connectToDatabase;