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

const getTransactionsByUserID = async (id, page = 1, limit = 4) => {
  await connect();
  const userId = new mongoose.mongo.ObjectId(id);

  const filter = { userId };

  const projection = {
    _id: 1,
    amount: 1,
    created_at: 1,
  };

  const offset = limit * (page - 1);
  const options = {
    sort: {
      _id: -1,
    },
    skip: offset,
    limit,
  };

  return Promise.all([
    Transaction.countDocuments(filter).exec(),
    Transaction.find(filter, projection, options),
  ]);
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
  createTransaction,
  getTransactionByID,
  deleteTransactionById,
  getTransactionsByUserID,
};
