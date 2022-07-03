import mongoose from "mongoose";

global.mongo = {
  connection: null,
  promise: null,
};

export async function connectDB() {
  if (global.mongo && global.mongo.connection) {
    console.log("Using existing mongoose connection");
    return global.mongo.connection;
  } else {
    console.log("Creating new mongoose connection");
    const connectUri = process.env.MONGO_URI;
    const connectPromise = mongoose
      .connect(connectUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
      })
      .then((mongoose) => mongoose);

    global.mongo = {
      connection: await connectPromise,
      promise: connectPromise,
    };

    return await connectPromise;
  }
}
