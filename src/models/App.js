const mongoose = require("mongoose");
const connect = require("../utils/db");

const appSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },

  APP_KEY: {
    type: String,
    required: true,
  },
});

const App = mongoose.model("App", appSchema);

/** Creates a new app if it doesn't exist. Otherwise, updates it  */
const createApp = async (filter, update) => {
  await connect();
  return App.findOneAndUpdate(filter, update, { new: true, upsert: true });
};

const findAppById = async (id) => {
  await connect();
  return App.findById(id, "-__v");
};

module.exports = { createApp, findAppById };
