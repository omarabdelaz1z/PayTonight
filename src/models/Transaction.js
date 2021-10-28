const mongoose = require("mongoose");
const connect = require("../utils/db");


// TODO: defeine Transaction schema
const transactionSchema = new mongoose.Schema({
  ccv: String,
  cardid: String,
  amount: Number,
  merchant_id: mongoose.Schema.Types.ObjectId,
  username: String,
  created_at: String,
  updated_at: String,

});

const Transaction = mongoose.model("transactions", transactionSchema);

// eslint-disable-next-line import/prefer-default-export
const createTransaction = async (transaction) => {
  try {
    await connect();
    return (await Transaction.create(transaction));
  } catch (e) {
    return new Error(e);
  }
};

// eslint-disable-next-line import/prefer-default-export
const getTransactionsByUserID = async (id) => {
  try {
    await connect();
    return(await Transaction.find({ user_id: new mongoose.mongo.ObjectId(id) }));
  } catch (e) {
    return ( new Error(e) );
  }
}

const getTransactionByID = async (id) => {
  try {
    await connect();
    return (await Transaction.findById(id));
  } catch (e) {
    return new Error(e);
  }
}

const deleteTransactionById = async (id) => {
  try {
    await connect();
    return (await Transaction.deleteOne({ _id: id }));
  } catch (e) {
    return new Error(e);
  }
};

module.exports = {
  Transaction,
  createTransaction,
  getTransactionByID,
  deleteTransactionById,
  getTransactionsByUserID,
};

