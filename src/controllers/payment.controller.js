const url = require("url");
const path = require("path");
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const { Types } = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const { prepareFile } = require("../utils/general");
const { createTransaction } = require("../models/Transaction");
const { prettifyMongooseError } = require("../utils/general");
const { ServerError } = require("../utils/error-handler");
const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require("../utils/responses");

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
      amount: Number(req.payload.amount) * 1.01,
      Payment_gateway_ID: process.env.PAYMENT_GATEWAY_ID,
      timestamp: new Date().toISOString(),
    };

    const networkResponse = await transferPayment(payment);

    if (!networkResponse.accepted) {
      req.flash("error", networkResponse.error);
      return res.redirect("/api/payment/pay/fail");
    }

    await createTransaction({
      userId: Types.ObjectId(req.payload.merchantId),
      amount: Number(req.payload.amount) * 1.01,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    return res.redirect("/api/payment/pay/success");
  } catch (error) {
    if (error instanceof ServerError)
      return INTERNAL_SERVER_ERROR(res, {
        message: "Service is currently down",
      });

    if (error?.errors) return BAD_REQUEST(res, prettifyMongooseError(error));
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const paymentIframe = async (req, res) => {
  const iframePath = path.join(__dirname, "/payment-iframe/index.html");

  const iframe = await prepareFile(iframePath, {
    amount: Number(req.payload.amount) * 1.01,
    token: req.token,
  });

  res.setHeader("content-type", ["text/html"]);
  return res.send(iframe);
};

const success = async (req, res) => {
  const pagePath = path.join(__dirname, "/payment-iframe/success.html");

  const page = await prepareFile(pagePath);

  res.setHeader("content-type", ["text/html"]);
  return res.send(page);
};

const failure = async (req, res) => {
  const reason = req.flash("error");
  console.log(reason);
  const pagePath = path.join(__dirname, "/payment-iframe/fail.html");

  const page = await prepareFile(pagePath, {
    reason,
  });

  res.setHeader("content-type", ["text/html"]);
  return res.send(page);
};

module.exports = {
  checkout,
  pay,
  paymentIframe,
  success,
  failure,
};
