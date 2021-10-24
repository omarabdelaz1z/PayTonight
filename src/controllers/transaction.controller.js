// TODO: create necessary operations for Transaction

const { Transaction } = require("../models/Transaction");
const { TransactionService } = require("../Services/TransactionsService");


const transactionService = new TransactionService();


const createTransaction = async (req, res) => {
  // eslint-disable-next-line camelcase
  const { ccv, cid, username, user_id, amount } = req.body;
  const transaction = new Transaction({ ccv, cid, username, user_id, amount, created_at: new Date(), updated_at: new Date() });
  const createRes = await transactionService.createTransactionAndSave(transaction);
  if (createRes) {
    return res.send({ transaction: createRes })
  }
  return res.send.status(404).send('user_id unauthorized');
}

const getTransaction = async (req, res) => {
  const transactionId = req.params.id;
  const result = await transactionService.getById(transactionId);
  if (!result) {
    return res.status(404).send("not found");
  }
  return res.send({ transaction: result });
};

const deleteTransaction = async (req, res) => {
  const transactionId = req.params.id;
  console.log(transactionId);
  const result = await transactionService.deleteById(transactionId);
  if (!result) {
    return res.status(404).send("not found");
  }
  return res.send({ message: `transction with id : ${transactionId} is deleted successfully` });
};

// const updateTransaction = async (req, res) => { };

const getTransactionsByMerchantId = async (req, res) => {
  const id = req.params.user_id;
  const result = await transactionService.getByUserId(id);
  if (!result) {
    return res.status(404).send("not found");
  }
  return res.send({ transactions: result });
}

module.exports = {
  createTransaction,
  getTransaction,
  deleteTransaction,
  getTransactionsByMerchantId
};