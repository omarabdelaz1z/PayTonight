const bcrypt = require("bcrypt");
const { Types } = require("mongoose");

const { createApp } = require("../models/App");
const { updateUser } = require("../models/User");
const { generateApiKey } = require("../utils/general");
const { getTransactionsByUserID } = require("../models/Transaction");

const createApiKey = async (req, res) => {
  try {
    const API_KEY = generateApiKey();
    const hashedKey = await bcrypt.hash(API_KEY, 14);

    // eslint-disable-next-line no-underscore-dangle
    const filter = { userId: req.user._id };
    const update = {
      $set: {
        APP_KEY: hashedKey,
      },
    };

    const app = await createApp(filter, update);
    req.user = await updateUser(
      // eslint-disable-next-line no-underscore-dangle
      { _id: req.user._id },
      {
        $set: {
          // eslint-disable-next-line no-underscore-dangle
          APP_ID: app._id,
        },
      }
    );

    req.flash("APP_KEY", API_KEY);
    return res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    return res.render("maintenance");
  }
};

const showDashboard = async (req, res) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const id = Types.ObjectId(req.user._id);
    const [, transactions] = await getTransactionsByUserID(id);

    const revenue = transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

    return res.render("dashboard", {
      appId: req.user.APP_ID,
      appKey: req.flash("APP_KEY"),
      transactions,
      revenue: Math.round((revenue + Number.EPSILON) * 100) / 100,
    });
  } catch (error) {
    return res.render("dashboard", {
      appId: req.user.APP_ID,
      appKey: req.flash("APP_KEY"),
      transactions: undefined,
      revenue: 0,
    });
  }
};

module.exports = { createApiKey, showDashboard };
