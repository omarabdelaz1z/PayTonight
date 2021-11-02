const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { loginSchema } = require("../utils/joi/schemas");
const { findUser, findUserById } = require("../models/User");
const { VALIDATE_OPTIONS } = require("../utils/joi/constants");

const login = async (username, password, done) => {
  try {
    const validation = loginSchema.validate(
      { username, password },
      VALIDATE_OPTIONS
    );

    if (validation?.error)
      return done(null, false, validation?.error.details[0].message);

    const user = await findUser({ username });

    if (!user) return done(null, false, "User not found");

    const match = await bcrypt.compare(password, user?.password);
    if (!match) return done(null, false, "Invalid username/ password");

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
};

const strategy = new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password",
  },
  login
);

passport.use(strategy);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await findUserById(userId);
    return done(null, user);
  } catch (e) {
    return done(e);
  }
});
