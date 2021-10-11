const mongoose = require("mongoose");

// TODO: defeine Transaction schema
const transactionSchema = new mongoose.Schema({});

module.exports = mongoose.model("transactions", transactionSchema);
