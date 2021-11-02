<<<<<<< Updated upstream
const url = require("url");
const path = require("path");
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { prepareFile } = require("../utils/general");
const { createTransaction } = require("./transaction.controller");

const transferPayment = async (body) => {
  const response = await fetch(process.env.BANK_ENDPOINT, {
    method: "POST",
    headers: {
      username: process.env.BANK_USERNAME,
      password: process.env.BANK_PASSWORD,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return response.json();
};

const checkout = async (req, res) => {
  const payload = req.flash("payload")[0];

  const token = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET);

  return res.redirect(
    url.format({
      pathname: "/api/payment/iframe",
      query: {
        token,
      },
    })
  );
};

const pay = async (req, res) => {
  try {
    const payment = {
      ccv: req.body.cvv,
      cardid: req.body.card_number,
      merchant: req.payload.merchantId,
      amount: req.payload.amount * 1.01,
      Payment_gateway_ID: process.env.PAYMENT_GATEWAY_ID,
      timestamp: new Date().toISOString(),
    };

    const networkResponse = await transferPayment(payment);

    console.log(networkResponse);

    if (!networkResponse.accepted)
      return res.status(StatusCodes.BAD_REQUEST).json(networkResponse);

    const created = await createTransaction({
      merchantId: req.payload.merchantId,
      amount: req.payload.amount * 1.01,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    return res.status(StatusCodes.CREATED).json(created);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const paymentIframe = async (req, res) => {
  console.log(req.payload);
  const iframePath = path.join(__dirname, "/payment-iframe/index.html");

  const iframe = await prepareFile(iframePath, {
    amount: req.payload.amount,
    token: req.token,
  });

  res.setHeader("content-type", ["text/html"]);
  return res.send(iframe);
};

module.exports = {
  checkout,
  pay,
  paymentIframe,
};
=======
const { StatusCodes } = require("http-status-codes");
const { findUser } = require("../models/User");

const getPaymentIframe = async (req, res) => {
  // eslint-disable-next-line camelcase
  const { api_token } = req.query;

  // eslint-disable-next-line camelcase
  if (typeof api_token === "undefined") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "please provide API token.",
    });
  }

  const user = await findUser({ api_token });

  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "UNAUTHORIZED ACCESS",
    });
  }

  return res.status(StatusCodes.ACCEPTED).send();
};

const checkout = async (req, res) => {};

module.exports = { getPaymentIframe };
>>>>>>> Stashed changes
