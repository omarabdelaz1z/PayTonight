const mongoose = require("mongoose");
const { ServerError } = require("./error-handler");

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
    throw new ServerError("Failed to connect to server");
  }
}

module.exports = connect;
