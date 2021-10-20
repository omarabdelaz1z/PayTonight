const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { findUser, findUserById } = require("../models/User");

const customFields = {
  usernameField: "username",
  passwordField: "password",
};

const login = async (username, password, done) => {
  try {
    const user = await findUser({ username });
    if (!user) return done(null, false, "User not found");

    const match = await bcrypt.compare(password, user?.password);
    if (!match) return done(null, false, "Invalid username/ password");

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
};

const strategy = new LocalStrategy(customFields, login);

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
