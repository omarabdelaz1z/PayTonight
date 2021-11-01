const bcrypt = require("bcrypt");
const { findAppById } = require("../models/App");
const { ServerError } = require("../utils/error-handler");
const {
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
  BAD_REQUEST,
  FORBIDDEN,
} = require("../utils/responses");

const loginRequired = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.redirect("/");
};

const isAlreadyLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect("/dashboard");
  return next();
};

const isAuthorized = async (req, res, next) => {
  try {
    const { APP_ID } = req.body;
    const APP_KEY = req.headers["x-api-key"];

    if (!APP_ID || !APP_KEY)
      return FORBIDDEN(res, "You must pass API credentials");

    const app = await findAppById(APP_ID);

    const match = await bcrypt.compare(APP_KEY, app.APP_KEY);

    if (!match) return UNAUTHORIZED(res);

    return next();
  } catch (error) {
    if (error instanceof ServerError) return INTERNAL_SERVER_ERROR(res);
    return BAD_REQUEST(res);
  }
};

module.exports = { loginRequired, isAlreadyLoggedIn, isAuthorized };
