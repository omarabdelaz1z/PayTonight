const mongoose = require("mongoose");

// TODO: defeine Transaction schema
const transactionSchema = new mongoose.Schema({});

module.exports = mongoose.model("transactions", transactionSchema);

const createTransaction = async (transaction) => {};

const getTransactionById = async (id) => {};

const updateTransactionById = async (id, body) => {};

const deleteTransactionById = async (id) => {};

module.exports = {
  createTransaction,
  getTransactionById,
  updateTransactionById,
  deleteTransactionById,
};
