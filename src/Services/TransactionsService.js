
const mongoose = require("mongoose");

const { createTransaction, getTransactionsByUserID, getTransactionByID, deleteTransactionById } = require('../models/Transaction');
const { findUserById } = require("../models/User");

const PAY_TONIGHT_ID = 100;

// eslint-disable-next-line import/prefer-default-export
class TransactionService {
    // eslint-disable-next-line class-methods-use-this
    async sendTransactionToTheBank(transaction) {
        // eslint-disable-next-line camelcase
        const { ccv, cid, merchant_id, amount } = transaction;
        const res = await fetch('endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ccv,
                cid,
                merchant: merchant_id,
                amount,
                Payment_gateway_ID: PAY_TONIGHT_ID,
            })
        });

        return (res.json());
    }

    // eslint-disable-next-line class-methods-use-this
    async saveTransactionIntoDatabase(transaction) {
        // eslint-disable-next-line no-param-reassign
        transaction.user_id = new mongoose.mongo.ObjectId(transaction.user_id);
        const result = createTransaction(transaction);
        if (result) {
            return result;
        }
        throw new Error('faild to save transaction');
    }

    // eslint-disable-next-line class-methods-use-this
    async createTransactionAndSave(transaction) {
        const merchant = await findUserById(new mongoose.mongo.ObjectId(transaction.user_id));
        if (merchant) {
            // const sendToBankResult = await this.sendTransactionToTheBank(transaction);
            // if (true) {
                // eslint-disable-next-line no-return-await
                return (await this.saveTransactionIntoDatabase(transaction));
           // }
        }
        return false;
    }

    // eslint-disable-next-line class-methods-use-this
    async getByUserId(id) {
        const user = findUserById(id);
        if (user) {
            // eslint-disable-next-line no-return-await
            return (await getTransactionsByUserID(id));
        }
        return false;
    }

    // eslint-disable-next-line class-methods-use-this
    async getById(id) {
        const transaction = await getTransactionByID(new mongoose.mongo.ObjectId(id));
        if(transaction) {
            return transaction;
        }
        return false;
    }

    // eslint-disable-next-line class-methods-use-this
    async deleteById(id) {
        const res = await deleteTransactionById(new mongoose.mongo.ObjectId(id));
        if(res) {
            return res;
        }
        return false;
    }
}

module.exports = {
    TransactionService
}