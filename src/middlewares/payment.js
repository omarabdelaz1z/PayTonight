const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findAppById } = require("../models/App");
const { paymentSchema, checkoutSchema } = require("../utils/joi/schemas");
const { VALIDATE_OPTIONS } = require("../utils/joi/constants");
const { UNAUTHORIZED, FORBIDDEN, BAD_REQUEST } = require("../utils/responses");

const validateCheckout = async (req, res, next) => {
  const { APP_ID } = req.body;
  const APP_KEY = req.headers["x-api-key"];

  const payload = {
    merchantId: req.merchantId.toString(),
    amount: req.body.amount * 1.01,
    APP_ID,
    APP_KEY,
  };

  const validation = checkoutSchema.validate(payload, VALIDATE_OPTIONS);

  if (validation?.error) {
    console.log("validation schema error");
    return BAD_REQUEST(res, validation.error.details[0].message);
  }

  req.flash("payload", payload);
  return next();
};

const validatePayment = (req, res, next) => {
  const payload = {
    ...req.payload,
    ...req.body,
  };

  const validation = paymentSchema.validate(payload, VALIDATE_OPTIONS);

  if (validation?.error) {
    return BAD_REQUEST(res, validation.error.details[0].message);
  }

  return next();
};

const validateJwt = async (req, res, next) => {
  const { token } = req.query;

  return jwt.verify(
    token,
    process.env.JWT_ACCESS_TOKEN_SECRET,
    async (err, payload) => {
      if (err) return FORBIDDEN(res);

      const app = await findAppById(payload.APP_ID);
      const match = await bcrypt.compare(payload.APP_KEY, app.APP_KEY);
      if (!match) return UNAUTHORIZED(res);

      req.payload = payload;
      req.token = token;
      return next();
    }
  );
};

module.exports = { validatePayment, validateCheckout, validateJwt };
