const { Router } = require("express");
const {
  createTransaction,
  deleteTransaction,
} = require("../controllers/transaction.controller");

const router = Router();

// TODO: prepare routes
router.post("/create", createTransaction);
router.post("/get", deleteTransaction);

module.exports = router;
