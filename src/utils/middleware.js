const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo");

require("../middlewares/passport");

// Shared middleware for all routes
module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(flash());
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  app.use(
    cors({
      origin: "*",
    })
  );
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URL,
        ttl: 30 * 60,
      }),
      cookie: {
        httpOnly: true,
        maxAge: 30 * 60,
      },
      unset: "destroy",
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};
