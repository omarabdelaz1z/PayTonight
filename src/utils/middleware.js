const express = require("express");
const { requireJsonContent } = require("../middlewares/general");

// Shared middleware for all routes
module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(requireJsonContent);
};
