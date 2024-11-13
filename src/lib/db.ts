import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://pratyushkhanalpk:LIewnbeMzKTpKigy@cluster0.bc6db.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached?.conn) {
    return cached.conn;
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => ({
      conn: mongoose,
      promise: cached!.promise
    }));
  }

  try {
    cached!.conn = (await cached?.promise)?.conn;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached?.conn;
} 