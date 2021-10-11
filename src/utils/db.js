const mongoose = require("mongoose");

let cachedClient = null;

async function connect() {
  if (cachedClient) return cachedClient;

  try {
    const client = await mongoose.connect(process.env.DB_PATH, {
      autoIndex: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    cachedClient = client;
    return cachedClient;
  } catch (error) {
    throw error;
  }
}

module.exports = connect;
