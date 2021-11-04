const bcrypt = require("bcrypt");
const passport = require("passport");
const { StatusCodes } = require("http-status-codes");
const { createUser } = require("../models/User");
const { ServerError } = require("../utils/error-handler");
const { prettifyMongooseError } = require("../utils/general");
const { registerSchema } = require("../utils/joi/schemas");
const { VALIDATE_OPTIONS } = require("../utils/joi/constants");

const login = (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error || !user) {
      if (error instanceof ServerError) return res.render("maintenance");

      req.flash("signin-error", info?.message || "Invalid username/password");
      return res.redirect("/");
    }

    return req.logIn(user, (err) => {
      if (err) next(err);
      return res.redirect("/dashboard");
    });
  })(req, res, next);
};

const register = async (req, res) => {
  try {
    const validation = registerSchema.validate(req.body, VALIDATE_OPTIONS);
    if (validation.error) {
      req.flash("signup-error", validation.error.details[0].message);
      return res.redirect("/");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 14);
    req.body.password = hashedPassword;

    await createUser(req.body);
    return res.redirect("/");
  } catch (error) {
    if (error instanceof ServerError) return res.render("maintenance");

    if (error?.errors) {
      req.flash("signup-error", prettifyMongooseError(error));
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).redirect("/");
    }

    req.flash("signup-error", error);
    return res.status(StatusCodes.BAD_REQUEST).redirect("/");
  }
};

const logout = (req, res) => {
  console.log(req.session.id);
  req.logOut();
  req.session.destroy((err) => {
    console.log(err);
  });
  res.redirect("/");
};

module.exports = {
  login,
  register,
  logout,
};
