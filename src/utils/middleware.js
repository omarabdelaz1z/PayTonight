const express = require("express");
const session = require("express-session");
const helmet = require("helmet");
const passport = require("passport");
const { requireJsonContent } = require("../middlewares/general");

require("./passport");

// Shared middleware for all routes
module.exports = (app) => {
  app.use(express.static("public"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(requireJsonContent);
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
