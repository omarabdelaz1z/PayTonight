const bcrypt = require("bcrypt");
const passport = require("passport");
const { StatusCodes } = require("http-status-codes");
const { createUser } = require("../models/User");
const { ServerError } = require("../utils/error-handler");
const { prettifyMongooseError } = require("../utils/general");
const { registerSchema } = require("../utils/joi/schemas");
const { BAD_REQUEST } = require("../utils/responses");
const { VALIDATE_OPTIONS } = require("../utils/joi/constants");

const login = (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error || !user) {
      if (error instanceof ServerError) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .render("maintenance");
      }

      return res.status(StatusCodes.BAD_REQUEST).render("index.ejs", {
        signinError: info?.message || "Invalid username/password",
      });
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

    if (validation.error)
      return BAD_REQUEST(res, validation.error.details[0].message);

    const hash = await bcrypt.hash(req.body.password, 14);
    req.body.password = hash;

    await createUser(req.body);
    return res.status(StatusCodes.CREATED).redirect("/login");
  } catch (error) {
    if (error instanceof ServerError) return res.render("maintenance");

    if (error?.errors)
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .render("index.ejs", { signupError: prettifyMongooseError(error) });

    return res
      .status(StatusCodes.BAD_REQUEST)
      .render("register", { signupError: error });
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
