const { Types } = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const {
  getTransactionByID,
  getTransactionsByUserID,
} = require("../models/Transaction");

const { ServerError } = require("../utils/error-handler");
const { INTERNAL_SERVER_ERROR, NOT_FOUND } = require("../utils/responses");

const getTransaction = async (req, res) => {
  try {
    const transactionId = Types.ObjectId(req.params.id);
    const transaction = await getTransactionByID(transactionId);

    if (!transaction)
      return NOT_FOUND(res, { message: "Transaction is not found" });

    return res.status(StatusCodes.OK).json(transaction);
  } catch (error) {
    console.log(error);
    if (error instanceof ServerError) {
      return INTERNAL_SERVER_ERROR(res);
    }
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const getUserTransactions = async (req, res) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const id = Types.ObjectId(req.user._id);
    const transactions = await getTransactionsByUserID(id);

    if (!transactions || transactions.length === 0) {
      return NOT_FOUND(res, { message: "No transactions with that user id" });
    }

    return res.status(StatusCodes.OK).json(transactions);
  } catch (error) {
    console.log(error);
    if (error instanceof ServerError) {
      return INTERNAL_SERVER_ERROR(res);
    }
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

module.exports = {
  getTransaction,
  getUserTransactions,
};
