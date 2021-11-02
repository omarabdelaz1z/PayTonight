const express = require("express");
const session = require("express-session");
const helmet = require("helmet");
const passport = require("passport");
const flash = require("connect-flash");

require("../middlewares/passport");

// Shared middleware for all routes
module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(flash());
  app.use(helmet());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};
