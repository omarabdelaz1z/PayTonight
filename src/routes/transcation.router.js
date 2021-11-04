const { Router } = require("express");
const { loginRequired } = require("../middlewares/auth");
const {
  getUserTransactions,
} = require("../controllers/transaction.controller");

const router = Router();

router.get("/user/:id", loginRequired, getUserTransactions);

module.exports = router;
