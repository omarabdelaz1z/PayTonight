const mongoose = require("mongoose");
const connect = require("../utils/db");

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  amount: {
    type: Number,
    required: true,
  },
  created_at: {
    type: String,
    required: true,
  },
  updated_at: {
    type: String,
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

const createTransaction = async (transaction) => {
  await connect();
  return Transaction.create(transaction);
};

const getTransactionsByUserID = async (id) => {
  await connect();
  return Transaction.find({
    merchant_id: new mongoose.mongo.ObjectId(id),
  });
};

const getTransactionByID = async (id) => {
  await connect();
  return Transaction.findById(id);
};

const deleteTransactionById = async (id) => {
  await connect();
  return Transaction.deleteOne({ _id: id });
};

module.exports = {
  Transaction,
  createTransaction,
  getTransactionByID,
  deleteTransactionById,
  getTransactionsByUserID,
};
