const { Router } = require("express");
const {
  createApiKey,
  showDashboard,
} = require("../controllers/user.controller");
const { loginRequired } = require("../middlewares/auth");

const router = Router();

router.post("/create-api-key", loginRequired, createApiKey, showDashboard);

module.exports = router;
