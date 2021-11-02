const bcrypt = require("bcrypt");
const fetch = require("node-fetch");
const { createApp } = require("../models/App");
const { updateUser } = require("../models/User");
const { generateApiKey } = require("../utils/general");

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
  // eslint-disable-next-line no-underscore-dangle
  const id = req.user._id.valueOf();

  // const transactions = await getTransactionsByMerchantId(id);
  const response = await fetch(
    `http://localhost:${process.env.PORT}/transactions/user/${id}`
  );

  const data = await response.json();

  return res.render("dashboard", {
    appId: req.user.APP_ID,
    appKey: req.flash("APP_KEY"),
    transactions: data.transactions,
  });
};

module.exports = { createApiKey, showDashboard };
