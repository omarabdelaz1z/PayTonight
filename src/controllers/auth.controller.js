const bcrypt = require("bcrypt");
const passport = require("passport");
const { StatusCodes } = require("http-status-codes");
const { createUser } = require("../models/User");
const { ServerError } = require("../utils/error-handler");
const { prettifyMongooseError } = require("../utils/general");

const login = (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error || !user) {
      if (error instanceof ServerError) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .render("maintenance");
      }

      return res
        .status(StatusCodes.UNAUTHORIZED)
        .render("login", { errorMessage: info });
    }

    return req.logIn(user, (err) => {
      if (err) next(err);
      return res.redirect("/dashboard");
    });
  })(req, res, next);
};

const register = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 14);
    req.body.password = hash;

    await createUser(req.body);
    return res.status(StatusCodes.CREATED).redirect("/login");
  } catch (error) {
    if (error instanceof ServerError) return res.redirect("/maintenance");

    if (error?.errors)
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .render("register", { error: prettifyMongooseError(error) });

    return res.status(StatusCodes.BAD_REQUEST).render("register", { error });
  }
};

const logout = (req, res) => {
  res.logOut();
  res.redirect("/login");
};

module.exports = {
  login,
  register,
  logout,
};
