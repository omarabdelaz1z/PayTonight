const mongoose = require("mongoose");
const fetch = require('node-fetch');

const { createTransaction, getTransactionsByUserID, getTransactionByID, deleteTransactionById } = require('../models/Transaction');
const { findUserById } = require("../models/User");

const PAY_TONIGHT_ID = 500;

// eslint-disable-next-line import/prefer-default-export
class TransactionService {
    // eslint-disable-next-line class-methods-use-this
    async sendTransactionToTheBank(transaction) {
        // eslint-disable-next-line camelcase
        const { ccv, cardid, merchant_id, amount } = transaction;
        const res = await fetch('https://sprintsbank.herokuapp.com/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                username: 'gateway100',
                password: 'Sprints'
            },
            body: JSON.stringify({
                ccv,
                cardid,
                merchant: merchant_id,
                amount,
                Payment_gateway_ID: PAY_TONIGHT_ID,
                timestamp: new Date().toISOString(),
            })
        });

        return (res.json());
    }

    // eslint-disable-next-line class-methods-use-this
    async saveTransactionIntoDatabase(transaction) {
        // eslint-disable-next-line no-param-reassign
        // transaction.merchant_id = new mongoose.mongo.ObjectId(transaction.merchant_id);
        const result = createTransaction(transaction);
        if (result) {
            return result;
        }
        return false;
    }

    // eslint-disable-next-line class-methods-use-this
    async createTransactionAndSave(transaction) {
        const merchant = await findUserById(transaction.merchant_id);
        // eslint-disable-next-line no-underscore-dangle
        if (merchant._id) {
            const sendToBankResult = await this.sendTransactionToTheBank(transaction);
            console.log(sendToBankResult);
            if (sendToBankResult.accepted) {
                // eslint-disable-next-line no-return-await
                return (await this.saveTransactionIntoDatabase(transaction));
            }
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
        if (transaction) {
            return transaction;
        }
        return false;
    }

    // eslint-disable-next-line class-methods-use-this
    async deleteById(id) {
        const res = await deleteTransactionById(new mongoose.mongo.ObjectId(id));
        if (res) {
            return res;
        }
        return false;
    }
}

module.exports = {
    TransactionService
}